const page = document.body.dataset.page;

if (page === "index") {
  renderIndex();
}

if (page === "viewer") {
  renderViewer();
}

if (page === "ar") {
  renderArLaunch();
}

function renderIndex() {
  const models = window.MODEL_VIEWER_MODELS || [];
  const grid = document.getElementById("model-grid");
  if (!grid) {
    return;
  }

  const cards = models
    .map(
      (model) => `
        <article class="model-card">
          <div class="card-art" aria-hidden="true"></div>
          <div>
            <p class="eyebrow">${escapeHtml(model.category)}</p>
            <h2 class="card-title">${escapeHtml(model.title)}</h2>
            <p class="card-copy">${escapeHtml(model.description)}</p>
          </div>
          <div class="viewer-meta">
            ${model.notes.map((note) => `<span class="meta-pill">${escapeHtml(note)}</span>`).join("")}
          </div>
          <div class="card-actions">
            <a class="button" href="./viewer.html?model=${encodeURIComponent(model.id)}">Open model</a>
            <a class="button-secondary" href="./qr/${encodeURIComponent(model.id)}.svg">QR code</a>
          </div>
        </article>
      `
    )
    .join("");

  grid.innerHTML = cards;
}

function renderViewer() {
  const params = new URLSearchParams(window.location.search);
  const modelId = params.get("model") || "";
  const model = window.getModelById(modelId);
  if (!model) {
    window.location.replace("./index.html");
    return;
  }

  document.title = `${model.title} | Igloo Model Portal`;

  const title = document.getElementById("model-title");
  const tag = document.getElementById("model-tag");
  const description = document.getElementById("model-description");
  const meta = document.getElementById("model-meta");
  const rawModelLink = document.getElementById("raw-model-link");
  const viewer = document.getElementById("model-viewer");

  const modelSrc = `./models/${model.filename}`;

  title.textContent = model.title;
  tag.textContent = model.category;
  description.textContent = model.description;
  rawModelLink.href = modelSrc;
  rawModelLink.setAttribute("download", model.filename);
  viewer.setAttribute("src", modelSrc);
  viewer.setAttribute("alt", `${model.title} 3D model`);

  meta.innerHTML = [
    ...model.notes,
    "Use two fingers to zoom",
  ]
    .map((item) => `<span class="meta-pill">${escapeHtml(item)}</span>`)
    .join("");
}

function renderArLaunch() {
  const params = new URLSearchParams(window.location.search);
  const modelId = params.get("model") || "";
  const model = window.getModelById(modelId);
  if (!model) {
    window.location.replace("./index.html");
    return;
  }

  const title = document.getElementById("ar-title");
  const tag = document.getElementById("ar-tag");
  const description = document.getElementById("ar-description");
  const openNow = document.getElementById("ar-open-now");
  const openViewer = document.getElementById("ar-open-viewer");

  const pageUrl = new URL(window.location.href);
  const modelUrl = new URL(`./models/${model.filename}`, pageUrl).toString();
  const viewerUrl = new URL(`./viewer.html?model=${encodeURIComponent(model.id)}`, pageUrl).toString();
  const sceneViewerIntent = createSceneViewerIntent(model.title, modelUrl, viewerUrl);

  title.textContent = `Open ${model.title} in AR`;
  tag.textContent = model.category;
  description.textContent = `If your Android phone supports Google Scene Viewer and Google Play Services for AR, this should open straight into AR for ${model.title}.`;
  openNow.href = sceneViewerIntent;
  openViewer.href = viewerUrl;

  if (isAndroid()) {
    window.setTimeout(() => {
      window.location.href = sceneViewerIntent;
    }, 120);
  }
}

function createSceneViewerIntent(title, modelUrl, fallbackUrl) {
  const file = encodeURIComponent(modelUrl);
  const linkTitle = encodeURIComponent(title);
  const fallback = encodeURIComponent(fallbackUrl);
  return `intent://arvr.google.com/scene-viewer/1.0?file=${file}&mode=ar_preferred&title=${linkTitle}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${fallback};end;`;
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
