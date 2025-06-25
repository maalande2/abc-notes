import os
from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)

# load in the .env variables & set api key
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# home page
@app.route('/')
def home():
    return "home page."

# retrieve notes from gpt
@app.route('/get-notes', methods=['POST'])
def get_notes():
    # retrieve post from client
    data = request.get_json()
    song = data.get("songName")

    if not song:
        return jsonify({"notes":"Enter a song to find notes."}) # err 400

    instruction = (
        "In the next message I'll send a song name and artist. Transcribe the melody of that piece. include as much of the song as you can as long as it's available online or public domain"
        "in simple uppercase letter notes (A–G), like piano tutorials. Use '#' for sharps. Don't include any extra text — "
        "only format it like this:\nE D# E D# E B D C A\nC E A B\netc.\nIf the melody isn't available or uncertain, respond with 'null'."
    )

    # sending the request to gpt with SDK
    response = client.responses.create(
        model="gpt-4o",
        instructions=instruction,
        input=song,
        temperature=0
    )
    # print(response.output_text)
    if (response.output_text == "null"):
        return jsonify({"notes":"Notes can't be found."})


    return jsonify({"notes":response.output_text}) # return jsonified response output



if __name__ == "__main__":
    app.run(debug=True, port=8080)