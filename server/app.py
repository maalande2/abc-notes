import os
import openai
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# load in the .env variables & set api key
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route('/get-notes', methods=['GET'])
def get_notes():
    prompt = "what's 2+2?"

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4.1-nano",
            messages=[{"role": "user", "content": prompt}],
            temperature=0
        )
        res = response['choices'][0]['message']['content']
        return jsonify({"res": res})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)