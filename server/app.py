import os
from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from pymongo import MongoClient
from datetime import datetime


app = Flask(__name__)

MAX_CACHE_SIZE = 3

# load in the .env variables
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
mongo_client = MongoClient(os.getenv("MONGO_URI"))
db = mongo_client["cached_music"]
cache = db["cached_notes"]


# home page
@app.route('/')
def home():
    return "server home."

# retrieve notes from gpt
@app.route('/get-notes', methods=['POST'])
def get_notes():
    # retrieve post from client
    data = request.get_json()
    song = data.get("songName")
    if not song:
        return jsonify({"notes":"Enter a song to find notes."}) # err 400

    # check if cached
    cached = cache.find_one({"song_name" : song})
    if cached:
        # print("cache hit")
        cache.update_one(
            {"_id": cached["_id"]},
            {"$set": {"last_accessed": datetime.utcnow()}}
        )
        return jsonify({
            "notes": cached["notes"],
            "cache_status": "hit"
        })
    # print("cache miss")

    # start openai req
    instruction = (
        "In the next message I'll send a song name and artist. Transcribe the melody of that piece. include as much of the song as you can as long as it's available online or public domain"
        "in simple uppercase letter notes (A–G), like piano tutorials. Use '#' for sharps. Don't include any extra text — "
        "only format it like this:\nE D# E D# E B D C A\nC E A B\netc.\nIf the melody isn't available or uncertain, respond with 'null'."
    )

    response = client.responses.create(
        model="gpt-4o",
        instructions=instruction,
        input=song,
        temperature=0
    )

    if (response.output_text == "null"):
        return jsonify({"notes":"Notes can't be found."})

    # add song to db
    new_doc = {
        "song_name": song,
        "notes": response.output_text,
        "last_accessed": datetime.utcnow()
    }
    result = cache.insert_one(new_doc)

    # check cache size
    if (cache.count_documents({}) >= MAX_CACHE_SIZE):
        # print("cache max")
        lru_doc = cache.find_one(sort=[("last_accessed", 1)])
        if lru_doc:
            cache.delete_one({"_id": lru_doc["_id"]})

    return jsonify({"notes":response.output_text}) # return jsonified response output



if __name__ == "__main__":
    app.run(debug=True, port=8080)