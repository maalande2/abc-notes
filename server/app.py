import os
from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

client = OpenAI()
# load in the .env variables & set api key
load_dotenv()
client.api_key = os.getenv("OPENAI_API_KEY")


@app.route('/get-notes', methods=['GET'])
def get_notes():
    instruct = (
        "In the next message I'll send a song name and artist. Transcribe the melody of that piece. include as much of the song as you can as long as it's available online or public domain"
        "in simple uppercase letter notes (A–G), like piano tutorials. Use '#' for sharps. Don't include any extra text — "
        "only format it like this:\nE D# E D# E B D C A\nC E A B\netc.\nIf the melody isn't available or uncertain, respond with 'null'."
    )
    prompt = "für elise beethoven"

    response = client.responses.create(
        model="gpt-4o",
        # messages=[{"role": "user", "content": prompt}],
        instructions=instruct,
        input=prompt,
        temperature=0
    )

    print("=== GPT OUTPUT (RAW) ===")
    print(repr(response.output_text))  # Helpful for seeing formatting issues like \n
    print("========================")

    return f"<pre>{response.output_text}</pre>"  # preserves line breaks in browser



if __name__ == "__main__":
    app.run(debug=True)