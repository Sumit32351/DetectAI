from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import warnings
from threading import Lock

warnings.filterwarnings("ignore")

app = Flask(__name__)
CORS(app)  


model = None
tokenizer = None
model_lock = Lock()
MODEL_PATH = "../models/codebert"  # Update if needed     # yaha model path change kiya hai kyuki model is not stored in backend directory


def load_model():
    global model, tokenizer
    with model_lock:
        if model is None or tokenizer is None:
            print("🔍 Loading model...")
            tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
            model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)
            print("✅ Model loaded!")

# === Prediction function ===
def predict_ai_generated(code_snippet):
    inputs = tokenizer(code_snippet, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    probs = torch.softmax(outputs.logits, dim=1)
    return probs[0][1].item()  # Probability of being AI-generated

# === Endpoint ===
@app.route('/detect', methods=['POST'])
def detect():
    try:
        data = request.json
        print(f"Received request: {data}")
        
        code = data.get('code', '')
        if not code:
            return jsonify({"error": "No code provided"}), 400
        
        load_model()  # Ensure model is loaded before prediction
        probability = predict_ai_generated(code)
        
        result = {
            "ai_probability": probability,
            "is_ai_generated": probability > 0.5
        }
        print(f"Sending response: {result}")
        return jsonify(result)
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({"error": str(e)}), 500

# === Start server ===
if __name__ == '__main__':
    print("Starting Flask backend for DetectAI...")
    load_model()  # Optional: load at startup to avoid first-request delay
    app.run(host='0.0.0.0', port=5000, debug=True)

