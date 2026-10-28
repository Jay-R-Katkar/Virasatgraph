# 🏛️ VirasatGraph · IIT Gandhinagar Heritage Revitalisation Engine

> **Blithchron '27 · Open Innovation Hackathon**  
> **Track 2:** Culture & Digital Heritage (Problem ID: `HC26-CULT01`)  
> **Theme:** Digital Revitalisation of Unstructured Cultural & Architectural Heritage Archives

---

## 📌 Problem Context & Institutional Need
At **IIT Gandhinagar**, the *Explorer Fellowship* sends students across India to document grassroots cultural, craft, and architectural traditions. However, this massive repository frequently remains trapped in static presentation decks, unstructured field diaries, and disjointed cloud folders—creating an "archival graveyard."

**VirasatGraph** breathes life into this unstructured data through a unified **Tri-Fusion Multimodal Architecture**:
1. **Computer Vision & WebGL 3D Digital Twins:** Real-time 3D reconstruction of stepped subterranean architecture (*baolis*) and ornate stone pillars using Three.js.
2. **Archival Indic OCR & Multilingual Narration:** Digital transcription of historical Devanagari and Gujarati stone inscriptions with native in-browser voice synthesis (Hindi, Gujarati, English).
3. **Geospatial Expedition Corridor:** Spatially grounded mapping tying student travel trajectories and EXIF metadata to dynamic geographic anchors.

---

## 🏗️ System Architecture

```mermaid
graph TD
    A[Unstructured Field Archive: Photos / Inscriptions / Notes] -->|Multipart Form Upload| B[FastAPI Ingestion Engine]
    
    subgraph "Multimodal Ingestion Pipeline"
        B --> C[EXIF Geolocation Extractor]
        B --> D[Vision & Indic OCR Engine]
        B --> E[Architectural Typology Classifier]
    end

    C -->|Latitude / Longitude| F[(PostgreSQL / PostGIS & Vector DB)]
    D -->|Devanagari / Gujarati Transcripts| F
    E -->|Dynasty & Motif Taxonomy| F

    subgraph "Interactive Immersive Client (Next.js 14 + WebGL)"
        F --> G[Geospatial Expedition Corridor Map]
        F --> H[Three.js 3D WebGL Digital Twin Viewport]
        F --> I[Multilingual Audio Narration Engine: HI / GU / EN]
    end