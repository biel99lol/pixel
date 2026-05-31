<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>
<body>
<script>
const urlParams = new URLSearchParams(window.location.search);
const imgUrl = urlParams.get('url');
const w = parseInt(urlParams.get('w')) || 64;
const h = parseInt(urlParams.get('h')) || 64;

if (!imgUrl) {
    document.write("ERROR: missing url");
} else {
    const img = new Image();
    img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const imgData = ctx.getImageData(0, 0, w, h).data;
        
        const palette = [];
        const paletteMap = {};
        const indices = [];
        
        for (let i = 0; i < imgData.length; i += 4) {
            const key = imgData[i] + ',' + imgData[i+1] + ',' + imgData[i+2];
            if (!paletteMap[key]) {
                paletteMap[key] = palette.length;
                palette.push([imgData[i], imgData[i+1], imgData[i+2]]);
            }
            indices.push(paletteMap[key]);
        }
        
        const jsonData = JSON.stringify({ w: w, h: h, p: palette, i: indices });
        
        fetch('https://hastebin.com/documents', {
            method: 'POST',
            body: jsonData
        }).then(res => res.json()).then(data => {
            document.write('https://hastebin.com/raw/' + data.key);
        }).catch(err => {
            document.write('ERROR: ' + err.message);
        });
    };
    img.onerror = function() {
        document.write('ERROR: failed to load image');
    };
    img.src = imgUrl;
}
</script>
</body>
</html>
