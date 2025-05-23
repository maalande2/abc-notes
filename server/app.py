import os
from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)

CORS(app)



# load in the .env variables & set api key
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route('/')
def home():
    return "home page."

@app.route('/get-notes', methods=['GET', 'OPTIONS'])
def get_notes():
    instruction = (
        "In the next message I'll send a song name and artist. Transcribe the melody of that piece. include as much of the song as you can as long as it's available online or public domain"
        "in simple uppercase letter notes (A–G), like piano tutorials. Use '#' for sharps. Don't include any extra text — "
        "only format it like this:\nE D# E D# E B D C A\nC E A B\netc.\nIf the melody isn't available or uncertain, respond with 'null'."
    )
    prompt = "für elise beethoven"

    # sending the request to gpt
    response = client.responses.create(
        model="gpt-4o",
        instructions=instruction,
        input=prompt,
        temperature=0
    )

    # returning gpt output while saving formatting for \n
    return f"<pre>{response.output_text}</pre>"

@app.route('/test', methods=['POST', 'OPTIONS'])
def receive_data():
    print("\n\nmade it to test route")
    data = request.get_json()  # Parses incoming JSON payload
    print("Received: ", data)
    # Do something with the data if needed (store in DB, call GPT, etc.)
    return jsonify({"status": "success", "received": data})

    

if __name__ == "__main__":
    app.run(debug=True)