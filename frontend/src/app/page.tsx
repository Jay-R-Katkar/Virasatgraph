"use client";

import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { 
  Compass, 
  MapPin, 
  BookOpen, 
  Box, 
  UploadCloud, 
  Search, 
  Languages, 
  Sparkles,
  Landmark,
  Layers,
  Volume2,
  CheckCircle2,
  Eye,
  Sliders
} from "lucide-react";

interface Monument {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    city: string;
  };
  period: string;
  style: string;
  inscription: string;
  summary: string;
}

export default function Home() {
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"explore" | "ingest" | "twin">("explore");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Audio Language State: English, Hindi, Gujarati
  const [audioLang, setAudioLang] = useState<"en" | "hi" | "gu">("hi");

  // Ingestion Form State
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCity, setUploadCity] = useState("Gujarat");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // 3D Canvas Ref & Controls
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [wireframe, setWireframe] = useState(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);

  // 1. Backend se data fetch karein
  const fetchMonuments = () => {
    fetch("http://localhost:8000/api/monuments")
      .then((res) => res.json())
      .then((data) => {
        setMonuments(data);
        if (data.length > 0 && !selectedMonument) setSelectedMonument(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMonuments();
  }, []);

  // 2. Real Three.js 3D Engine Initialization (WebGL Stepwell Pavilion)
  useEffect(() => {
    if (activeTab !== "twin" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0c0a09); // Stone-950

    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(0, 4, 9);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfffbeb, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xd97706, 2.5);
    sunLight.position.set(5, 10, 7);
    scene.add(sunLight);

    const pointLight = new THREE.PointLight(0xf59e0b, 1.5, 15);
    pointLight.position.set(-3, 2, -2);
    scene.add(pointLight);

    // Procedural Heritage Monument (Stepped Pavilion & Carved Pillars)
    const group = new THREE.Group();
    meshGroupRef.current = group;

    const stoneMaterial = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.85,
      metalness: 0.1,
      wireframe: wireframe
    });

    // Tiered Steps (Baoli / Stepped Architecture)
    for (let i = 0; i < 5; i++) {
      const stepGeo = new THREE.BoxGeometry(7 - i * 1.1, 0.35, 7 - i * 1.1);
      const stepMesh = new THREE.Mesh(stepGeo, stoneMaterial);
      stepMesh.position.y = -1.5 + i * 0.35;
      group.add(stepMesh);
    }

    // Carved Pillars
    const pillarPositions = [
      [-1.8, -1.8], [1.8, -1.8], [-1.8, 1.8], [1.8, 1.8],
      [0, -1.8], [0, 1.8]
    ];
    pillarPositions.forEach(([x, z]) => {
      const pillarGeo = new THREE.CylinderGeometry(0.18, 0.22, 2.8, 16);
      const pillar = new THREE.Mesh(pillarGeo, stoneMaterial);
      pillar.position.set(x, 1.4, z);
      group.add(pillar);

      // Pillar capital ornament
      const capGeo = new THREE.BoxGeometry(0.55, 0.2, 0.55);
      const cap = new THREE.Mesh(capGeo, stoneMaterial);
      cap.position.set(x, 2.8, z);
      group.add(cap);
    });

    // Upper Pavillion Lintel / Canopy
    const lintelGeo = new THREE.BoxGeometry(4.4, 0.3, 4.4);
    const lintel = new THREE.Mesh(lintelGeo, stoneMaterial);
    lintel.position.y = 2.95;
    group.add(lintel);

    scene.add(group);

    // Mouse Interaction for 3D Orbiting
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      group.rotation.y += deltaX * 0.008;
      group.rotation.x += deltaY * 0.008;

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => { isDragging = false; };
    const onWheel = (e: WheelEvent) => {
      camera.position.z = Math.min(Math.max(camera.position.z + e.deltaY * 0.01, 4), 16);
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("wheel", onWheel);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        group.rotation.y += 0.003;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("wheel", onWheel);
      renderer.dispose();
    };
  }, [activeTab, wireframe]);

  // 3. Bulletproof Multilingual Audio Guide (Works on every system)
  const playAudioGuide = (monument: Monument) => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-Speech not supported in your browser.");
      return;
    }
    window.speechSynthesis.cancel();

    const voices = window.speechSynthesis.getVoices();
    
    // Look for Gujarati voice first, then Hindi/Indian voice
    const gujVoice = voices.find(v => v.lang.startsWith("gu"));
    const hindiVoice = voices.find(v => v.lang.startsWith("hi") || v.lang.includes("IN") || v.name.toLowerCase().includes("india"));
    const engVoice = voices.find(v => v.lang.startsWith("en"));

    let textToSpeak = "";
    let targetVoice: SpeechSynthesisVoice | undefined = undefined;
    let langCode = "hi-IN";

    if (audioLang === "gu") {
      if (gujVoice) {
        // Native Gujarati Voice available
        targetVoice = gujVoice;
        langCode = "gu-IN";
        textToSpeak = `${monument.name}. આ ઐતિહાસિક વારસો ${monument.location.city} માં આવેલો છે. ${monument.period} માં ${monument.style} શૈલીમાં નિર્માણ થયું હતું. શિલાલેખ: ${monument.inscription}.`;
      } else {
        // Fallback: Use Indian Voice with Gujarati phonetics (Never falls back to English!)
        targetVoice = hindiVoice;
        langCode = "hi-IN";
        textToSpeak = `${monument.name}. आ ऐतिहासिक वारसो ${monument.location.city} मां आवेली छे, जे ${monument.period} मां ${monument.style} शैलीमां बनाववामां आव्युं हतुं. शिलालेखनो विवरण: ${monument.inscription}.`;
      }
    } else if (audioLang === "hi") {
      targetVoice = hindiVoice;
      langCode = "hi-IN";
      textToSpeak = `${monument.name}. यह ऐतिहासिक धरोहर ${monument.location.city} में स्थित है, जिसे ${monument.period} के दौरान ${monument.style} में निर्मित किया गया था। शिलालेख का विवरण: ${monument.inscription}. ${monument.summary}`;
    } else {
      targetVoice = engVoice;
      langCode = "en-IN";
      textToSpeak = `${monument.name}, located in ${monument.location.city}. Built around ${monument.period} in ${monument.style}. Inscription record: ${monument.inscription}. ${monument.summary}`;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = langCode;
    if (targetVoice) {
      utterance.voice = targetVoice;
    }
    utterance.rate = 0.90;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // 4. File Ingestion Submit Handler
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle) {
      alert("Please provide a monument/archive title.");
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append("title", uploadTitle);
    formData.append("city", uploadCity);
    
    if (selectedFile) {
      formData.append("file", selectedFile);
    } else {
      const dummyFile = new File(["Explorer Fellowship Field Inscription Log"], "field_log.txt", { type: "text/plain" });
      formData.append("file", dummyFile);
    }

    try {
      const res = await fetch("http://localhost:8000/api/ingest", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.status === "success") {
        setUploadSuccess(true);
        setIsUploading(false);
        setUploadTitle("");
        setSelectedFile(null);
        fetchMonuments();
        setTimeout(() => setActiveTab("explore"), 1200);
      }
    } catch (err) {
      console.error("Ingestion failed:", err);
      setIsUploading(false);
    }
  };

  const filteredMonuments = monuments.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.style.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.location.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-stone-800 bg-stone-900/80 backdrop-blur sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center shadow-lg shadow-amber-900/40">
            <Landmark className="w-6 h-6 text-stone-950" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-amber-100 flex items-center gap-2">
              VirasatGraph
              <span className="text-[11px] bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded-full font-mono">
                IITGN Blithchron '27 Track 2
              </span>
            </h1>
            <p className="text-xs text-stone-400">
              Revitalising Unstructured Cultural & Architectural Heritage Archives
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-stone-800/90 p-1 rounded-xl border border-stone-700">
          <button 
            onClick={() => setActiveTab("explore")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm transition ${
              activeTab === "explore" ? "bg-amber-600 text-stone-950 font-bold shadow" : "text-stone-300 hover:text-white"
            }`}
          >
            <Compass className="w-4 h-4" /> Heritage Explorer
          </button>
          <button 
            onClick={() => setActiveTab("ingest")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm transition ${
              activeTab === "ingest" ? "bg-amber-600 text-stone-950 font-bold shadow" : "text-stone-300 hover:text-white"
            }`}
          >
            <UploadCloud className="w-4 h-4" /> AI Ingestion Lab
          </button>
          <button 
            onClick={() => setActiveTab("twin")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm transition ${
              activeTab === "twin" ? "bg-amber-600 text-stone-950 font-bold shadow" : "text-stone-300 hover:text-white"
            }`}
          >
            <Box className="w-4 h-4" /> 3D Digital Twin
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* TAB 1: HERITAGE EXPLORER & GEOSPATIAL */}
        {activeTab === "explore" && (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Sidebar */}
            <aside className="w-full md:w-96 border-r border-stone-800 p-4 flex flex-col gap-3 bg-stone-900/40 overflow-hidden">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search architecture, city, motif..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg pl-9 pr-3 py-2 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-stone-400 px-1">
                <span>Archived Discoveries ({filteredMonuments.length})</span>
                <span className="text-amber-400 flex items-center gap-1 font-mono">
                  <Sparkles className="w-3 h-3" /> Explorer Fellowship
                </span>
              </div>

              {loading ? (
                <div className="text-stone-500 text-sm text-center py-10">Connecting to heritage engine...</div>
              ) : (
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                  {filteredMonuments.map((monument) => (
                    <div
                      key={monument.id}
                      onClick={() => setSelectedMonument(monument)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition ${
                        selectedMonument?.id === monument.id
                          ? "bg-amber-950/40 border-amber-500/70 shadow-lg shadow-amber-950/30"
                          : "bg-stone-900/70 border-stone-800 hover:border-stone-700"
                      }`}
                    >
                      <h3 className="font-semibold text-stone-200 text-sm flex items-center justify-between">
                        {monument.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-amber-400 font-mono">
                        <MapPin className="w-3 h-3" /> {monument.location.city} · {monument.period}
                      </div>
                      <p className="text-xs text-stone-400 mt-1.5 line-clamp-2">
                        {monument.summary}
                      </p>
                      <div className="mt-2.5 flex items-center gap-2">
                        <span className="text-[10px] bg-stone-800 text-amber-200/90 px-2 py-0.5 rounded border border-stone-700 font-mono">
                          {monument.style}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </aside>

            {/* Right Pane */}
            <section className="flex-1 p-6 overflow-y-auto flex flex-col gap-5">
              {selectedMonument ? (
                <>
                  {/* Hero Card */}
                  <div className="bg-gradient-to-r from-amber-950/50 via-stone-900 to-stone-900 border border-amber-900/50 p-6 rounded-2xl relative overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-mono text-amber-500 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                          <Layers className="w-3.5 h-3.5" /> Architectural Documentation
                        </div>
                        <h2 className="text-2xl font-bold text-white">{selectedMonument.name}</h2>
                        <p className="text-xs text-stone-400 mt-1 flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-amber-500" />
                          GPS: {selectedMonument.location.lat.toFixed(4)}° N, {selectedMonument.location.lng.toFixed(4)}° E ({selectedMonument.location.city}, Gujarat)
                        </p>
                      </div>

                      {/* Multilingual Audio Selector */}
                      <div className="flex items-center gap-2">
                        <select
                          value={audioLang}
                          onChange={(e) => setAudioLang(e.target.value as "en" | "hi" | "gu")}
                          className="bg-stone-800 border border-stone-700 text-amber-300 text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-amber-500 font-medium cursor-pointer"
                        >
                          <option value="hi">🇮🇳 हिन्दी (Hindi)</option>
                          <option value="gu">🏛️ ગુજરાતી (Gujarati)</option>
                          <option value="en">🇬🇧 English</option>
                        </select>

                        <button 
                          onClick={() => playAudioGuide(selectedMonument)}
                          className="bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
                        >
                          <Volume2 className="w-4 h-4 text-amber-400" /> Listen
                        </button>
                        
                        <button 
                          onClick={() => setActiveTab("twin")}
                          className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-md shadow-amber-900/30"
                        >
                          <Box className="w-4 h-4" /> 3D Twin
                        </button>
                      </div>
                    </div>

                    <p className="mt-4 text-stone-300 text-xs md:text-sm leading-relaxed border-t border-stone-800/80 pt-4">
                      {selectedMonument.summary}
                    </p>
                  </div>

                  {/* Geospatial Map Visualizer */}
                  <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                        <Compass className="w-4 h-4" /> Explorer Fellowship Expedition Corridor (Gujarat)
                      </div>
                      <span className="text-[11px] font-mono text-stone-400">
                        Active Anchor: {selectedMonument.location.city}
                      </span>
                    </div>

                    <div className="h-44 w-full bg-stone-950 rounded-xl border border-stone-800 relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] opacity-15"></div>
                      
                      <div className="z-10 flex items-center justify-around w-full px-6">
                        {monuments.map((m) => (
                          <div 
                            key={m.id}
                            onClick={() => setSelectedMonument(m)}
                            className={`flex flex-col items-center cursor-pointer transition transform hover:scale-110 ${
                              selectedMonument.id === m.id ? "scale-110" : "opacity-60"
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                              selectedMonument.id === m.id 
                                ? "bg-amber-600 border-amber-300 shadow-lg shadow-amber-500/50" 
                                : "bg-stone-800 border-stone-600"
                            }`}>
                              <Landmark className="w-4 h-4 text-stone-950" />
                            </div>
                            <span className="text-[11px] font-bold text-stone-200 mt-1">{m.location.city}</span>
                            <span className="text-[9px] font-mono text-amber-400/90">{m.location.lat.toFixed(2)}°N</span>
                          </div>
                        ))}
                      </div>

                      <div className="absolute bottom-2 left-3 text-[10px] text-stone-500 font-mono">
                        Spatial projection: WGS84 · Dynamic Geodesic Trajectory
                      </div>
                    </div>
                  </div>

                  {/* Tri-Fusion Architecture Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-stone-900/50 border border-stone-800 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1.5">
                        <MapPin className="w-4 h-4" /> Geotagged Anchors
                      </div>
                      <p className="text-[11px] text-stone-400">
                        Extracted from photographic EXIF and travel telemetry.
                      </p>
                      <div className="mt-2.5 p-2 bg-stone-950 rounded-lg text-xs font-mono text-stone-300 border border-stone-800">
                        Lat: {selectedMonument.location.lat.toFixed(4)}<br/>
                        Lng: {selectedMonument.location.lng.toFixed(4)}
                      </div>
                    </div>

                    <div className="bg-stone-900/50 border border-stone-800 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1.5">
                        <Languages className="w-4 h-4" /> Inscription Transcription
                      </div>
                      <p className="text-[11px] text-stone-400">
                        Vision transformer transcription of stone plaques.
                      </p>
                      <div className="mt-2.5 p-2 bg-stone-950 rounded-lg text-xs font-mono text-amber-200 border border-stone-800 line-clamp-3">
                        {selectedMonument.inscription}
                      </div>
                    </div>

                    <div className="bg-stone-900/50 border border-stone-800 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1.5">
                        <BookOpen className="w-4 h-4" /> Masonry & Typology
                      </div>
                      <p className="text-[11px] text-stone-400">
                        Identified architectural school and structural classification.
                      </p>
                      <div className="mt-2.5 p-2 bg-stone-950 rounded-lg text-xs text-stone-300 border border-stone-800">
                        {selectedMonument.style} ({selectedMonument.period})
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-stone-500 text-center py-20">Select an archive node to inspect.</div>
              )}
            </section>
          </div>
        )}

        {/* TAB 2: AI INGESTION PORTAL */}
        {activeTab === "ingest" && (
          <div className="flex-1 p-6 max-w-4xl mx-auto flex flex-col gap-5 overflow-y-auto">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <UploadCloud className="w-6 h-6 text-amber-500" />
                Unstructured Archive Ingestion Pipeline
              </h2>
              <p className="text-xs text-stone-400 mt-1">
                Drop raw Explorer Fellowship trip folders, PDFs, or stone inscription photos. The pipeline extracts EXIF GPS, runs Indic OCR, and generates 3D spatial anchors.
              </p>
            </div>

            <form onSubmit={handleUploadSubmit} className="bg-stone-900/70 border border-stone-800 rounded-2xl p-6 flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                    Heritage Site / Inscription Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Modhera Sun Temple Kund (સૂર્ય મંદિર કુંડ)"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                    Regional Location / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mehsana, Gujarat"
                    value={uploadCity}
                    onChange={(e) => setUploadCity(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                  Upload Inscription Photo or Travel Journal File
                </label>
                <div className="border-2 border-dashed border-stone-700 hover:border-amber-500/70 bg-stone-950/60 rounded-xl p-6 flex flex-col items-center justify-center text-center transition cursor-pointer relative">
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <UploadCloud className="w-8 h-8 text-amber-500 mb-2" />
                  <span className="text-xs font-medium text-stone-300">
                    {selectedFile ? selectedFile.name : "Click or drag raw image / document here"}
                  </span>
                  <span className="text-[10px] text-stone-500 mt-1">
                    Accepts JPG, PNG, TXT, PDF from Fellowship records
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setUploadTitle("Dada Harir Stepwell (દાદા હરિર વાવ)");
                    setUploadCity("Asarwa, Ahmedabad");
                  }}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Quick Fill Explorer Sample
                </button>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="bg-amber-600 hover:bg-amber-500 disabled:bg-stone-700 text-stone-950 font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition shadow-lg shadow-amber-900/40"
                >
                  {isUploading ? (
                    <>Processing Inscription & Spatial Anchor...</>
                  ) : (
                    <>Run Revitalisation Pipeline</>
                  )}
                </button>
              </div>

              {uploadSuccess && (
                <div className="mt-2 p-3 bg-emerald-950/50 border border-emerald-500/50 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Document revitalised! Indexed into geospatial knowledge graph and added to Explorer tab.
                </div>
              )}
            </form>

            <div className="bg-stone-900/50 border border-stone-800 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-stone-300 mb-2.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" /> Four-Stage Automated Multimodal Pipeline
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 text-[11px]">
                <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                  <span className="text-amber-500 font-bold block mb-1">1. EXIF Extractor</span>
                  Extracts geolocation & timestamp from raw camera imagery.
                </div>
                <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                  <span className="text-amber-500 font-bold block mb-1">2. Vision & OCR</span>
                  Devanagari/Gujarati script recognition on stone plaques.
                </div>
                <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                  <span className="text-amber-500 font-bold block mb-1">3. Entity Tagging</span>
                  Identifies Dynasty, Century, and Architectural Motif.
                </div>
                <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                  <span className="text-amber-500 font-bold block mb-1">4. Spatial Graph</span>
                  Indexes node into vector database for natural language query.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 3D DIGITAL TWIN */}
        {activeTab === "twin" && (
          <div className="flex-1 p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Box className="w-5 h-5 text-amber-500" />
                  WebGL 3D Digital Twin: {selectedMonument?.name || "Adalaj Stepwell"}
                </h2>
                <p className="text-xs text-stone-400">
                  Interactive real-time 3D reconstruction rendering Solanki stepped subterranean geometry.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition flex items-center gap-1.5 ${
                    wireframe 
                      ? "bg-amber-600 text-stone-950 border-amber-400 font-bold" 
                      : "bg-stone-900 text-stone-300 border-stone-700 hover:border-stone-500"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" /> {wireframe ? "Solid Mesh" : "Wireframe Mode"}
                </button>
              </div>
            </div>

            <div className="flex-1 bg-stone-950 border border-stone-800 rounded-2xl relative overflow-hidden min-h-[460px] flex items-center justify-center">
              <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

              <div className="absolute bottom-4 left-4 bg-stone-900/80 backdrop-blur border border-stone-700/80 px-3.5 py-2 rounded-xl text-xs text-stone-300 flex items-center gap-3 pointer-events-none">
                <span className="flex items-center gap-1 text-amber-400 font-mono">
                  <Sliders className="w-3.5 h-3.5" /> Left-Click + Drag: 360° Rotate
                </span>
                <span className="text-stone-500">|</span>
                <span className="font-mono text-stone-400">Scroll: Zoom Depth</span>
                <span className="text-stone-500">|</span>
                <span className="font-mono text-amber-300">Style: {selectedMonument?.style}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}