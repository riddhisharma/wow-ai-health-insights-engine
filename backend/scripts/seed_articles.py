import json
import uuid
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, VectorParams

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

client = QdrantClient(host="qdrant", port=6333)

# Define the collection name
collection_name = "articles"

# Remove the collection if it exists
if client.collection_exists(collection_name):
    client.delete_collection(collection_name)
    print(f"Collection '{collection_name}' deleted.")

# Create the collection
client.create_collection(
    collection_name=collection_name,
    vectors_config=VectorParams(size=384, distance="Cosine"),
)
print(f"Collection '{collection_name}' created.")

# Load articles data
with open("data/articles.json", "r") as f:
    articles = json.load(f)

# Prepare points for upsert
points = []
for article in articles:
    # Generate a UUID for the article ID
    article_id = str(uuid.uuid4())
    embedding = model.encode(article["title"] + article["summary"])
    points.append(
        PointStruct(id=article_id, vector=embedding.tolist(), payload=article)
    )

# Upsert points into the collection
client.upsert(collection_name, points=points)
print(f"Seeded {len(points)} articles into Qdrant.")
