"use client";

import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { 
  Landmark, 
  Search, 
  MapPin, 
  Volume2, 
  Box, 
  UploadCloud, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Menu, 
  X, 
  Compass, 
  CheckCircle2, 
  Sliders, 
  Eye, 
  ExternalLink,
  Layers,
  GraduationCap,
  History,
  Archive,
  Send
} from "lucide-react";

interface Monument {
  id: string;
  name: string;
  nameGujarati: string;
  category: "Stepwells" | "Temples" | "Forts & Palaces" | "Archaeological Sites" | "Historical Places" | "Museums";
  city: string;
  state: string;
  period: string;
  style: string;
  coordinates: { lat: number; lng: number };
  image: string;
  shortDesc: string;
  fullHistory: string;
  architectureDetails: string;
  inscriptionRecord: string;
  significance: string;
  audioText: {
    en: string;
    hi: string;
    gu: string;
  };
}

const MONUMENTS_DATA: Monument[] = [
  {
    id: "rani_ki_vav",
    name: "Rani ki Vav",
    nameGujarati: "રાણકી વાવ",
    category: "Stepwells",
    city: "Patan",
    state: "Gujarat",
    period: "11th Century CE (c. 1063)",
    style: "Maru-Gurjara Architecture",
    coordinates: { lat: 23.8589, lng: 72.1014 },
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "An extraordinary 11th-century stepwell celebrated for its intricate stone carvings and inverted-temple design.",
    fullHistory: "Commissioned by Queen Udayamati in memory of King Bhima I of the Chaulukya (Solanki) dynasty in 1063 CE. Silted over by the Saraswati river for centuries until excavated by the Archaeological Survey of India in the 1980s, revealing pristine subterranean stone galleries.",
    architectureDetails: "Constructed as an inverted temple highlighting the sacred sanctity of water. Measures 65m long, 20m wide, and 28m deep across seven subterranean levels adorned with over 500 principal sculptures and 1,000 minor religious figurines carved out of local Dhrangadhra sandstone.",
    inscriptionRecord: "Chaulukya dynastic stone tablets and memorial foundation records honoring Queen Udayamati's piety and water conservation philanthropy.",
    significance: "Declared a UNESCO World Heritage Site in 2014, representing the pinnacle of subterranean water architecture in the Indian subcontinent.",
    audioText: {
      en: "Rani ki Vav in Patan, Gujarat, is a UNESCO World Heritage site built in 1063 CE by Queen Udayamati. Designed as an inverted subterranean temple with seven tiers, it contains over 500 principal sculptures dedicated to Lord Vishnu.",
      hi: "पाटन स्थित रानी की वाव यूनेस्को विश्व धरोहर स्थल है। इसे 1063 ईस्वी में सोलंकी वंश की रानी उदयामती ने बनवाया था। यह सात मंजिला भूमिगत बावड़ी भगवान विष्णु के विभिन्न रूपों को समर्पित 500 से अधिक बारीक नक्काशीदार मूर्तियों से सुसज्जित है।",
      gu: "પાટણ આવેલી રાણકી વાવ યુનેસ્કો વર્લ્ડ હેરિટેજ સાઇટ છે. ઇસવીસન ૧૦૬૩માં સોલંકી વંશના રાણી ઉદયમતીએ આ વાવનું નિર્માણ કરાવ્યું હતું. સાત માળ ઊંડી આ વાવમાં ભગવાન વિષ્ણુના દશાવતાર અને ૫૦૦થી વધુ અદભૂત શિલ્પો કોતરેલા છે."
    }
  },
  {
    id: "adalaj_stepwell",
    name: "Adalaj Stepwell",
    nameGujarati: "અડાલજની વાવ",
    category: "Stepwells",
    city: "Gandhinagar",
    state: "Gujarat",
    period: "1498 CE",
    style: "Solanki-Indo-Islamic Blend",
    coordinates: { lat: 23.1667, lng: 72.5801 },
    image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "A remarkable stepwell known for detailed stonework and multi-level, light-filled architecture.",
    fullHistory: "Built in 1498 by Queen Rudabai, wife of Vaghela chieftain Rana Veer Singh. Completed during the reign of Sultan Mahmud Begada, resulting in a harmonious fusion of Hindu motifs and Islamic geometric lattice ornamentation.",
    architectureDetails: "A five-storey subterranean octagonal pavilion structure built of sandstone. Features triple entrance stairs converging at the first underground platform, supported on richly carved stone pillars that filter natural sunlight down to the cool subterranean water level.",
    inscriptionRecord: "Sanskrit inscription on marble stone stating: 'संवत १५५५ वर्षे माघ सुदी ५...' recording the dedication of the stepwell for public rest and irrigation by Queen Rudadevi.",
    significance: "Located minutes away from IIT Gandhinagar, it stands as a celebrated example of grassroots public welfare engineering and cross-cultural masonry.",
    audioText: {
      en: "Adalaj Stepwell near Gandhinagar was constructed in 1498 CE by Queen Rudabai. Built five storeys deep with an octagonal central shaft, it seamlessly combines Solanki carvings with Indo-Islamic floral architecture.",
      hi: "गांधीनगर के निकट अडालज की वाव का निर्माण 1498 ईस्वी में रानी रूदाबाई ने करवाया था। पांच मंजिला गहरी यह अष्टकोणीय बावड़ी भारतीय-इस्लामी और सोलंकी स्थापत्य कला का अनुपम संगम है।",
      gu: "ગાંધીનગર પાસે આવેલી અડાલજની વાવ ૧૪૯૮માં રાણી રૂડાબાઈ દ્વારા બનાવવામાં આવી હતી. પાંચ માળ ઊંડી આ અષ્ટકોણીય વાવમાં સોલંકી સ્થાપત્ય અને ઇન્ડો-ઇસ્લામિક કલાત્મક કોતરણી જોવા મળે છે."
    }
  },
  {
    id: "modhera_sun_temple",
    name: "Modhera Sun Temple",
    nameGujarati: "મોઢેરા સૂર્ય મંદિર",
    category: "Temples",
    city: "Modhera",
    state: "Gujarat",
    period: "1026–1027 CE",
    style: "Māru-Gurjara Temple Architecture",
    coordinates: { lat: 23.5835, lng: 72.1330 },
    image: "https://images.unsplash.com/photo-1599818816943-41c0e3933ef7?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "A historic temple complex recognised for its architectural composition and association with solar worship.",
    fullHistory: "Built during the reign of King Bhima I of the Chaulukya dynasty following the raid of Mahmud of Ghazni. Strategically designed on the Tropic of Cancer along the banks of the Pushpavati river.",
    architectureDetails: "Comprises three axial components: the Gūḍhamaṇḍapa (sanctum assembly), the open pillared Sabhāmaṇḍapa with 52 intricately sculpted pillars depicting episodes from the Ramayana and Mahabharata, and the Surya Kund (stepped reservoir) with 108 miniature shrines.",
    inscriptionRecord: "Inverted inscription on back wall recording Vikram Samvat 1083 (1026–1027 CE) attributing construction to the reign of Bhimadeva I.",
    significance: "Engineered so that on solar equinoxes, the rising sun's first rays illuminated the bejeweled crown of Surya inside the sanctum sanctorum.",
    audioText: {
      en: "Modhera Sun Temple in Mehsana was built in 1026 CE by King Bhima I. Famous for its 52-pillared Sabha Mandap and the grand Surya Kund with 108 miniature step-shrines, it is a marvel of ancient solar engineering.",
      hi: "मेहसाणा का मोढेरा सूर्य मंदिर 1026 ईस्वी में राजा भीम प्रथम द्वारा बनवाया गया था। इसके 52 नक्काशीदार खंभे साल के 52 सप्ताह का प्रतीक हैं, और सामने स्थित सूर्य कुंड 108 लघु मंदिरों से सुशोभित है।",
      gu: "મહેસાણા જિલ્લામાં આવેલું મોઢેરાનું સૂર્ય મંદિર ઇસવીસન ૧૦૨૬માં સોલંકી રાજા ભીમદેવ પ્રથમે બંધાવ્યું હતું. ૫૨ કોતરેલા સ્તંભોવાળો સભામંડપ અને ૧૦૮ નાના મંદિરોવાળો સૂર્યકુંડ સ્થાપત્યનો અદભૂત નમૂનો છે."
    }
  },
  {
    id: "champaner_pavagadh",
    name: "Champaner-Pavagadh Archaeological Park",
    nameGujarati: "ચાંપાનેર-પાવાગઢ પુરાતત્વીય ઉદ્યાન",
    category: "Archaeological Sites",
    city: "Champaner",
    state: "Gujarat",
    period: "8th–16th Century CE",
    style: "Pre-Mughal Indo-Islamic & Hindu Fortification",
    coordinates: { lat: 22.4833, lng: 73.5333 },
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "A historic landscape featuring archaeological remains and architecture from the medieval sultanate.",
    fullHistory: "Founded as the capital of Sultan Mahmud Begada in the late 15th century atop ancient Chavda and Khichi Chauhan Rajput foundations on Pavagadh hill. An unexcavated complete medieval city.",
    architectureDetails: "Contains over 114 documented monuments including fortifications, palace gateways, pavilions, and the majestic Jami Masjid known for its towering minarets, central dome, and finely filigreed stone jalis.",
    inscriptionRecord: "Arabic and Persian royal decrees on mosque gateways documenting the flourishing trade, irrigation reservoirs, and city planning under the Gujarat Sultanate.",
    significance: "Gujarat's first UNESCO World Heritage Site (2004), preserving the only completely unexcavated, intact pre-Mughal Islamic city in India.",
    audioText: {
      en: "Champaner-Pavagadh Archaeological Park is a UNESCO World Heritage site featuring medieval fortifications, water channels, and the breathtaking 16th-century Jami Masjid built by Sultan Mahmud Begada.",
      hi: "चांपानेर-पावागढ़ पुरातत्व पार्क यूनेस्को विश्व धरोहर स्थल है। पावागढ़ पहाड़ी की तलहटी में बसा यह प्राचीन नगर सुल्तान महमूद बेगड़ा द्वारा बसाई गई जामी मस्जिद और मध्यकालीन किलों के लिए प्रसिद्ध है।",
      gu: "ચાંપાનેર-પાવાગઢ પુરાતત્વીય ઉદ્યાન ગુજરાતની પ્રથમ યુનેસ્કો વર્લ્ડ હેરિટેજ સાઇટ છે. સુલતાન મહમૂદ બેગડા દ્વારા સ્થાપિત જામા મસ્જિદ અને ઐતિહાસિક કિલ્લેબંધી મધ્યકાલીન ઇતિહાસની સાક્ષી પૂરે છે."
    }
  },
  {
    id: "laxmi_vilas_palace",
    name: "Laxmi Vilas Palace",
    nameGujarati: "લક્ષ્મી વિલાસ મહેલ",
    category: "Forts & Palaces",
    city: "Vadodara",
    state: "Gujarat",
    period: "1890 CE",
    style: "Indo-Saracenic Revival Architecture",
    coordinates: { lat: 22.2860, lng: 73.1930 },
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "A prominent royal palace known for its distinctive Indo-Saracenic architecture.",
    fullHistory: "Commissioned by Maharaja Sayajirao Gaekwad III in 1890, designed by British architect Major Charles Mant and completed by Robert Chisholm. Built at a cost of £180,000 as the official residence of the royal Gaekwads of Baroda.",
    architectureDetails: "Four times the size of Buckingham Palace, constructed using golden Agra sandstone, Rajasthani red stone, and Italian marble. The Durbar Hall features Venetian mosaic floors, stained-glass windows depicting Indian mythology, and a 300-foot clock tower.",
    inscriptionRecord: "Gaekwad royal insignia, Marathi and English foundation plaques honoring Maharaja Sayajirao III's progressive educational, constitutional, and social reforms.",
    significance: "Considered one of the grandest private royal residences in the world, embodying the confluence of Rajput, Mughal, Gothic, and Renaissance craft.",
    audioText: {
      en: "Laxmi Vilas Palace in Vadodara was built in 1890 by Maharaja Sayajirao Gaekwad III. Four times larger than Buckingham Palace, it features Indo-Saracenic arches, Venetian mosaics, and Belgian stained glass.",
      hi: "वडोदरा का लक्ष्मी विलास पैलेस 1890 में महाराजा सयाजीराव गायकवाड़ तृतीय द्वारा बनवाया गया था। यह बकिंघम पैलेस से चार गुना बड़ा है और इंडो-सारसेनिक शैली, इतालवी मोज़ेक और भव्य दरबार हॉल के लिए विख्यात है।",
      gu: "વડોદરાનો લક્ષ્મી વિલાસ મહેલ ૧૮૯૦માં મહારાજા સયાજીરાવ ગાયકવાડ ત્રીજા દ્વારા બનાવવામાં આવ્યો હતો. બકિંગહામ પેલેસ કરતાં ચાર ગણો મોટો આ મહેલ ઇન્ડો-સારાસેનિક શૈલી, બેલ્જિયન કાચ અને ભવ્ય દરબાર હોલ માટે વિશ્વપ્રસિદ્ધ છે."
    }
  },
  {
    id: "ahmedabad_historic_city",
    name: "Ahmedabad Historic City",
    nameGujarati: "અમદાવાદ ઐતિહાસિક શહેર",
    category: "Historical Places",
    city: "Ahmedabad",
    state: "Gujarat",
    period: "1411 CE onwards",
    style: "Traditional Pol Architecture & Wooden Haveli Carvings",
    coordinates: { lat: 23.0225, lng: 72.5714 },
    image: "https://images.unsplash.com/photo-1588096344356-91e63a8a303e?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "A historic urban landscape of traditional neighbourhoods and rich architectural heritage.",
    fullHistory: "Founded in 1411 CE by Sultan Ahmed Shah on the eastern banks of the Sabarmati river. Became a global textile trade metropolis famous for its peaceful co-existence of Jain, Hindu, and Islamic communities.",
    architectureDetails: "Characterized by densely packed 'Pols'—gated residential micro-clusters with self-contained rainwater harvesting, internal chowks, and ornate timber-framed facades featuring wooden bird-feeders (chabutras) and intricately carved brackets.",
    inscriptionRecord: "Bilingual inscriptions at Bhadra Fort, Teen Darwaza, and Sidi Saiyyed Mosque capturing centuries of civic history and the world-famous 'Tree of Life' stone jali lattice.",
    significance: "India's first UNESCO World Heritage City (inscribed 2017), celebrated for its living grassroots community heritage and climate-responsive vernacular planning.",
    audioText: {
      en: "Ahmedabad, India's first UNESCO World Heritage City, was founded in 1411 CE. Its historic walled pols feature intricately carved wooden havelis, underground rainwater cisterns, and the iconic Tree of Life stone lattice.",
      hi: "भारत का पहला यूनेस्को विश्व धरोहर शहर, अहमदाबाद 1411 ईस्वी में सुल्तान अहमद शाह द्वारा बसाया गया था। इसकी ऐतिहासिक पोलें, लकड़ी की नक्काशीदार हवेलियां और सीदी सैय्यद की जाली विश्व प्रसिद्ध हैं।",
      gu: "ભારતનું પ્રથમ યુનેસ્કો વર્લ્ડ હેરિટેજ સિટી અમદાવાદ ૧૪૧૧માં સુલતાન અહેમદ શાહે વસાવ્યું હતું. તેની ઐતિહાસિક પોળો, લાકડાની કોતરણીવાળી હવેલીઓ અને સીદી સૈયદની જાળી સમગ્ર વિશ્વમાં જાણીતી છે."
    }
  }
];

const CATEGORIES = [
  { id: "all", name: "All Heritage", count: 6 },
  { id: "Historical Places", name: "Historical Places", count: 1, image: "https://images.unsplash.com/photo-1588096344356-91e63a8a303e?auto=format&fit=crop&w=400&q=80", num: "1" },
  { id: "Stepwells", name: "Stepwells", count: 2, image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=400&q=80", num: "2" },
  { id: "Temples", name: "Temples", count: 1, image: "https://images.unsplash.com/photo-1599818816943-41c0e3933ef7?auto=format&fit=crop&w=400&q=80", num: "3" },
  { id: "Forts & Palaces", name: "Forts & Palaces", count: 1, image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80", num: "4" },
  { id: "Museums", name: "Museums", count: 1, image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=400&q=80", num: "5" },
  { id: "Archaeological Sites", name: "Archaeological Sites", count: 1, image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=400&q=80", num: "6" },
  { id: "Cultural Heritage", name: "Cultural Heritage", count: 1, image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80", num: "7" },
  { id: "3D Explorer", name: "3D Explorer", count: 6, image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80", num: "8" }
];

export default function Home() {
  const [monuments, setMonuments] = useState<Monument[]>(MONUMENTS_DATA);
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<"home" | "detail" | "ingest">("home");
  const [detailTab, setDetailTab] = useState<"overview" | "3d_twin">("overview");
  
  // Audio Language State
  const [audioLang, setAudioLang] = useState<"gu" | "hi" | "en">("gu");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // AI Q&A State
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState<string | null>(null);

  // 3D Canvas Ref & Controls
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [wireframe, setWireframe] = useState(false);

  // Ingestion Form State
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCity, setUploadCity] = useState("Gujarat");
  const [uploadCategory, setUploadCategory] = useState<Monument["category"]>("Stepwells");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Smooth scroll handler for all buttons
  const navigateTo = (sectionId?: string) => {
    setActiveView("home");
    setMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Open 3D View directly for any monument
  const open3DView = (monument: Monument) => {
    setSelectedMonument(monument);
    setActiveView("detail");
    setDetailTab("3d_twin");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Open Detail View for any monument
  const openDetailView = (monument: Monument) => {
    setSelectedMonument(monument);
    setActiveView("detail");
    setDetailTab("overview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Audio Guide with Gujarati, Hindi, English
  const playAudioGuide = (monument: Monument, lang: "gu" | "hi" | "en") => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-Speech not supported in your browser.");
      return;
    }
    window.speechSynthesis.cancel();

    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    const gujVoice = voices.find(v => v.lang.startsWith("gu"));
    const hindiVoice = voices.find(v => v.lang.startsWith("hi") || v.lang.includes("IN") || v.name.toLowerCase().includes("india"));
    const engVoice = voices.find(v => v.lang.startsWith("en"));

    let textToSpeak = monument.audioText[lang];
    let targetVoice: SpeechSynthesisVoice | undefined = undefined;
    let langCode = "gu-IN";

    if (lang === "gu") {
      if (gujVoice) {
        targetVoice = gujVoice;
        langCode = "gu-IN";
      } else {
        targetVoice = hindiVoice;
        langCode = "hi-IN";
      }
    } else if (lang === "hi") {
      targetVoice = hindiVoice;
      langCode = "hi-IN";
    } else {
      targetVoice = engVoice;
      langCode = "en-IN";
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = langCode;
    if (targetVoice) utterance.voice = targetVoice;
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  // Three.js 3D Viewport in Walnut Brown & Amber Glow
  useEffect(() => {
    if (activeView !== "detail" || detailTab !== "3d_twin" || !canvasRef.current || !selectedMonument) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x19110a); // Deep Walnut Canvas

    const width = canvas.clientWidth || 400;
    const height = canvas.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.8, 8.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Warm Ambient + Radiant Amber Direct Lights
    const ambientLight = new THREE.AmbientLight(0xf4efe3, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xf59e0b, 2.8);
    sunLight.position.set(5, 9, 6);
    scene.add(sunLight);

    const fillLight = new THREE.PointLight(0xd97706, 1.6, 20);
    fillLight.position.set(-4, 2, -2);
    scene.add(fillLight);

    const group = new THREE.Group();

    const sandstone = new THREE.MeshStandardMaterial({
      color: 0xd69947,
      roughness: 0.78,
      metalness: 0.12,
      wireframe: wireframe
    });

    const darkBaseMat = new THREE.MeshStandardMaterial({
      color: 0x5c3d23,
      roughness: 0.9,
      wireframe: wireframe
    });

    if (selectedMonument.category === "Stepwells") {
      for (let i = 0; i < 6; i++) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(7 - i * 1.05, 0.3, 7 - i * 1.05), sandstone);
        step.position.y = -2.1 + i * 0.3;
        group.add(step);
      }
      const pillars = [[-1.6, -1.6], [1.6, -1.6], [-1.6, 1.6], [1.6, 1.6], [0, -1.6], [0, 1.6]];
      pillars.forEach(([x, z]) => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 2.5, 16), sandstone);
        col.position.set(x, 0.6, z);
        group.add(col);
        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.16, 0.5), sandstone);
        cap.position.set(x, 1.85, z);
        group.add(cap);
      });
      const canopy = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.25, 4.2), sandstone);
      canopy.position.y = 2.0;
      group.add(canopy);
    } else if (selectedMonument.category === "Temples") {
      const base = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.6, 5.5), darkBaseMat);
      base.position.y = -1.6;
      group.add(base);
      const shikhar = new THREE.Mesh(new THREE.ConeGeometry(1.6, 3.2, 8), sandstone);
      shikhar.position.set(0, 1.2, -0.6);
      group.add(shikhar);
      const kalash = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), sandstone);
      kalash.position.set(0, 2.9, -0.6);
      group.add(kalash);
      const mandapPillars = [[-1.2, 1.0], [1.2, 1.0], [-1.2, 2.0], [1.2, 2.0]];
      mandapPillars.forEach(([x, z]) => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 1.8, 12), sandstone);
        col.position.set(x, -0.4, z);
        group.add(col);
      });
      const dome = new THREE.Mesh(new THREE.SphereGeometry(1.4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), sandstone);
      dome.position.set(0, 0.5, 1.5);
      group.add(dome);
    } else {
      const palaceBase = new THREE.Mesh(new THREE.BoxGeometry(6.4, 2.0, 3.2), sandstone);
      palaceBase.position.y = -0.6;
      group.add(palaceBase);
      const mainDome = new THREE.Mesh(new THREE.SphereGeometry(1.1, 16, 16), sandstone);
      mainDome.position.set(0, 1.5, 0);
      group.add(mainDome);
      [-2.4, 2.4].forEach(x => {
        const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.45, 3.2, 16), sandstone);
        tower.position.set(x, 0.2, 0.8);
        group.add(tower);
        const chhatri = new THREE.Mesh(new THREE.ConeGeometry(0.6, 0.9, 12), sandstone);
        chhatri.position.set(x, 2.0, 0.8);
        group.add(chhatri);
      });
    }

    scene.add(group);

    // Mouse & Touch Orbit Controls
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onStart = (cx: number, cy: number) => { isDragging = true; prevX = cx; prevY = cy; };
    const onMove = (cx: number, cy: number) => {
      if (!isDragging) return;
      group.rotation.y += (cx - prevX) * 0.008;
      group.rotation.x += (cy - prevY) * 0.008;
      prevX = cx;
      prevY = cy;
    };
    const onEnd = () => { isDragging = false; };

    const onMouseDown = (e: MouseEvent) => onStart(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onMouseUp = onEnd;
    const onTouchStart = (e: TouchEvent) => { if (e.touches.length === 1) onStart(e.touches[0].clientX, e.touches[0].clientY); };
    const onTouchMove = (e: TouchEvent) => { if (e.touches.length === 1) onMove(e.touches[0].clientX, e.touches[0].clientY); };
    const onTouchEnd = onEnd;

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    const onResize = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.clientWidth;
      const h = canvasRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) group.rotation.y += 0.003;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      renderer.dispose();
    };
  }, [activeView, detailTab, selectedMonument, wireframe]);

  // AI Prompt Chips Handler
  const handleAIPrompt = (prompt: string) => {
    if (!selectedMonument) return;
    if (prompt.includes("simple language")) {
      setChatResponse(`${selectedMonument.name} is an architectural marvel in ${selectedMonument.city}, Gujarat. Built around ${selectedMonument.period}, it showcases extraordinary craftsmanship designed for cultural reverence and communal harmony.`);
    } else if (prompt.includes("historically important")) {
      setChatResponse(`Historical Significance: ${selectedMonument.significance} ${selectedMonument.fullHistory}`);
    } else if (prompt.includes("architecture")) {
      setChatResponse(`Architectural Highlights: Built in ${selectedMonument.style}. ${selectedMonument.architectureDetails}`);
    } else if (prompt.includes("student")) {
      setChatResponse(`Quick Study Guide for Students: Site: ${selectedMonument.name} | Era: ${selectedMonument.period} | Style: ${selectedMonument.style} | Location: ${selectedMonument.city}. Key takeaway: Represents world-class Indian masonry, water-harvesting, and dynastic history.`);
    } else {
      setChatResponse(`Inscriptions & Records: ${selectedMonument.inscriptionRecord}. Related heritage sites include Patan Rani ki Vav, Adalaj, and the Sun Temple Modhera along Gujarat's cultural corridor.`);
    }
  };

  // Field Ingestion Submit
  const handleIngestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle) return;
    setIsUploading(true);
    setTimeout(() => {
      const newSite: Monument = {
        id: `ingested_${Date.now()}`,
        name: uploadTitle,
        nameGujarati: uploadTitle,
        category: uploadCategory,
        city: uploadCity,
        state: "Gujarat",
        period: "15th Century CE",
        style: "Solanki-Vaghela Transition",
        coordinates: { lat: 23.2 + Math.random() * 0.4, lng: 72.5 + Math.random() * 0.4 },
        image: selectedFile ? URL.createObjectURL(selectedFile) : "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1200&q=80",
        shortDesc: `Archived from field submission for ${uploadTitle}. Ingested into VirasatGraph knowledge repository.`,
        fullHistory: `Documented during the IIT Gandhinagar Explorer Fellowship expedition across ${uploadCity}, uncovering regional stone inscriptions and architectural remnants.`,
        architectureDetails: "Masonry typologies reveal multi-tiered carved sandstone lintels, underground conduits, and ornamental floral friezes.",
        inscriptionRecord: "Devanagari inscription rubbings recorded on northern plinth commemorating local foundation.",
        significance: "Preserves living vernacular heritage records in western India.",
        audioText: {
          en: `${uploadTitle} located in ${uploadCity}, Gujarat. Documented through Explorer Fellowship field surveys.`,
          hi: `${uploadTitle}, ${uploadCity} गुजरात में स्थित एक ऐतिहासिक धरोहर है। इसे शोधकर्ताओं द्वारा डिजिटाइज़ किया गया है।`,
          gu: `${uploadTitle}, ${uploadCity} ગુજરાતમાં આવેલું એક ઐતિહાસિક સ્થાપત્ય છે. આ વારસાનું ડિજિટલ દસ્તાવેજીકરણ કરવામાં આવ્યું છે.`
        }
      };
      setMonuments([newSite, ...monuments]);
      setIsUploading(false);
      setUploadSuccess(true);
      setUploadTitle("");
      setSelectedFile(null);
      setTimeout(() => {
        setUploadSuccess(false);
        openDetailView(newSite);
      }, 1000);
    }, 900);
  };

  const filteredMonuments = monuments.filter(m => {
    const matchesCat = activeCategory === "all" || m.category === activeCategory || (activeCategory === "3D Explorer");
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.style.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#2c1f15] font-sans antialiased selection:bg-[#f59e0b] selection:text-[#2a1b12]">
      
      {/* ----------------- HORIZONTAL TOP NAVBAR ----------------- */}
      <header className="sticky top-0 z-50 bg-[#281a10] text-[#fbf8f3] border-b border-[#442c1b] shadow-lg px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => navigateTo()}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-[#24170f] flex items-center justify-center font-bold shadow-md shadow-amber-950/40 transition group-hover:scale-105">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#fcfaf5] flex items-center gap-1.5">
                HeritageAI
                <span className="text-[10px] font-sans tracking-widest uppercase bg-[#3f2b1d] text-[#fbbf24] border border-[#f59e0b]/40 px-2.5 py-0.5 rounded-full">
                  IITGN
                </span>
              </div>
            </div>
          </div>

          {/* DESKTOP HORIZONTAL NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button 
              onClick={() => navigateTo()}
              className={`px-3 py-1.5 rounded-xl text-xs lg:text-sm font-semibold transition ${
                activeView === "home" ? "bg-[#3e2717] text-[#fbbf24]" : "text-[#e2dad0] hover:text-[#fbbf24]"
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo("monuments-grid")}
              className="px-3 py-1.5 rounded-xl text-xs lg:text-sm font-semibold text-[#e2dad0] hover:text-[#fbbf24] transition"
            >
              Explore Heritage
            </button>
            <button 
              onClick={() => navigateTo("categories-grid")}
              className="px-3 py-1.5 rounded-xl text-xs lg:text-sm font-semibold text-[#e2dad0] hover:text-[#fbbf24] transition"
            >
              Categories
            </button>
            <button 
              onClick={() => open3DView(monuments[0])}
              className="px-3 py-1.5 rounded-xl text-xs lg:text-sm font-semibold text-[#e2dad0] hover:text-[#fbbf24] flex items-center gap-1.5 transition"
            >
              <Box className="w-3.5 h-3.5 text-[#f59e0b]" /> 3D Explorer
            </button>
            <button 
              onClick={() => { setActiveView("ingest"); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`px-3 py-1.5 rounded-xl text-xs lg:text-sm font-semibold transition flex items-center gap-1.5 ${
                activeView === "ingest" ? "bg-[#3e2717] text-[#fbbf24]" : "text-[#e2dad0] hover:text-[#fbbf24]"
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5 text-[#f59e0b]" /> Ingestion Lab
            </button>
            <button 
              onClick={() => navigateTo("our-mission")}
              className="px-3 py-1.5 rounded-xl text-xs lg:text-sm font-semibold text-[#e2dad0] hover:text-[#fbbf24] transition"
            >
              About Mission
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative hidden xl:block">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#fbbf24]" />
              <input 
                type="text" 
                placeholder="Search monuments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#1c120b] border border-[#442f20] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#fcfaf5] placeholder-[#9c897a] focus:outline-none focus:border-[#f59e0b] w-48"
              />
            </div>

            <button 
              onClick={() => navigateTo("monuments-grid")}
              className="bg-gradient-to-r from-[#f59e0b] to-[#d97706] hover:from-[#fbbf24] hover:to-[#f59e0b] text-[#24170f] font-bold text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-amber-950/40 transition"
            >
              Explore Now <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger toggle */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 rounded-xl bg-[#1c120b] border border-[#442f20] flex items-center justify-center text-[#fbbf24] hover:text-white transition"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER (For Small Screens) */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="w-80 bg-[#251810] text-[#fbf8f3] h-full p-6 flex flex-col justify-between shadow-2xl border-l border-[#442d1e]">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#3b271a]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[#f59e0b] text-[#24170f] flex items-center justify-center font-bold">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <span className="font-serif font-bold text-lg text-[#fbfaf6]">HeritageAI</span>
                </div>
                <button onClick={() => setMenuOpen(false)} className="text-[#fbbf24] hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-2 font-medium text-sm">
                <button 
                  onClick={() => navigateTo()}
                  className="text-left py-2 px-3 rounded-xl hover:bg-[#382619] text-[#fbf8f3] transition"
                >
                  Home
                </button>
                <button 
                  onClick={() => navigateTo("monuments-grid")}
                  className="text-left py-2 px-3 rounded-xl hover:bg-[#382619] text-[#fbbf24] transition"
                >
                  Explore Heritage
                </button>
                <button 
                  onClick={() => navigateTo("categories-grid")}
                  className="text-left py-2 px-3 rounded-xl hover:bg-[#382619] text-[#fbf8f3] transition"
                >
                  Categories
                </button>
                <button 
                  onClick={() => { setMenuOpen(false); open3DView(monuments[0]); }}
                  className="text-left py-2 px-3 rounded-xl hover:bg-[#382619] text-[#fbf8f3] transition flex items-center gap-2"
                >
                  <Box className="w-4 h-4 text-[#f59e0b]" /> 3D Explorer
                </button>
                <button 
                  onClick={() => { setActiveView("ingest"); setMenuOpen(false); }}
                  className="text-left py-2 px-3 rounded-xl hover:bg-[#382619] text-[#fbf8f3] transition flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-[#f59e0b]" /> Digital Ingestion Lab
                  </span>
                  <span className="text-[10px] bg-[#f59e0b] text-[#24170f] font-bold px-1.5 py-0.5 rounded">NEW</span>
                </button>
                <button 
                  onClick={() => navigateTo("our-mission")}
                  className="text-left py-2 px-3 rounded-xl hover:bg-[#382619] text-[#fbf8f3] transition"
                >
                  About Mission
                </button>
              </nav>
            </div>

            <button 
              onClick={() => navigateTo("monuments-grid")}
              className="w-full bg-[#f59e0b] hover:bg-[#fbbf24] text-[#24170f] font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 shadow"
            >
              Explore Heritage <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ----------------- VIEW 1: HOME PAGE ----------------- */}
      {activeView === "home" && (
        <main>
          {/* HERO SECTION WITH TRANSPARENT HERITAGE STEPWELL BACKGROUND */}
          <section className="relative min-h-[520px] flex items-center justify-center text-center px-4 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1920&q=80')`
              }}
            />
            {/* Walnut-to-Sage Transparent Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#251810]/90 via-[#2d2017]/82 to-[#34463a]/88" />

            <div className="relative z-10 max-w-4xl mx-auto py-16 flex flex-col items-center">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#fbbf24] uppercase mb-4 drop-shadow">
                DISCOVER THE HERITAGE OF GUJARAT
              </span>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-[#faf8f4] tracking-tight leading-[1.1] mb-6 drop-shadow-md">
                Every Monument Has a Story.
              </h1>

              <p className="text-sm sm:text-lg text-[#ded7cb] max-w-2xl font-light leading-relaxed mb-8 drop-shadow">
                Journey through centuries of history, explore extraordinary architecture, and discover the stories behind Gujarat's remarkable cultural heritage.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
                <button 
                  onClick={() => navigateTo("monuments-grid")}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#f59e0b] to-[#d97706] hover:from-[#fbbf24] hover:to-[#f59e0b] text-[#24170f] font-bold text-sm sm:text-base px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition"
                >
                  Explore Heritage <ArrowRight className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => { setActiveView("ingest"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="w-full sm:w-auto bg-[#312217]/75 hover:bg-[#38261a] text-[#faf8f4] border border-[#fbbf24]/50 font-medium text-sm sm:text-base px-6 py-3 rounded-xl flex items-center justify-center gap-2 backdrop-blur-sm transition"
                >
                  Discover Our Archive
                </button>
              </div>
            </div>
          </section>

          {/* 8 CATEGORIES GRID */}
          <section id="categories-grid" className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
              {CATEGORIES.slice(1).map((cat) => (
                <div 
                  key={cat.id}
                  onClick={() => {
                    if (cat.id === "3D Explorer") {
                      open3DView(monuments[0]);
                    } else {
                      setActiveCategory(cat.id);
                      navigateTo("monuments-grid");
                    }
                  }}
                  className="bg-white border border-[#e8dfd5] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group flex flex-col"
                >
                  <div className="h-28 sm:h-32 w-full relative overflow-hidden bg-stone-100">
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                    <div className="absolute top-2 right-2 bg-[#f59e0b] text-[#24170f] text-[10px] font-bold w-5 h-5 rounded-md flex items-center justify-center shadow">
                      {cat.num}
                    </div>
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#2e1f14]">
                        {cat.name}
                      </h4>
                      <p className="text-[11px] text-[#5e7065] mt-1 line-clamp-2">
                        {cat.id === "Stepwells" && "Explore remarkable water architecture and intricately carved stepwells."}
                        {cat.id === "Historical Places" && "Discover historic landmarks and places that shaped Gujarat's past."}
                        {cat.id === "Temples" && "Discover sacred architecture, craftsmanship and historic temple complexes."}
                        {cat.id === "Forts & Palaces" && "Explore royal residences, defensive architecture and fortifications."}
                        {cat.id === "Museums" && "Discover collections, exhibitions and objects that preserve cultural history."}
                        {cat.id === "Archaeological Sites" && "Explore ancient settlements, landscapes and historic remains."}
                        {cat.id === "Cultural Heritage" && "Discover traditional crafts, performing arts, festivals and living traditions."}
                        {cat.id === "3D Explorer" && "Explore available digital models and immersive representations of sites."}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#b45309] group-hover:text-[#f59e0b] flex items-center gap-1 mt-3">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* DISCOVER ICONIC HERITAGE SITES */}
          <section id="monuments-grid" className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2e1f14] tracking-tight">
                Discover Iconic Heritage Sites
              </h2>
              <p className="text-xs sm:text-sm text-[#5f7366] mt-1.5">
                Explore documented monuments from across Gujarat, each with its own history, architecture and timeline.
              </p>
            </div>

            {/* Sage Green Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
              {CATEGORIES.slice(0, 7).map(c => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition whitespace-nowrap ${
                    activeCategory === c.id 
                      ? "bg-[#382619] text-[#fbbf24] shadow" 
                      : "bg-[#eaf0eb] text-[#3d5244] hover:bg-[#d8e4db]"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Monument Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMonuments.map((monument) => (
                <div 
                  key={monument.id}
                  className="bg-white border border-[#e6ded4] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                      <img 
                        src={monument.image} 
                        alt={monument.name}
                        className="w-full h-full object-cover hover:scale-105 transition duration-700" 
                      />
                      <span className="absolute top-3 left-3 bg-[#24170f]/90 text-[#fbbf24] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow">
                        {monument.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="font-serif font-bold text-lg text-[#2e1f14]">
                        {monument.name}
                      </h3>
                      <div className="text-[11px] font-medium text-[#647c6e] mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" />
                        {monument.city}, {monument.state}
                      </div>

                      <p className="text-xs text-[#526458] mt-3 line-clamp-3 leading-relaxed">
                        {monument.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Actions: View Details & 3D View */}
                  <div className="px-5 pb-5 pt-3 flex items-center justify-between border-t border-[#f4eee6]">
                    <button 
                      onClick={() => openDetailView(monument)}
                      className="text-xs font-bold text-[#b45309] hover:text-[#d97706] flex items-center gap-1.5 transition"
                    >
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button 
                      onClick={() => open3DView(monument)}
                      className="text-[11px] font-semibold bg-[#eaf0eb] text-[#344d3d] hover:bg-[#f59e0b] hover:text-[#24170f] px-2.5 py-1 rounded-md flex items-center gap-1 transition"
                    >
                      <Box className="w-3.5 h-3.5 text-[#f59e0b]" /> 3D View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* MISSION SECTION */}
          <section id="our-mission" className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
            <div className="bg-[#241810] text-[#faf8f4] rounded-2xl p-6 sm:p-10 shadow-xl border border-[#442e1f]">
              <div className="max-w-3xl">
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#fbbf24] bg-[#3a271a] px-2.5 py-1 rounded">
                  OUR MISSION
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#fcfaf6] mt-3 tracking-tight">
                  Preserving the Past. Inspiring the Future.
                </h2>
                <p className="text-xs sm:text-sm text-[#cbd4ce] mt-2.5 leading-relaxed">
                  HeritageAI improves digital access to heritage information, helps students learn about historical monuments, and organises reliable records in a structured archive — supporting cultural education and digital preservation.
                </p>
              </div>

              {/* 4 Focus Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
                <div className="bg-[#302115] border border-[#4a3424] rounded-xl p-3.5 flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-[#fbbf24]" />
                  <span className="text-xs font-semibold">Student learning</span>
                </div>
                <div className="bg-[#302115] border border-[#4a3424] rounded-xl p-3.5 flex items-center gap-3">
                  <Compass className="w-5 h-5 text-[#fbbf24]" />
                  <span className="text-xs font-semibold">Discovery & access</span>
                </div>
                <div className="bg-[#302115] border border-[#4a3424] rounded-xl p-3.5 flex items-center gap-3">
                  <History className="w-5 h-5 text-[#fbbf24]" />
                  <span className="text-xs font-semibold">Documented history</span>
                </div>
                <div className="bg-[#302115] border border-[#4a3424] rounded-xl p-3.5 flex items-center gap-3">
                  <Archive className="w-5 h-5 text-[#fbbf24]" />
                  <span className="text-xs font-semibold">Structured archive</span>
                </div>
              </div>

              <div className="mt-6 rounded-xl overflow-hidden h-40 sm:h-56 w-full border border-[#4a3424] relative">
                <img 
                  src="https://images.unsplash.com/photo-1599818816943-41c0e3933ef7?auto=format&fit=crop&w=1600&q=80" 
                  alt="Modhera Sun Temple Panoramic"
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </section>

          {/* EXPLORE BY REGION */}
          <section className="max-w-7xl mx-auto px-4 sm:px-8 py-6 mb-8">
            <h3 className="text-lg font-serif font-bold text-[#2e1f14]">Explore by Region</h3>
            <p className="text-xs text-[#5e7366]">Browse heritage records by city and heritage cluster across Gujarat.</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {["Ahmedabad", "Patan", "Vadodara", "Modhera", "Champaner", "Junagadh", "Somnath"].map(city => (
                <button 
                  key={city}
                  onClick={() => { setSearchQuery(city); navigateTo("monuments-grid"); }}
                  className="text-xs bg-[#eaf0eb] hover:bg-[#f59e0b] hover:text-[#24170f] text-[#344d3d] font-medium px-3 py-1.5 rounded-lg transition"
                >
                  {city}
                </button>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* ----------------- VIEW 2: DETAIL VIEW ----------------- */}
      {activeView === "detail" && selectedMonument && (
        <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 animate-fadeIn">
          <button 
            onClick={() => navigateTo()}
            className="text-xs font-bold text-[#2e1f14] hover:text-[#b45309] flex items-center gap-1.5 mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </button>

          <div className="relative rounded-2xl overflow-hidden border border-[#d8cec2] shadow-lg mb-8 bg-[#251810]">
            <div className="h-64 sm:h-80 w-full relative">
              <img 
                src={selectedMonument.image} 
                alt={selectedMonument.name}
                className="w-full h-full object-cover opacity-65" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#20140d] via-[#20140d]/50 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-[#fbfaf6]">
                <div className="flex items-center gap-2 flex-wrap text-xs font-semibold mb-2">
                  <span className="bg-[#f59e0b] text-[#24170f] px-2.5 py-0.5 rounded-md">
                    {selectedMonument.category}
                  </span>
                  <span className="bg-[#1b1009]/80 text-[#ddd6ca] px-2.5 py-0.5 rounded-md flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#fbbf24]" /> {selectedMonument.city}, {selectedMonument.state}
                  </span>
                  <span className="bg-[#1b1009]/80 text-[#ddd6ca] px-2.5 py-0.5 rounded-md">
                    {selectedMonument.period}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#faf8f4]">
                  {selectedMonument.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#fbbf24] font-medium mt-1">
                  {selectedMonument.nameGujarati} · {selectedMonument.style}
                </p>
              </div>
            </div>

            {/* Detail Tabs Bar */}
            <div className="bg-[#1e130b] px-6 py-2.5 flex items-center justify-between border-t border-[#3a2618] flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setDetailTab("overview")}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-lg transition ${
                    detailTab === "overview" 
                      ? "bg-[#f59e0b] text-[#24170f]" 
                      : "text-[#d6cdc2] hover:text-white"
                  }`}
                >
                  Overview & History
                </button>
                <button 
                  onClick={() => setDetailTab("3d_twin")}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                    detailTab === "3d_twin" 
                      ? "bg-[#f59e0b] text-[#24170f]" 
                      : "text-[#d6cdc2] hover:text-white"
                  }`}
                >
                  <Box className="w-3.5 h-3.5" /> 3D Digital Twin View
                </button>
              </div>

              {/* GUJARATI / HINDI / ENGLISH AUDIO GUIDE */}
              <div className="flex items-center gap-1.5">
                <select
                  value={audioLang}
                  onChange={(e) => setAudioLang(e.target.value as "gu" | "hi" | "en")}
                  className="bg-[#2a1a0e] border border-[#442c1b] text-[#fbbf24] text-xs rounded-lg px-2 py-1.5 focus:outline-none font-semibold cursor-pointer"
                >
                  <option value="gu">🏛️ ગુજરાતી (Gujarati)</option>
                  <option value="hi">🇮🇳 हिन्दी (Hindi)</option>
                  <option value="en">🇬🇧 English</option>
                </select>

                <button 
                  onClick={() => playAudioGuide(selectedMonument, audioLang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                    isPlayingAudio 
                      ? "bg-amber-600 text-white animate-pulse" 
                      : "bg-[#f59e0b] text-[#24170f] hover:bg-[#fbbf24]"
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  {isPlayingAudio ? "Playing..." : "Listen Audio"}
                </button>
              </div>
            </div>
          </div>

          {detailTab === "overview" && (
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-[#e4ded0] rounded-xl p-6 shadow-sm">
                  <h3 className="font-serif font-bold text-lg text-[#2e1f14] flex items-center gap-2 mb-3">
                    <History className="w-5 h-5 text-[#f59e0b]" /> Historical Background
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4b6053] leading-relaxed">
                    {selectedMonument.fullHistory}
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#f0ebe0]">
                    <span className="text-[11px] font-bold text-[#2e1f14] block mb-1">Architectural Epigraphy & Inscriptions:</span>
                    <p className="text-xs font-mono text-[#8c6721] bg-[#fbf8f0] p-2.5 rounded-lg border border-[#eedfc0]">
                      {selectedMonument.inscriptionRecord}
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-[#e4ded0] rounded-xl p-6 shadow-sm">
                  <h3 className="font-serif font-bold text-lg text-[#2e1f14] flex items-center gap-2 mb-3">
                    <Layers className="w-5 h-5 text-[#f59e0b]" /> Architectural Composition & Design
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4b6053] leading-relaxed">
                    {selectedMonument.architectureDetails}
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#f0ebe0]">
                    <span className="text-[11px] font-bold text-[#2e1f14] block mb-1">Cultural Significance:</span>
                    <p className="text-xs text-[#2b4d3a] bg-[#eaf0eb] p-2.5 rounded-lg border border-[#c4d6cb]">
                      {selectedMonument.significance}
                    </p>
                  </div>
                </div>
              </div>

              {/* INTERACTIVE PROMPT CHIPS */}
              <div className="bg-white border border-[#e4ded0] rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold tracking-wider uppercase text-[#b45309] mb-3">
                  Ask Heritage AI Assistant
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    "Explain this monument in simple language.",
                    "Why is this monument historically important?",
                    "What is special about its architecture?",
                    "Summarize its history for a student.",
                    "What other heritage sites are related?"
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleAIPrompt(chip)}
                      className="text-xs bg-[#f4f0e6] hover:bg-[#f59e0b] hover:text-[#24170f] text-[#2c1f15] font-medium px-3.5 py-1.5 rounded-lg border border-[#ded8c8] transition"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={`Ask about ${selectedMonument.name}...`}
                    className="flex-1 bg-[#f9f8f4] border border-[#dcd6c6] rounded-xl px-4 py-2 text-xs sm:text-sm text-[#2c1f15] focus:outline-none focus:border-[#f59e0b]"
                  />
                  <button 
                    onClick={() => { if (chatInput) { handleAIPrompt(chatInput); setChatInput(""); } }}
                    className="bg-[#24170f] hover:bg-[#382619] text-[#fbbf24] px-4 py-2 rounded-xl transition"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {chatResponse && (
                  <div className="mt-4 p-4 bg-[#f8f5ed] border border-[#e8dfcf] rounded-xl text-xs sm:text-sm text-[#2c1f15] leading-relaxed flex items-start gap-2.5">
                    <Sparkles className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#2e1f14] mb-1">Archive Insight:</strong>
                      {chatResponse}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white border border-[#e4ded0] rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2e1f14] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#f59e0b]" /> Location & Telemetry
                  </h4>
                  <p className="text-xs text-[#52685a] mt-1">
                    {selectedMonument.city}, {selectedMonument.state}, India
                  </p>
                  <p className="text-xs font-mono text-[#8a9e92] mt-0.5">
                    Coordinates: {selectedMonument.coordinates.lat.toFixed(4)}, {selectedMonument.coordinates.lng.toFixed(4)}
                  </p>
                </div>

                <a
                  href={`https://www.google.com/maps?q=${selectedMonument.coordinates.lat},${selectedMonument.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#24170f] hover:bg-[#382619] text-[#fbbf24] font-semibold text-xs px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow transition"
                >
                  Open in Maps <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {detailTab === "3d_twin" && (
            <div className="bg-[#18110b] rounded-2xl p-6 border border-[#38271a] text-[#faf8f4] flex flex-col gap-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2d1e13]">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#faf8f4] flex items-center gap-2">
                    <Box className="w-5 h-5 text-[#f59e0b]" />
                    3D Digital Twin: {selectedMonument.name}
                  </h3>
                  <p className="text-xs text-[#b0a59b] mt-0.5">
                    WebGL 3D structural twin reconstruction. Drag to rotate 360°, scroll to zoom depth.
                  </p>
                </div>

                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-mono transition flex items-center gap-1.5 ${
                    wireframe 
                      ? "bg-[#f59e0b] text-[#24170f] border-[#f59e0b] font-bold" 
                      : "bg-[#251810] text-[#fbbf24] border-[#442e1d] hover:border-[#f59e0b]"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" /> {wireframe ? "Solid Mesh" : "Wireframe Mode"}
                </button>
              </div>

              <div className="h-[440px] sm:h-[500px] w-full rounded-xl overflow-hidden relative border border-[#38271a] bg-[#120c08] flex items-center justify-center">
                <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

                <div className="absolute bottom-3 left-3 bg-[#20150d]/90 backdrop-blur border border-[#442e1d] px-3.5 py-1.5 rounded-lg text-xs text-[#ded7cc] flex items-center gap-2 pointer-events-none">
                  <Sliders className="w-3 h-3 text-[#f59e0b]" />
                  <span>360° Mouse / Touch Rotation</span>
                  <span className="text-[#523e2f]">|</span>
                  <span className="text-[#fbbf24]">{selectedMonument.style}</span>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* ----------------- VIEW 3: INGESTION LAB ----------------- */}
      {activeView === "ingest" && (
        <main className="max-w-4xl mx-auto px-4 sm:px-8 py-10 animate-fadeIn">
          <button 
            onClick={() => navigateTo()}
            className="text-xs font-bold text-[#2e1f14] hover:text-[#b45309] flex items-center gap-1.5 mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </button>

          <div className="bg-white border border-[#e4ded0] rounded-2xl p-6 sm:p-8 shadow-md">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#24170f] bg-[#f59e0b] px-2.5 py-1 rounded">
                FELLOWSHIP INGESTION LAB
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2e1f14] mt-2">
                Digitise Unstructured Field Archives
              </h2>
              <p className="text-xs sm:text-sm text-[#52685a] mt-1">
                Upload on-the-ground field reports, stone inscription rubbings, or architectural photographs from the Explorer Fellowship.
              </p>
            </div>

            <form onSubmit={handleIngestion} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#2e1f14] block mb-1">
                    Heritage Site / Monument Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dada Harir Stepwell (દાદા હરિર વાવ)"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="w-full bg-[#f9f8f4] border border-[#dcd6c6] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#2c1f15] focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#2e1f14] block mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asarwa, Ahmedabad"
                    value={uploadCity}
                    onChange={(e) => setUploadCity(e.target.value)}
                    className="w-full bg-[#f9f8f4] border border-[#dcd6c6] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#2c1f15] focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#2e1f14] block mb-1">
                  Heritage Category
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as Monument["category"])}
                  className="w-full bg-[#f9f8f4] border border-[#dcd6c6] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#2c1f15] focus:outline-none focus:border-[#f59e0b]"
                >
                  <option value="Stepwells">Stepwells (વાવ)</option>
                  <option value="Temples">Temples (મંદિર)</option>
                  <option value="Forts & Palaces">Forts & Palaces (કિલ્લા અને મહેલ)</option>
                  <option value="Archaeological Sites">Archaeological Sites (પુરાતત્વીય સ્થળ)</option>
                  <option value="Historical Places">Historical Places (ઐતિહાસિક સ્થળ)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#2e1f14] block mb-1">
                  Upload Photographic Survey or Field Notes
                </label>
                <div className="border-2 border-dashed border-[#c5bfae] hover:border-[#f59e0b] bg-[#fbfaf6] rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer relative">
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <UploadCloud className="w-8 h-8 text-[#f59e0b] mb-2" />
                  <span className="text-xs font-semibold text-[#2e1f14]">
                    {selectedFile ? selectedFile.name : "Tap to upload photos or field journals"}
                  </span>
                  <span className="text-[10px] text-[#73887c] mt-0.5">
                    JPG, PNG, PDF from Explorer Fellowship records
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setUploadTitle("Dada Harir Stepwell (દાદા હરિર વાવ)");
                    setUploadCity("Ahmedabad");
                    setUploadCategory("Stepwells");
                  }}
                  className="text-xs text-[#b45309] font-semibold hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" /> Fill Sample Survey
                </button>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="bg-[#24170f] hover:bg-[#382619] text-[#fbbf24] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition shadow flex items-center gap-2"
                >
                  {isUploading ? "Extracting Telemetry & OCR..." : "Revitalise and Index Site"}
                </button>
              </div>

              {uploadSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs flex items-center gap-2 mt-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Site successfully processed, geolocated, and indexed into HeritageAI!
                </div>
              )}
            </form>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="bg-[#20140c] text-[#faf8f4] border-t border-[#3a271a] py-10 px-4 sm:px-8 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#f59e0b] text-[#24170f] flex items-center justify-center font-bold">
                <Landmark className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-xl text-[#faf8f4]">HeritageAI</span>
            </div>
            <p className="text-xs text-[#b8ada4] mt-2 max-w-sm leading-relaxed">
              An interactive multimodal platform revitalising grassroots cultural archives and architectural heritage.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
            <div>
              <h5 className="font-serif font-bold text-[#fbbf24] uppercase tracking-wider mb-2.5">Heritage</h5>
              <ul className="space-y-1.5 text-[#a8c0b2]">
                <li>Stepwells (વાવ)</li>
                <li>Temples (મંદિર)</li>
                <li>Forts & Palaces</li>
                <li>Archaeological Sites</li>
              </ul>
            </div>

            <div>
              <h5 className="font-serif font-bold text-[#fbbf24] uppercase tracking-wider mb-2.5">Regions</h5>
              <ul className="space-y-1.5 text-[#a8c0b2]">
                <li>Ahmedabad</li>
                <li>Patan</li>
                <li>Vadodara</li>
                <li>Modhera</li>
                <li>Champaner</li>
              </ul>
            </div>

            <div>
              <h5 className="font-serif font-bold text-[#fbbf24] uppercase tracking-wider mb-2.5">Initiative</h5>
              <ul className="space-y-1.5 text-[#a8c0b2]">
                <li>IIT Gandhinagar</li>
                <li>Explorer Fellowship</li>
                <li>Digital Preservation</li>
                <li>Blithchron '27</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#312014] text-[11px] text-[#8c7b6f] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 HeritageAI / VirasatGraph — an independent educational project.</span>
          <span>Blithchron '27 Open Innovation · Track 2: Culture & Digital Heritage</span>
        </div>
      </footer>

    </div>
  );
}