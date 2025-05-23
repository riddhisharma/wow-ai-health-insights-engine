from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient
from typing import Optional

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


@app.post("/recommendtest")
def get_recommendations(req: RecommendationRequest):
    return {"message": "Personalized recommendations (stub)", "input": req.dict()}


class UserProfile(BaseModel):
    condition: str
    language: str
    literacy_level: str
    age_group: str
    summary: str


@app.post("/recommend")
def recommend(profile: UserProfile, use_filters: Optional[bool] = True):
    # Combine profile attributes into a single input text for semantic similarity
    input_text = f"{profile.condition}. {profile.language}. {profile.literacy_level}. {profile.age_group}. {profile.summary}"
    query_vec = model.encode(input_text)

    # Perform the search in Qdrant without filters
    results = client.search(
        collection_name="articles",
        query_vector=query_vec.tolist(),
        limit=50,  # Retrieve more results to filter manually
    )

    # Manually filter results based on language and literacy_level if use_filters is True
    if use_filters:
        results = [
            result
            for result in results
            if result.payload.get("language") == profile.language
            and result.payload.get("literacy_level") == profile.literacy_level
        ]

    # Add weighted scoring based on profile attributes
    weighted_results = []
    for result in results[:10]:  # Limit to top 10 after filtering
        score = result.score  # Start with the semantic similarity score

        # Apply rule-based weights
        if profile.condition in result.payload.get("conditions", []):
            score += 1.0  # Increase score if condition matches
        if profile.age_group == result.payload.get("age_group", ""):
            score += 0.5  # Increase score if age group matches

        # Limit the score to 5 decimal places
        score = round(score, 5)

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
