from flask import Flask, request, jsonify
import requests
from PIL import Image
from io import BytesIO
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/pixelart', methods=['GET'])
def pixelart():
    url = request.args.get('url')
    w = int(request.args.get('w', 64))
    h = int(request.args.get('h', 64))
    
    if not url:
        return jsonify({'error': 'missing url'}), 400
    
    # Baixar imagem via proxy
    proxy = f"https://api.allorigins.win/raw?url={url}"
    resp = requests.get(proxy)
    img = Image.open(BytesIO(resp.content))
    img = img.resize((w, h))
    
    palette = []
    palette_map = {}
    indices = []
    
    pixels = img.load()
    
    for y in range(h):
        for x in range(w):
            r, g, b = pixels[x, y][:3]
            key = f"{r},{g},{b}"
            
            if key not in palette_map:
                palette_map[key] = len(palette)
                palette.append([r, g, b])
            
            indices.append(palette_map[key])
    
    return jsonify({
        'w': w,
        'h': h,
        'p': palette,
        'i': indices
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)
