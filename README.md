# Igloo Model QR Viewer

This is a lightweight static site for phone-friendly 3D model viewing.

## What it does

- Lists available 3D models on a clean landing page
- Opens each model in a dedicated mobile viewer page
- Uses `<model-viewer>` for orbit/zoom interaction
- Includes an AR-ready button for supported devices
- Generates QR code SVG files that can be printed and placed around a room

## Important AR note

- Android devices are the most reliable for `GLB -> AR` flows
- iPhone users will still get the web viewer
- Native Quick Look on iPhone usually needs a matching `USDZ` file

## Local preview

This viewer is intentionally self-contained inside `local/model-qr-viewer` so it can be
copied out and deployed separately from the Igloo Agent app.

The folder also keeps:

- `models-src/` for the preserved copied source `.glb` files
- `models/` for the optimized web-ready `.glb` files used by the phone viewer

## Local preview

From `local/model-qr-viewer`, run a static server.

Example:

```powershell
cd "C:\igloo\igloo-core-service\Igloo Agent\local\model-qr-viewer"
python -m http.server 8000
```

Then open:

- `http://127.0.0.1:8000/index.html`

## QR generation

QR codes need a public base URL. Once the site is deployed, generate the QR assets with:

```powershell
cd "C:\igloo\igloo-core-service\Igloo Agent\local\model-qr-viewer"
npm install
$env:MODEL_VIEWER_BASE_URL="https://your-public-domain.example/model-viewer"
npm run qr
```

This writes SVG files into:

- `local/model-qr-viewer/qr/`
