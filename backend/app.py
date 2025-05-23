from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
client = QdrantClient(host="qdrant", port=6333)


class RecommendationRequest(BaseModel):
    description: str
    language: str
    literacy_level: str
    condition: str


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/recommendations")
def get_recommendations(req: RecommendationRequest):
    return {"message": "Personalized recommendations (stub)", "input": req.dict()}


class UserProfile(BaseModel):
    condition: str
    language: str
    literacy_level: str
    age_group: str
    summary: str


@app.post("/recommend")
def recommend(profile: UserProfile):
    # Combine profile attributes into a single input text
    input_text = f"{profile.condition}. {profile.language}. {profile.literacy_level}. {profile.age_group}. {profile.summary}"
    query_vec = model.encode(input_text)

    # Perform the search in Qdrant
    results = client.search(
        collection_name="articles", query_vector=query_vec.tolist(), limit=10
    )

    # Add weighted scoring based on profile attributes
    weighted_results = []
    for result in results:
        score = result.score

        # Apply weights to profile attributes
        if profile.condition in result.payload.get("conditions", []):
            score += 1.0  # Increase score if condition matches
        if profile.language == result.payload.get("language", ""):
            score += 0.5  # Increase score if language matches
        if profile.literacy_level == result.payload.get("literacy_level", ""):
            score += 0.3  # Increase score if literacy level matches
        if profile.age_group == result.payload.get("age_group", ""):
            score += 0.1  # Increase score if age group matches

        # Limit the score to 5 decimal places
        score = round(score, 3)

        # Append the updated result with the new score
        weighted_results.append(
            {
                "id": result.id,
                "score": score,
                "payload": result.payload,
            }
        )

    # Sort results by the updated weighted score in descending order
    weighted_results.sort(key=lambda x: x["score"], reverse=True)

    return weighted_results
