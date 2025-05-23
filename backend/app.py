from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
