from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory datasets for backend demonstration and evaluation
PRODUCTS_DATA = [
    {
        "id": "p1",
        "name": "Apple iPhone 15 Pro",
        "price": 134900,
        "category": "Smartphones",
        "scores": {"performance": 98, "camera": 96, "battery": 84, "value": 80}
    },
    {
        "id": "p2",
        "name": "Samsung Galaxy S24 Ultra",
        "price": 129999,
        "category": "Smartphones",
        "scores": {"performance": 96, "camera": 97, "battery": 94, "value": 78}
    },
    {
        "id": "p3",
        "name": "Google Pixel 8 Pro",
        "price": 79999,
        "category": "Smartphones",
        "scores": {"performance": 85, "camera": 95, "battery": 86, "value": 92}
    },
    {
        "id": "p4",
        "name": "OnePlus 12",
        "price": 64999,
        "category": "Smartphones",
        "scores": {"performance": 96, "camera": 90, "battery": 98, "value": 97}
    }
]

MOVIES_DATA = [
    {
        "id": "m1",
        "title": "Oppenheimer",
        "year": 2023,
        "imdbRating": 8.9,
        "runtimeMinutes": 180,
        "genre": ["Biography", "Drama", "History"]
    },
    {
        "id": "m2",
        "title": "Interstellar",
        "year": 2014,
        "imdbRating": 8.7,
        "runtimeMinutes": 169,
        "genre": ["Sci-Fi", "Adventure", "Drama"]
    }
]

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "CompareX API", "version": "1.0.0"})

@app.route('/api/products', methods=['GET'])
def get_products():
    max_budget = request.args.get('max_budget', type=float)
    if max_budget:
        filtered = [p for p in PRODUCTS_DATA if p['price'] <= max_budget]
        return jsonify(filtered)
    return jsonify(PRODUCTS_DATA)

@app.route('/api/recommend', methods=['POST'])
def recommend_winner():
    data = request.get_json() or {}
    product_ids = data.get('product_ids', [])
    priority = data.get('priority', 'balanced')

    weights = {
        'balanced': {'perf': 0.25, 'cam': 0.25, 'bat': 0.25, 'val': 0.25},
        'gaming': {'perf': 0.50, 'cam': 0.10, 'bat': 0.30, 'val': 0.10},
        'camera': {'perf': 0.15, 'cam': 0.55, 'bat': 0.15, 'val': 0.15},
        'battery': {'perf': 0.15, 'cam': 0.15, 'bat': 0.50, 'val': 0.20},
        'value': {'perf': 0.15, 'cam': 0.15, 'bat': 0.20, 'val': 0.50}
    }.get(priority, {'perf': 0.25, 'cam': 0.25, 'bat': 0.25, 'val': 0.25})

    selected = [p for p in PRODUCTS_DATA if p['id'] in product_ids]
    if not selected:
        return jsonify({"error": "No valid products found"}), 400

    best = None
    best_score = -1

    for p in selected:
        score = (
            p['scores']['performance'] * weights['perf'] +
            p['scores']['camera'] * weights['cam'] +
            p['scores']['battery'] * weights['bat'] +
            p['scores']['value'] * weights['val']
        )
        if score > best_score:
            best_score = score
            best = p

    return jsonify({
        "winner": best,
        "score": round(best_score, 1),
        "priority": priority
    })

@app.route('/api/movies', methods=['GET'])
def get_movies():
    return jsonify(MOVIES_DATA)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
