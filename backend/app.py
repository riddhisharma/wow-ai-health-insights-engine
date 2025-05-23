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
    input_text = f"{profile.condition}. {profile.language}. {profile.literacy_level}. {profile.age_group}. {profile.summary}"
    query_vec = model.encode(input_text)

    results = client.search(
        collection_name="articles", query_vector=query_vec.tolist(), limit=2
    )

    return [{"id": r.id, "score": r.score, "payload": r.payload} for r in results]
