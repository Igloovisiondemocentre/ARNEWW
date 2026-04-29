window.MODEL_VIEWER_MODELS = [
  {
    id: "neighbourhood-city-modular-lowpoly",
    title: "Neighbourhood City Modular Lowpoly",
    filename: "neighbourhood_city_modular_lowpoly.glb",
    category: "Low poly cityscape",
    description: "A stylised modular neighbourhood scene suited to quick browsing and playful urban exhibits.",
    notes: ["Interactive 3D", "Android AR-friendly", "Good for fast loading"],
  },
  {
    id: "seoul-city-gameready-render",
    title: "Seoul City Game-Ready Render",
    filename: "seoul_city__gameready__render__blender__pbr.glb",
    category: "Dense urban environment",
    description: "A more detailed city model with game-ready styling, useful for high-impact urban storytelling.",
    notes: ["PBR materials", "Interactive 3D", "Android AR-friendly"],
  },
  {
    id: "city-scene",
    title: "City Scene",
    filename: "city_scene.glb",
    category: "General city scene",
    description: "A flexible city environment for broad architectural, planning, or urban design display moments.",
    notes: ["Interactive 3D", "Android AR-friendly", "General purpose"],
  },
  {
    id: "la-street-art-alleyway",
    title: "LA Street Art Alleyway",
    filename: "la_street_art_alleyway_iphone_12_lidar_scan.glb",
    category: "LiDAR scan",
    description: "A scanned alleyway environment with real-world texture and street detail, ideal for immersive contextual viewing.",
    notes: ["Real-world scan", "Interactive 3D", "Android AR-friendly"],
  },
  {
    id: "exterior-architecture",
    title: "Exterior Architecture",
    filename: "exterior_architecture.glb",
    category: "Architectural exterior",
    description: "An exterior architectural model for built-environment viewing, placemaking, and design presentation moments.",
    notes: ["Architecture", "Interactive 3D", "Android AR-friendly"],
  },
];

window.getModelById = function getModelById(modelId) {
  var models = window.MODEL_VIEWER_MODELS || [];
  for (var i = 0; i < models.length; i += 1) {
    if (models[i].id === modelId) {
      return models[i];
    }
  }

  return null;
};
