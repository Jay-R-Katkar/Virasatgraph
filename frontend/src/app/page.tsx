"use client";

import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { 
  Landmark, Search, MapPin, Volume2, Box, UploadCloud, Sparkles, 
  ArrowRight, ArrowLeft, Menu, X, Compass, CheckCircle2, Sliders, 
  Eye, ExternalLink, Layers, GraduationCap, History, Archive, Send, 
  Home as HomeIcon, Grid, Info, Bot, Loader2, Play, Pause, ScanLine, 
  FileText, Image as ImageIcon, Mic, MicOff
} from "lucide-react";

interface InscriptionBox {
  id: string;
  top: number;
  left: number;
  width: number;
  height: number;
  script: string;
  transliteration: string;
  translation: string;
  confidence: number;
}

interface Monument {
  id: string;
  name: string;
  nameGujarati: string;
  category: "Stepwells" | "Temples" | "Forts & Palaces" | "Archaeological Sites" | "Historical Places";
  city: string;
  district: string;
  period: string;
  style: string;
  coordinates: { lat: number; lng: number };
  mapPosition: { x: number; y: number };
  image: string;
  fieldPhotos: string[];
  inscriptionImage: string;
  inscriptionBoxes: InscriptionBox[];
  shortDesc: string;
  fullHistory: string;
  architectureDetails: string;
  folkloreStory: string;
  significance: string;
  audioText: { en: string; hi: string; gu: string; };
}

interface AIResponseData {
  en: string;
  hi: string;
  gu: string;
}

const MONUMENTS_DATA: Monument[] = [
  {
    id: "rani_ki_vav",
    name: "Rani ki Vav",
    nameGujarati: "રાણકી વાવ",
    category: "Stepwells",
    city: "Patan",
    district: "Patan",
    period: "11th Century CE (c. 1063)",
    style: "Maru-Gurjara Subterranean Architecture",
    coordinates: { lat: 23.8589, lng: 72.1014 },
    mapPosition: { x: 44, y: 32 },
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Rani_Ki_Vav%2C_Above_View.JPG",
    fieldPhotos: [
      "https://upload.wikimedia.org/wikipedia/commons/4/4e/Rani_Ki_Vav%2C_Above_View.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/1/1d/Sculptures_in_Rani_ki_vav_03.jpg"
    ],
    inscriptionImage: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Sculptures_in_Rani_ki_vav_03.jpg",
    inscriptionBoxes: [
      { id: "b1", top: 18, left: 15, width: 70, height: 16, script: "संवत ११२० वर्षे चैत्र सुदी ३", transliteration: "Samvat 1120 Varshe Chaitra Sudi 3", translation: "In the Vikram year 1120, during the bright half of Chaitra", confidence: 98.7 },
      { id: "b2", top: 40, left: 20, width: 62, height: 18, script: "श्री चालुक्य वंशे राजा भीमदेव पत्न्या", transliteration: "Shri Chaulukya Vanshe Raja Bhimadeva Patnya", translation: "By Queen consort of Chaulukya King Bhimadeva I", confidence: 97.4 },
      { id: "b3", top: 64, left: 12, width: 76, height: 20, script: "उदयामत्या इदं वाप्याः निर्माणं कारितम्", transliteration: "Udayamatya Idam Vapyah Nirmanam Karitam", translation: "Queen Udayamati commissioned this stepwell for spiritual salvation", confidence: 99.1 }
    ],
    shortDesc: "An extraordinary 11th-century UNESCO World Heritage stepwell built as an inverted subterranean temple with over 500 sculpted deities.",
    fullHistory: "Commissioned by Queen Udayamati in memory of King Bhima I of the Chaulukya (Solanki) dynasty in 1063 CE. Silted over by the Saraswati river for centuries until excavated by the Archaeological Survey of India in the 1980s.",
    architectureDetails: "Constructed as an inverted temple across seven subterranean levels measuring 65m long, 20m wide, and 28m deep. Features over 500 principal sculptures and 1,000 minor religious figurines carved out of local Dhrangadhra sandstone.",
    folkloreStory: "Local lore says subterranean tunnels underneath the well connected Patan to Siddhpur, used by the royal family as secret evacuation corridors during invasions.",
    significance: "Declared a UNESCO World Heritage Site in 2014, representing the absolute pinnacle of subterranean water engineering in the Indian subcontinent.",
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
    city: "Adalaj",
    district: "Gandhinagar",
    period: "1498 CE",
    style: "Solanki-Indo-Islamic Blend",
    coordinates: { lat: 23.1667, lng: 72.5801 },
    mapPosition: { x: 50, y: 46 },
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Adalaj_Stepwell_Interior.jpg",
    fieldPhotos: [
      "https://upload.wikimedia.org/wikipedia/commons/c/c1/Adalaj_Stepwell_Interior.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/5/52/Adalaj_stepwell_pillars.jpg"
    ],
    inscriptionImage: "https://upload.wikimedia.org/wikipedia/commons/5/52/Adalaj_stepwell_pillars.jpg",
    inscriptionBoxes: [
      { id: "a1", top: 22, left: 16, width: 68, height: 18, script: "संवत १५५५ वर्षे माघ सुदी ५", transliteration: "Samvat 1555 Varshe Magha Sudi 5", translation: "In the Vikram year 1555, on the 5th day of the bright half of Magha", confidence: 98.2 },
      { id: "a2", top: 48, left: 14, width: 72, height: 22, script: "राणा वीरसिंह भार्यया रूदादेव्या इदं वाव निर्मितं", transliteration: "Rana Veersingh Bharyaya Rudadevya Idam Vav Nirmitam", translation: "Queen Rudadevi, consort of King Rana Veer Singh, constructed this stepwell", confidence: 97.9 }
    ],
    shortDesc: "A remarkable five-storey stepwell known for intricate pillars, octagonal light shafts, and Solanki floral carvings.",
    fullHistory: "Built in 1498 by Queen Rudabai, wife of Vaghela chieftain Rana Veer Singh. Completed during the reign of Sultan Mahmud Begada, resulting in a harmonious fusion of Hindu motifs and Islamic geometric lattice ornamentation.",
    architectureDetails: "A five-storey subterranean octagonal pavilion structure built of sandstone. Features triple entrance stairs converging at the first underground platform, supported on richly carved stone pillars that filter natural sunlight down to the cool subterranean water level.",
    folkloreStory: "Legend records that Sultan Begada fell in love with Queen Rudabai upon conquest; she agreed on the condition he finish the well, after which she plunged into the waters to preserve her devotion to her slain husband.",
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
    district: "Mehsana",
    period: "1026–1027 CE",
    style: "Māru-Gurjara Temple Architecture",
    coordinates: { lat: 23.5835, lng: 72.1330 },
    mapPosition: { x: 46, y: 38 },
    image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Sun_Temple_Modhera.jpg",
    fieldPhotos: ["https://upload.wikimedia.org/wikipedia/commons/2/29/Sun_Temple_Modhera.jpg"],
    inscriptionImage: "https://upload.wikimedia.org/wikipedia/commons/2/29/Sun_Temple_Modhera.jpg",
    inscriptionBoxes: [
      { id: "m1", top: 30, left: 20, width: 60, height: 20, script: "विक्रम संवत १०८३ वर्षे", transliteration: "Vikram Samvat 1083 Varshe", translation: "In the Vikram year 1083 (1026 CE)", confidence: 99.3 },
      { id: "m2", top: 55, left: 15, width: 70, height: 22, script: "श्रीमद् भीमदेव प्रवर्तमाने सूर्य देवालयं प्रतिष्ठापितम्", transliteration: "Shrimad Bhimadeva Pravartamane Surya Devalayam", translation: "During the reign of King Bhimadeva, this temple dedicated to Sun God was consecrated", confidence: 98.8 }
    ],
    shortDesc: "A masterwork of solar temple architecture featuring a 52-pillared Sabha Mandapa and the 108-shrine Surya Kund reservoir.",
    fullHistory: "Built during the reign of King Bhima I of the Chaulukya dynasty. Strategically designed on the Tropic of Cancer along the banks of the Pushpavati river.",
    architectureDetails: "Comprises three axial components: the Gūḍhamaṇḍapa, the open pillared Sabhāmaṇḍapa with 52 intricately sculpted pillars depicting the Ramayana and Mahabharata, and the Surya Kund with 108 miniature shrines.",
    folkloreStory: "The sanctum was designed such that on equinoxes, the very first ray of the rising sun pierced the eastern gate to illuminate the ruby diamond set on Surya's crown.",
    significance: "Engineered with celestial alignment, serving as an ancient astronomical and spiritual observatory.",
    audioText: {
      en: "Modhera Sun Temple in Mehsana was built in 1026 CE by King Bhima I. Famous for its 52-pillared Sabha Mandap and the grand Surya Kund with 108 miniature step-shrines, it is a marvel of ancient solar engineering.",
      hi: "मेहसाणा का मोढेरा सूर्य मंदिर 1026 ईस्वी में राजा भीम प्रथम द्वारा बनवाया गया था। इसके 52 नक्काशीदार खंभे साल के 52 सप्ताह का प्रतीक हैं, और सामने स्थित सूर्य कुंड 108 लघु मंदिरों से सुशोभित है।",
      gu: "મહેસાણા જિલ્લામાં આવેલું મોઢેરાનું સૂર્ય મંદિર ઇસવીસન ૧૦૨૬માં સોલંકી રાજા ભીમદેવ પ્રથમે બંધાવ્યું હતું. ૫૨ કોતરેલા સ્તંભોવાળો સભામંડપ અને ૧૦૮ નાના મંદિરોવાળો સૂર્યકુંડ સ્થાપત્યનો અદભૂત નમૂનો છે."
    }
  },
  {
    id: "dholavira_harappan",
    name: "Dholavira: Harappan City",
    nameGujarati: "ધોળાવીરા: હડપ્પન નગર",
    category: "Archaeological Sites",
    city: "Khadir Bet",
    district: "Kutch",
    period: "3000 BCE – 1500 BCE",
    style: "Harappan Stone Hydraulic Engineering",
    coordinates: { lat: 23.8864, lng: 70.2131 },
    mapPosition: { x: 26, y: 30 },
    image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Water_reservoir_at_Dholavira_site.jpg",
    fieldPhotos: ["https://upload.wikimedia.org/wikipedia/commons/7/78/Water_reservoir_at_Dholavira_site.jpg"],
    inscriptionImage: "https://upload.wikimedia.org/wikipedia/commons/7/78/Water_reservoir_at_Dholavira_site.jpg",
    inscriptionBoxes: [
      { id: "d1", top: 35, left: 12, width: 76, height: 24, script: "🕮 🜂 🜄 🜁 🝯 (10 Pictographic Indus Glyphs)", transliteration: "Ten-character Dholavira Signboard Inlay", translation: "Royal or municipal civic proclamation mounted at the northern citadel gateway", confidence: 95.8 }
    ],
    shortDesc: "A UNESCO World Heritage Indus Valley metropolis celebrated for massive stone-cut rainwater reservoirs and ancient urban planning.",
    fullHistory: "Occupied over 1,500 years across seven cultural stages. Excavated by archaeologist R.S. Bisht, revealing a citadel, middle town, and 16 massive rock-cut rainwater harvesting reservoirs.",
    architectureDetails: "Constructed entirely of stone with giant underground storm drains, water conduits, and a stadium. Also features the famous 10-character Indus script signboard.",
    folkloreStory: "Desert legends of Kutch refer to Dholavira as Kotada Timba (large fort mound), long known to pastoral Rabari nomads before modern excavations.",
    significance: "Declared a UNESCO World Heritage Site in 2021, representing the zenith of pre-historic hydraulic engineering in South Asia.",
    audioText: {
      en: "Dholavira in Kutch is a UNESCO World Heritage Indus Valley site dating back to 3000 BCE. Renowned for its massive stone-cut water reservoirs, multi-tiered citadel, and the ancient 10-character Harappan signboard.",
      hi: "कच्छ स्थित धोलावीरा 5000 वर्ष पुराना हड़प्पा कालीन महानगर और यूनेस्को विश्व धरोहर स्थल है। यह पत्थर से बने विशाल जल संरक्षण जलाशयों, सुनियोजित नगर व्यवस्था और 10 अक्षरों वाले प्राचीन साइनबोर्ड के लिए प्रसिद्ध है।",
      gu: "કચ્છના ખદીર બેટ પર આવેલું ધોળાવીરા ૫૦૦૦ વર્ષ જૂનું સિંધુ ખીણની સભ્યતાનું યુનેસ્કો વર્લ્ડ હેરિટેજ નગર છે. પથ્થરથી બનેલા વિશાળ જળાશયો, નગર આયોજન અને ૧૦ અક્ષરોનું હડપ્પન સાઇનબોર્ડ વિશ્વભરમાં જાણીતું છે."
    }
  },
  {
    id: "somnath_temple",
    name: "Somnath Temple",
    nameGujarati: "સોમનાથ જ્યોતિર્લિંગ મંદિર",
    category: "Temples",
    city: "Prabhas Patan",
    district: "Gir Somnath",
    period: "Ancient origin, reconstructed 1951 CE",
    style: "Kailash Mahameru Prasad (Chalukyan Architecture)",
    coordinates: { lat: 20.8880, lng: 70.4013 },
    mapPosition: { x: 30, y: 84 },
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Somnath_temple.JPG",
    fieldPhotos: ["https://upload.wikimedia.org/wikipedia/commons/c/ce/Somnath_temple.JPG"],
    inscriptionImage: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Somnath_temple.JPG",
    inscriptionBoxes: [
      { id: "s1", top: 40, left: 18, width: 64, height: 22, script: "आसमुद्रांत दक्षिण ध्रुव पर्यंत अबाधित ज्योतिर्मार्ग", transliteration: "Asamudranta Dakshina Dhruva Paryanta Abadhita Jyotirmarga", translation: "Direct unobstructed light path from this coastal meridian all the way to Antarctica", confidence: 99.6 }
    ],
    shortDesc: "The sacred first Aadi Jyotirlinga of Lord Shiva standing on the edge of the Arabian Sea, an eternal symbol of spiritual resilience.",
    fullHistory: "Referred to in the Rigveda, the temple witnessed multiple historical destructions and seven successive reconstructions. The modern temple was consecrated in 1951 led by Sardar Vallabhbhai Patel.",
    architectureDetails: "Built in Kailash Mahameru Prasad style using golden sandstone from Dhrangadhra. Features an imposing 155-foot high main spire (shikhar) and the famous Baan Stambh (arrow pillar).",
    folkloreStory: "According to Skanda Purana, the moon god Chandra bathed in the Saraswati river confluence at Somnath and regained his glow through Lord Shiva's grace.",
    significance: "The foremost of the twelve Jyotirlingas, demonstrating unbroken civilisational resilience.",
    audioText: {
      en: "Somnath Temple in Gir Somnath is the first of the twelve sacred Jyotirlingas of Lord Shiva. Located at the edge of the Arabian Sea, its towering 155-foot spire and Baan Stambh represent centuries of cultural resilience.",
      hi: "प्रभास पाटन स्थित सोमनाथ मंदिर भगवान शिव के बारह ज्योतिर्लिंगों में सर्वप्रथम माना जाता है। अरब सागर के तट पर स्थित यह भव्य मंदिर भारत के सांस्कृतिक पुनरुत्थान और अटूट आस्था का प्रतीक है।",
      gu: "ગીર સોમનાથમાં આવેલું શ્રી સોમનાથ મંદિર ભગવાન શિવના પ્રથમ જ્યોતિર્લિંગ તરીકે પૂજાય છે. અરબી સમુદ્રના કિનારે આવેલું ૧૫૫ ફૂટ ઊંચું આ મંદિર અને બાણસ્તંભ ભારતીય સંસ્કૃતિની અખંડ શ્રદ્ધાનું પ્રતીક છે."
    }
  },
  {
    id: "dwarkadhish_temple",
    name: "Dwarkadhish Temple (Jagat Mandir)",
    nameGujarati: "દ્વારકાધીશ મંદિર (જગત મંદિર)",
    category: "Temples",
    city: "Dwarka",
    district: "Devbhumi Dwarka",
    period: "c. 16th Century CE",
    style: "Chalukyan & Solanki Classical Temple Architecture",
    coordinates: { lat: 22.2376, lng: 68.9678 },
    mapPosition: { x: 12, y: 56 },
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Dwarkadhish_temple.JPG",
    fieldPhotos: ["https://upload.wikimedia.org/wikipedia/commons/8/8b/Dwarkadhish_temple.JPG"],
    inscriptionImage: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Dwarkadhish_temple.JPG",
    inscriptionBoxes: [
      { id: "dw1", top: 38, left: 16, width: 68, height: 22, script: "श्री जगत् मन्दिरे द्वारिकाधीशाय नमः", transliteration: "Shri Jagat Mandire Dwarikadhishaya Namah", translation: "Obeisance to Lord Krishna in Jagat Mandir, sanctuary of maritime pilgrims", confidence: 98.7 }
    ],
    shortDesc: "The holy 5-storey Jagat Mandir dedicated to Lord Krishna, supported on 72 sculpted pillars with a 78-metre golden spire.",
    fullHistory: "Believed to have been originally established over Hari Griha by Vajranabha. Marine archaeological excavations off the coast have uncovered submerged stone structures of ancient Dwarka.",
    architectureDetails: "A five-storey limestone structure supported by 72 exquisitely carved pillars. The central spire rises to 78 metres, topped by a 52-yard sacred flag (Dhvajaji) fluttering above the Gomti creek.",
    folkloreStory: "The 52-yard flag represents the 52 administrative gates of Lord Krishna's golden island capital of Dwarka before it was engulfed by the ocean.",
    significance: "One of the sacred Char Dham pilgrimage destinations in Hinduism.",
    audioText: {
      en: "Dwarkadhish Temple in Dwarka is a 5-storey holy shrine of Lord Krishna. Supported by 72 intricately sculpted pillars with a 78-meter spire, it is one of the four revered Char Dham pilgrimage sites.",
      hi: "द्वारका का द्वारकाधीश मंदिर (जगत मंदिर) भगवान कृष्ण को समर्पित पांच मंजिला पावन धाम है। 72 नक्काशीदार खंभों पर टिका यह मंदिर चार धामों में से एक अत्यंत पवित्र तीर्थस्थल है।",
      gu: "દેવભૂમિ દ્વારકામાં આવેલું જગત મંદિર ભગવાન શ્રીકૃષ્ણનું પરમ પવિત્ર ધામ છે. ૭૨ કલાત્મક સ્તંભો પર ઊભેલું પાંચ માળનું આ ભવ્ય મંદિર ભારતના ચાર ધામોમાંનું એક અતિ પવિત્ર યાત્રાધામ છે."
    }
  },
  {
    id: "laxmi_vilas_palace",
    name: "Laxmi Vilas Palace",
    nameGujarati: "લક્ષ્મી વિલાસ મહેલ",
    category: "Forts & Palaces",
    city: "Vadodara",
    district: "Vadodara",
    period: "1890 CE",
    style: "Indo-Saracenic Revival Architecture",
    coordinates: { lat: 22.2860, lng: 73.1930 },
    mapPosition: { x: 60, y: 58 },
    image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Laxmi_vilas_palace%2C_Vadodara_02.jpg",
    fieldPhotos: ["https://upload.wikimedia.org/wikipedia/commons/7/75/Laxmi_vilas_palace%2C_Vadodara_02.jpg"],
    inscriptionImage: "https://upload.wikimedia.org/wikipedia/commons/7/75/Laxmi_vilas_palace%2C_Vadodara_02.jpg",
    inscriptionBoxes: [
      { id: "l1", top: 42, left: 15, width: 70, height: 20, script: "श्रीमंत सयाजीराव गायकवाड महाराज तिसरे १८९०", transliteration: "Shrimant Sayajirao Gaekwad Maharaj Tisre 1890", translation: "Erected under the reign of Maharaja Sayajirao Gaekwad III of Baroda in 1890", confidence: 99.2 }
    ],
    shortDesc: "A grand royal palace four times the size of Buckingham Palace, boasting Italian mosaics, stained glass, and a 300-ft clock tower.",
    fullHistory: "Commissioned by Maharaja Sayajirao Gaekwad III in 1890, designed by British architect Major Charles Mant and completed by Robert Chisholm. Built at a cost of £180,000 as the official residence of the royal Gaekwads.",
    architectureDetails: "Four times the size of Buckingham Palace, constructed using golden Agra sandstone, Rajasthani red stone, and Italian marble. The Durbar Hall features Venetian mosaic floors and stained-glass windows.",
    folkloreStory: "Architect Charles Mant feared his calculations would cause the clock tower to collapse; he tragically died before learning his building was completely stable.",
    significance: "One of the grandest private royal residences in the world, combining Rajput, Mughal, and Venetian Renaissance craft.",
    audioText: {
      en: "Laxmi Vilas Palace in Vadodara was built in 1890 by Maharaja Sayajirao Gaekwad III. Four times larger than Buckingham Palace, it features Indo-Saracenic arches, Venetian mosaics, and Belgian stained glass.",
      hi: "वडोदरा का लक्ष्मी विलास पैलेस 1890 में महाराजा सयाजीराव गायकवाड़ तृतीय द्वारा बनवाया गया था। यह बकिंघम पैलेस से चार गुना बड़ा है और इंडो-सारसेनिक शैली, इतालवी मोज़ेक और भव्य दरबार हॉल के लिए विख्यात है।",
      gu: "વડોદરાનો લક્ષ્મી વિલાસ મહેલ ૧૮૯૦માં મહારાજા સયાજીરાવ ગાયકવાડ ત્રીજા દ્વારા બનાવવામાં આવ્યો હતો. બકિંગહામ પેલેસ કરતાં ચાર ગણો મોટો આ મહેલ ઇન્ડો-સારાસેનિક શૈલી, બેલ્જિયન કાચ અને ભવ્ય દરબાર હોલ માટે વિશ્વપ્રસિદ્ધ છે."
    }
  },
  {
    id: "champaner_pavagadh",
    name: "Champaner-Pavagadh Jami Masjid",
    nameGujarati: "ચાંપાનેર જામા મસ્જિદ",
    category: "Archaeological Sites",
    city: "Champaner",
    district: "Panchmahal",
    period: "1513 CE",
    style: "Gujarat Sultanate Classical Architecture",
    coordinates: { lat: 22.4833, lng: 73.5333 },
    mapPosition: { x: 68, y: 54 },
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Jami_Masjid%2C_Champaner-001.jpg",
    fieldPhotos: ["https://upload.wikimedia.org/wikipedia/commons/b/b3/Jami_Masjid%2C_Champaner-001.jpg"],
    inscriptionImage: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Jami_Masjid%2C_Champaner-001.jpg",
    inscriptionBoxes: [
      { id: "c1", top: 32, left: 15, width: 70, height: 22, script: "السلطان محمود شاه بن محمد شاه سلطان كجرات سنة ٩૧૪", transliteration: "Al-Sultan Mahmud Shah bin Muhammad Shah Sultan Gujarat 914H", translation: "Sultan Mahmud Shah Begada, ruler of Gujarat, completed this grand mosque in 1513 CE", confidence: 97.5 }
    ],
    shortDesc: "A UNESCO medieval masterpiece known for its 172 sculpted pillars, towering 30-metre minarets, and filigreed stone jalis.",
    fullHistory: "Founded as the capital of Sultan Mahmud Begada in the late 15th century atop ancient Chavda and Khichi Chauhan Rajput foundations on Pavagadh hill. An unexcavated complete medieval city.",
    architectureDetails: "Contains over 114 documented monuments including fortifications, palace gateways, pavilions, and the majestic Jami Masjid known for its towering minarets, central dome, and finely filigreed stone jalis.",
    folkloreStory: "Named after Champa, a valiant Bhil general or Jain minister who originally established settlements at the base of Pavagadh hill.",
    significance: "Gujarat's first UNESCO World Heritage Site (2004), preserving an intact pre-Mughal Islamic city.",
    audioText: {
      en: "Champaner Jami Masjid is a UNESCO World Heritage marvel built in 1513 CE. Famous for its 30-meter minarets, central dome, and intricate stone jali work blending Hindu and Islamic craft.",
      hi: "चांपानेर की जामी मस्जिद 1513 ईस्वी में सुल्तान महमूद बेगड़ा द्वारा निर्मित यूनेस्को विश्व धरोहर है। यह 30 मीटर ऊंचे मीनारों और जालीदार नक्काशी के लिए प्रसिद्ध है।",
      gu: "ચાંપાનેરની ઐતિહાસિક જામા મસ્જિદ ૧૫૧૩માં સુલતાન મહમૂદ બેગડાએ બંધાવી હતી. ૩૦ મીટર ઊંચા મિનારા અને કલાત્મક જાળીકામ ભારતીય-ઇસ્લામિક સ્થાપત્યનો સર્વોત્તમ નમૂનો છે."
    }
  },
  {
    id: "uparkot_fort",
    name: "Uparkot Fort & Adi Kadi Vav",
    nameGujarati: "ઉપરકોટ કિલ્લો અને અડી-કડી વાવ",
    category: "Forts & Palaces",
    city: "Junagadh",
    district: "Junagadh",
    period: "c. 319 BCE (Mauryan origin)",
    style: "Rock-cut Mauryan Fortification & Monolithic Stepwell",
    coordinates: { lat: 21.5244, lng: 70.4705 },
    mapPosition: { x: 34, y: 72 },
    image: "https://upload.wikimedia.org/wikipedia/commons/d/df/Adi_Kadi_Vav_Uparkot_Fort_Junagadh.jpg",
    fieldPhotos: ["https://upload.wikimedia.org/wikipedia/commons/d/df/Adi_Kadi_Vav_Uparkot_Fort_Junagadh.jpg"],
    inscriptionImage: "https://upload.wikimedia.org/wikipedia/commons/d/df/Adi_Kadi_Vav_Uparkot_Fort_Junagadh.jpg",
    inscriptionBoxes: [
      { id: "u1", top: 36, left: 18, width: 64, height: 22, script: "देवानांपिय पियदसि राजा... गिरनार ब्राह्मी शिलालेख", transliteration: "Devanampiya Piyadasi Raja Girnar Edict", translation: "Beloved of the Gods, King Ashoka proclaims welfare and non-violence across Saurashtra", confidence: 98.9 }
    ],
    shortDesc: "A 2300-year-old citadel featuring 20-metre ramparts, 2nd-century Buddhist rock-cut caves, and the monolithic Adi Kadi Vav.",
    fullHistory: "Originally founded by Chandragupta Maurya in 319 BCE and rebuilt during the Gupta and Chudasama Rajput dynasties. Famously survived an epic 12-year siege by Siddharaj Jaisinh.",
    architectureDetails: "Constructed with massive stone curtain walls up to 20 meters high, surrounded by a 15-meter deep dry moat. Features the 2nd-century CE rock-cut Buddhist cave complex with ornate Greco-Scythian carved pillars.",
    folkloreStory: "A famous Gujarati proverb states: 'અડી કડી વાવ ને નવઘણ કૂવો, જે ન જુએ તે જીવતો મૂઓ' (He who has not seen Adi Kadi Vav and Navghan Kuwo is like a living dead).",
    significance: "One of the oldest continuously fortified military and spiritual citadels in Gujarat.",
    audioText: {
      en: "Uparkot Fort in Junagadh is an ancient 2300-year-old citadel established during the Mauryan period. Famous for its 20-meter walls, subterranean rock-cut Buddhist caves, and the monolithic Adi Kadi Vav.",
      hi: "जूनागढ़ का ऊपरकोट किला 2300 वर्ष पुराना मौर्यकालीन दुर्ग है। गिरनार पर्वत की तलहटी में स्थित यह किला 20 मीटर ऊंची प्राचीरों, प्राचीन बौद्ध गुफाओं और चट्टान काटकर बनाई गई अड़ी-कड़ी वाव के लिए विख्यात है।",
      gu: "જૂનાગઢનો ઉપરકોટ કિલ્લો ૨૩૦૦ વર્ષ જૂનો મૌર્યકાલીન કિલ્લો છે. ૨૦ મીટર ઊંચી દીવાલો, ખડક કોતરીને બનાવેલી પ્રાચીન બૌદ્ધ ગુફાઓ અને અડી-કડી વાવ માટે આ ઐતિહાસિક કિલ્લો જાણીતો છે."
    }
  },
  {
    id: "ahmedabad_historic_city",
    name: "Ahmedabad Historic City & Sidi Saiyyed",
    nameGujarati: "અમદાવાદ શહેર અને સીદી સૈયદ જાળી",
    category: "Historical Places",
    city: "Ahmedabad",
    district: "Ahmedabad",
    period: "1411 CE & 1573 CE",
    style: "Traditional Pol Haveli & Filigree Stone Jali",
    coordinates: { lat: 23.0225, lng: 72.5714 },
    mapPosition: { x: 52, y: 48 },
    image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Jali_at_Sidi_Saiyyed_Mosque_02.jpg",
    fieldPhotos: ["https://upload.wikimedia.org/wikipedia/commons/9/91/Jali_at_Sidi_Saiyyed_Mosque_02.jpg"],
    inscriptionImage: "https://upload.wikimedia.org/wikipedia/commons/9/91/Jali_at_Sidi_Saiyyed_Mosque_02.jpg",
    inscriptionBoxes: [
      { id: "ah1", top: 34, left: 16, width: 68, height: 24, script: "السلطان أحمد شاه باني مدينة أحمد آباد سنة ٨૧૪", transliteration: "Al-Sultan Ahmad Shah Bani Madinat Ahmedabad 814H", translation: "Sultan Ahmed Shah, founder of the sacred metropolis of Ahmedabad in 1411 CE", confidence: 99.1 }
    ],
    shortDesc: "India's first UNESCO World Heritage City, world-renowned for its delicate Tree of Life stone lattice and historic gated pols.",
    fullHistory: "Founded in 1411 CE by Sultan Ahmed Shah on the eastern banks of the Sabarmati river. In 1573, Sidi Saiyyed carved the celebrated ten semi-circular arch screens depicting intertwined palm boughs and the kalpataru tree.",
    architectureDetails: "Characterized by densely packed 'Pols'—gated residential micro-clusters with self-contained rainwater harvesting, internal chowks, and ornate timber-framed facades.",
    folkloreStory: "Folklore states that Sultan Ahmed Shah was inspired to build Ahmedabad when he saw a small rabbit boldly chasing away a royal hound on the banks of the Sabarmati river.",
    significance: "India's first UNESCO World Heritage City (2017), celebrated for living community heritage.",
    audioText: {
      en: "Ahmedabad, India's first UNESCO World Heritage City, is world-famous for its historic gated pols, carved wooden havelis, and the iconic Tree of Life stone lattice at Sidi Saiyyed Mosque.",
      hi: "भारत का पहला यूनेस्को विश्व धरोहर शहर, अहमदाबाद 1411 ईस्वी में सुल्तान अहमद शाह द्वारा बसाया गया था। इसकी ऐतिहासिक पोलें, लकड़ी की नक्काशीदार हवेलियां और सीदी सैय्यद की जाली विश्व प्रसिद्ध हैं।",
      gu: "ભારતનું પ્રથમ યુનેસ્કો વર્લ્ડ હેરિટેજ સિટી અમદાવાદ ૧૪૧૧માં વસાવવામાં આવ્યું હતું. તેની ઐતિહાસિક પોળો અને સીદી સૈયદની કલાત્મક વૃક્ષ જાળી સમગ્ર વિશ્વમાં વિખ્યાત છે."
    }
  }
];

export default function Home() {
  const [monuments, setMonuments] = useState<Monument[]>(MONUMENTS_DATA);
  const [selectedMonument, setSelectedMonument] = useState<Monument>(MONUMENTS_DATA[0]);
  const [activePage, setActivePage] = useState<"home" | "explore" | "categories" | "3d_twins" | "ocr_workbench" | "geospatial_map" | "ingest" | "about" | "detail">("home");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [floatingAiOpen, setFloatingAiOpen] = useState(false);
  
  const [threeDMode, setThreeDMode] = useState<"twin" | "source_photos">("twin");

  const [audioLang, setAudioLang] = useState<"gu" | "hi" | "en">("gu");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // AI Assistant States (Speech Recognition Input & Speech Synthesis Output)
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState<AIResponseData | null>(null);
  const [aiLang, setAiLang] = useState<"gu" | "hi" | "en">("gu");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);

  // OCR Workbench Selected Bounding Box on Image
  const [selectedBox, setSelectedBox] = useState<InscriptionBox | null>(null);
  const [ocrScanningEffect, setOcrScanningEffect] = useState(true);

  // Geospatial Expedition Route Player State
  const [expeditionActive, setExpeditionActive] = useState(false);
  const [expeditionStep, setExpeditionStep] = useState(0);

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

  useEffect(() => {
    if (selectedMonument.inscriptionBoxes && selectedMonument.inscriptionBoxes.length > 0) {
      setSelectedBox(selectedMonument.inscriptionBoxes[0]);
    } else {
      setSelectedBox(null);
    }
  }, [selectedMonument]);

  const navigateToPage = (page: typeof activePage, categoryFilter?: string) => {
    setActivePage(page);
    setDrawerOpen(false);
    if (categoryFilter) setActiveCategory(categoryFilter);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openMonumentDetail = (monument: Monument) => {
    setSelectedMonument(monument);
    setActivePage("detail");
    setChatResponse(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const open3DSubpage = (monument?: Monument) => {
    if (monument) setSelectedMonument(monument);
    setActivePage("3d_twins");
    setThreeDMode("twin");
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openOCRWorkbench = (monument?: Monument) => {
    if (monument) setSelectedMonument(monument);
    setActivePage("ocr_workbench");
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const speakText = (text: string, lang: "gu" | "hi" | "en", onComplete?: () => void) => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-Speech not supported in your browser.");
      return;
    }
    window.speechSynthesis.cancel();

    const voices = window.speechSynthesis.getVoices();
    const gujVoice = voices.find(v => v.lang.startsWith("gu"));
    const hindiVoice = voices.find(v => v.lang.startsWith("hi") || v.lang.includes("IN") || v.name.toLowerCase().includes("india"));
    const engVoice = voices.find(v => v.lang.startsWith("en"));

    let targetVoice: SpeechSynthesisVoice | undefined = undefined;
    let langCode = "gu-IN";

    if (lang === "gu") {
      targetVoice = gujVoice || hindiVoice;
      langCode = gujVoice ? "gu-IN" : "hi-IN";
    } else if (lang === "hi") {
      targetVoice = hindiVoice;
      langCode = "hi-IN";
    } else {
      targetVoice = engVoice;
      langCode = "en-IN";
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    if (targetVoice) utterance.voice = targetVoice;
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    utterance.onend = () => { if (onComplete) onComplete(); };
    utterance.onerror = () => { if (onComplete) onComplete(); };

    window.speechSynthesis.speak(utterance);
  };

  const playAudioGuide = (monument: Monument, lang: "gu" | "hi" | "en") => {
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }
    setIsPlayingAudio(true);
    speakText(monument.audioText[lang], lang, () => setIsPlayingAudio(false));
  };

  const playAiResponse = (lang: "gu" | "hi" | "en") => {
    if (!chatResponse) return;
    if (isAiSpeaking) {
      window.speechSynthesis.cancel();
      setIsAiSpeaking(false);
      return;
    }
    setIsAiSpeaking(true);
    speakText(chatResponse[lang], lang, () => setIsAiSpeaking(false));
  };

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    if (isListeningMic) {
      setIsListeningMic(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = aiLang === "gu" ? "gu-IN" : aiLang === "hi" ? "hi-IN" : "en-IN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListeningMic(true);
      };

      recognition.onresult = (event: any) => {
        const spokenText = event.results[0][0].transcript;
        setChatInput(spokenText);
        setIsListeningMic(false);
        handleAIPrompt(spokenText);
      };

      recognition.onerror = () => {
        setIsListeningMic(false);
      };

      recognition.onend = () => {
        setIsListeningMic(false);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListeningMic(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (expeditionActive && activePage === "geospatial_map") {
      timer = setTimeout(() => {
        setExpeditionStep((prev) => {
          const next = (prev + 1) % monuments.length;
          setSelectedMonument(monuments[next]);
          return next;
        });
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [expeditionActive, expeditionStep, activePage, monuments]);

  useEffect(() => {
    if (activePage !== "3d_twins" || threeDMode !== "twin" || !canvasRef.current || !selectedMonument) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x19110a);

    const width = canvas.clientWidth || 400;
    const height = canvas.clientHeight || 480;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.8, 8.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambientLight = new THREE.AmbientLight(0xf4efe3, 1.25);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xf59e0b, 2.9);
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

    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x24587a,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85
    });

    if (selectedMonument.category === "Stepwells") {
      for (let i = 0; i < 6; i++) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(7 - i * 1.05, 0.32, 7 - i * 1.05), sandstone);
        step.position.y = -2.1 + i * 0.32;
        group.add(step);
      }
      const pool = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.1, 2.0), waterMat);
      pool.position.y = -2.25;
      group.add(pool);

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
    } 
    else if (selectedMonument.category === "Temples") {
      const base = new THREE.Mesh(new THREE.BoxGeometry(6.0, 0.6, 6.0), darkBaseMat);
      base.position.y = -1.6;
      group.add(base);

      const shikhar = new THREE.Mesh(new THREE.ConeGeometry(1.6, 3.4, 8), sandstone);
      shikhar.position.set(0, 1.3, -0.8);
      group.add(shikhar);

      const amalaka = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, 0.25, 16), sandstone);
      amalaka.position.set(0, 3.0, -0.8);
      group.add(amalaka);

      const kalash = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.7, roughness: 0.3 }));
      kalash.position.set(0, 3.25, -0.8);
      group.add(kalash);

      const mandapPillars = [[-1.3, 1.0], [1.3, 1.0], [-1.3, 2.2], [1.3, 2.2], [0, 2.2]];
      mandapPillars.forEach(([x, z]) => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 1.8, 12), sandstone);
        col.position.set(x, -0.4, z);
        group.add(col);
      });
      const dome = new THREE.Mesh(new THREE.SphereGeometry(1.4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), sandstone);
      dome.position.set(0, 0.5, 1.6);
      group.add(dome);
    }
    else if (selectedMonument.category === "Archaeological Sites") {
      const rockBase = new THREE.Mesh(new THREE.BoxGeometry(6.6, 1.2, 5.5), darkBaseMat);
      rockBase.position.y = -1.2;
      group.add(rockBase);

      for (let i = 0; i < 4; i++) {
        const resStep = new THREE.Mesh(new THREE.BoxGeometry(3.5 - i * 0.7, 0.25, 3.0 - i * 0.6), sandstone);
        resStep.position.set(-1.0, -1.0 + i * 0.25, 0);
        group.add(resStep);
      }
      const water = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.1, 1.2), waterMat);
      water.position.set(-1.0, -1.15, 0);
      group.add(water);

      const bastion1 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 1.2), sandstone);
      bastion1.position.set(1.8, 0.2, -1.0);
      group.add(bastion1);
      const bastion2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 1.2), sandstone);
      bastion2.position.set(1.8, 0.2, 1.0);
      group.add(bastion2);
    }
    else if (selectedMonument.category === "Forts & Palaces") {
      const palaceBase = new THREE.Mesh(new THREE.BoxGeometry(6.4, 1.8, 3.2), sandstone);
      palaceBase.position.y = -0.7;
      group.add(palaceBase);

      const clockTower = new THREE.Mesh(new THREE.BoxGeometry(1.3, 3.8, 1.3), sandstone);
      clockTower.position.set(0, 0.7, 0.3);
      group.add(clockTower);
      const towerRoof = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.2, 4), new THREE.MeshStandardMaterial({ color: 0x963e26 }));
      towerRoof.position.set(0, 2.9, 0.3);
      group.add(towerRoof);

      [-2.4, 2.4].forEach(x => {
        const minar = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 2.8, 16), sandstone);
        minar.position.set(x, 0.2, 0.6);
        group.add(minar);
        const dome = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 16), new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.5 }));
        dome.position.set(x, 1.7, 0.6);
        group.add(dome);
      });
    }
    else {
      const gateArch = new THREE.Mesh(new THREE.BoxGeometry(4.8, 2.6, 1.2), sandstone);
      gateArch.position.y = -0.3;
      group.add(gateArch);

      const archPortal = new THREE.Mesh(new THREE.BoxGeometry(2.0, 2.0, 1.4), new THREE.MeshStandardMaterial({ color: 0x120c08 }));
      archPortal.position.set(0, -0.6, 0);
      group.add(archPortal);

      const jali = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.2), new THREE.MeshStandardMaterial({ color: 0xf59e0b, wireframe: true }));
      jali.position.set(0, 0.8, 0.62);
      group.add(jali);

      [-2.6, 2.6].forEach(x => {
        const minar = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 3.4, 12), sandstone);
        minar.position.set(x, 0.4, 0);
        group.add(minar);
      });
    }

    scene.add(group);

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
  }, [activePage, selectedMonument, wireframe, threeDMode]);

  const handleAIPrompt = (query: string) => {
    if (!selectedMonument || !query.trim()) return;
    setIsAiLoading(true);
    setChatResponse(null);

    const q = query.toLowerCase();

    setTimeout(() => {
      let responseData: AIResponseData;

      if (q.includes("who built") || q.includes("builder") || q.includes("king") || q.includes("queen") || q.includes("dynasty") || q.includes("kisne") || q.includes("banwaya") || q.includes("ruler") || q.includes("કોણે")) {
        responseData = {
          en: `🏛️ Patron & Origin: ${selectedMonument.fullHistory.split('.')[0]}. Built during ${selectedMonument.period} under regional dynastic patronage.`,
          hi: `🏛️ निर्माता एवं राजवंश: इसका निर्माण ${selectedMonument.period} के दौरान करवाया गया था। ${selectedMonument.audioText.hi.split('।')[1] || selectedMonument.name + ' का समृद्ध ऐतिहासिक महत्व है।'}`,
          gu: `🏛️ સ્થાપક અને ઇતિહાસ: આ સ્થાપત્યનું નિર્માણ ${selectedMonument.period}માં કરવામાં આવ્યું હતું. ${selectedMonument.nameGujarati} પ્રાચીન ગુજરાતના રાજવી વારસાનું ઉત્કૃષ્ટ પ્રતીક છે.`
        };
      }
      else if (q.includes("when") || q.includes("year") || q.includes("period") || q.includes("century") || q.includes("age") || q.includes("old") || q.includes("kab") || q.includes("date") || q.includes("ક્યારે")) {
        responseData = {
          en: `⏳ Chronology & Era: ${selectedMonument.name} dates back to ${selectedMonument.period}. It represents centuries of architectural evolution in ${selectedMonument.district}, Gujarat.`,
          hi: `⏳ काल एवं शताब्दी: ${selectedMonument.name} का निर्माण ${selectedMonument.period} में हुआ था। यह गुजरात के ${selectedMonument.district} जिले में स्थित प्राचीन स्थापत्य का उत्कृष्ट उदाहरण है।`,
          gu: `⏳ સમયગાળો અને સદી: ${selectedMonument.nameGujarati}નું નિર્માણ ${selectedMonument.period} દરમિયાન થયું હતું. તે ગુજરાતના ${selectedMonument.district} જિલ્લાની અપ્રતિમ ઐતિહાસિક વિરાસત છે.`
        };
      }
      else if (q.includes("where") || q.includes("location") || q.includes("city") || q.includes("district") || q.includes("kahan") || q.includes("reach") || q.includes("place") || q.includes("ક્યાં")) {
        responseData = {
          en: `📍 Geographical Location: ${selectedMonument.name} is situated in ${selectedMonument.city}, ${selectedMonument.district} district, Gujarat, India. Coordinates: ${selectedMonument.coordinates.lat.toFixed(4)}°N, ${selectedMonument.coordinates.lng.toFixed(4)}°E.`,
          hi: `📍 स्थान एवं भौगोलिक विवरण: ${selectedMonument.name} गुजरात के ${selectedMonument.district} जिले के ${selectedMonument.city} में स्थित है। अक्षांश-देशांतर: ${selectedMonument.coordinates.lat.toFixed(4)}°N, ${selectedMonument.coordinates.lng.toFixed(4)}°E.`,
          gu: `📍 સ્થળ અને નકશો: ${selectedMonument.nameGujarati} ગુજરાત રાજ્યના ${selectedMonument.district} જિલ્લાના ${selectedMonument.city}માં આવેલું છે. અક્ષાંશ-રેખાંશ: ${selectedMonument.coordinates.lat.toFixed(4)}°N, ${selectedMonument.coordinates.lng.toFixed(4)}°E.`
        };
      }
      else if (q.includes("architecture") || q.includes("style") || q.includes("design") || q.includes("stone") || q.includes("pillar") || q.includes("tier") || q.includes("stair") || q.includes("carving") || q.includes("vastu") || q.includes("શૈલી")) {
        responseData = {
          en: `🎨 Architectural Mastery: Built in ${selectedMonument.style}. ${selectedMonument.architectureDetails}`,
          hi: `🎨 स्थापत्य एवं शिल्पकला: यह स्थल ${selectedMonument.style} में निर्मित है। इसमें प्राचीन पत्थरों की बारीक नक्काशी, पारंपरिक खंभे और अद्भुत वास्तुकला देखने को मिलती है।`,
          gu: `🎨 સ્થાપત્ય અને કોતરણી: આ સ્થાપત્ય ${selectedMonument.style} શૈલીમાં બનાવવામાં આવ્યું છે. પથ્થરની અદભૂત કલાત્મક કોતરણી, સ્તંભો અને રચના વિશ્વસ્તરીય છે.`
        };
      }
      else if (q.includes("folklore") || q.includes("legend") || q.includes("story") || q.includes("kahani") || q.includes("vaarta") || q.includes("વાર્તા")) {
        responseData = {
          en: `📜 Regional Folklore: ${selectedMonument.folkloreStory}`,
          hi: `📜 लोककथा एवं जनश्रुति: ${selectedMonument.folkloreStory}`,
          gu: `📜 લોકવાયકા અને ઇતિહાસ: ${selectedMonument.folkloreStory}`
        };
      }
      else if (q.includes("why") || q.includes("important") || q.includes("significance") || q.includes("unesco") || q.includes("special") || q.includes("khas") || q.includes("famous") || q.includes("મહત્વ")) {
        responseData = {
          en: `⭐ Cultural Importance: ${selectedMonument.significance} ${selectedMonument.shortDesc}`,
          hi: `⭐ सांस्कृतिक महत्व: ${selectedMonument.significance} ${selectedMonument.shortDesc}`,
          gu: `⭐ સાંસ્કૃતિક મહત્વ: ${selectedMonument.significance} ${selectedMonument.shortDesc}`
        };
      }
      else {
        responseData = {
          en: `🏛️ Heritage Archive Insight: ${selectedMonument.name} (${selectedMonument.nameGujarati}) is documented under ${selectedMonument.category} in ${selectedMonument.city}. ${selectedMonument.shortDesc}`,
          hi: `🏛️ अभिलेखीय विवरण: ${selectedMonument.name} गुजरात के ${selectedMonument.city} में स्थित एक महत्वपूर्ण धरोहर है। ${selectedMonument.shortDesc}`,
          gu: `🏛️ દસ્તાવેજી વિગત: ${selectedMonument.nameGujarati} ગુજરાતના ${selectedMonument.city}માં આવેલું એક અતિ મહત્વનું સ્થાપત્ય છે. ${selectedMonument.shortDesc}`
        };
      }

      setChatResponse(responseData);
      setIsAiLoading(false);
    }, 350);
  };

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
        district: uploadCity,
        period: "15th Century CE",
        style: "Solanki-Vaghela Transition",
        coordinates: { lat: 23.2 + Math.random() * 0.4, lng: 72.5 + Math.random() * 0.4 },
        mapPosition: { x: 50 + Math.random() * 10, y: 50 + Math.random() * 10 },
        image: selectedFile ? URL.createObjectURL(selectedFile) : "https://upload.wikimedia.org/wikipedia/commons/c/c1/Adalaj_Stepwell_Interior.jpg",
        fieldPhotos: [selectedFile ? URL.createObjectURL(selectedFile) : "https://upload.wikimedia.org/wikipedia/commons/c/c1/Adalaj_Stepwell_Interior.jpg"],
        inscriptionImage: "https://upload.wikimedia.org/wikipedia/commons/5/52/Adalaj_stepwell_pillars.jpg",
        inscriptionBoxes: [
          { id: "new1", top: 30, left: 20, width: 60, height: 25, script: "संवत १६०२ वर्षे वैशाख वदी... (पुनरुद्धार लेखः)", transliteration: "Samvat 1602 Varshe Vaishakh Vadi", translation: "Restoration decree and irrigation endowments recorded from field rubbing", confidence: 97.4 }
        ],
        shortDesc: `Archived from field submission for ${uploadTitle}. Ingested into VirasatGraph knowledge repository.`,
        fullHistory: `Documented during the IIT Gandhinagar Explorer Fellowship expedition across ${uploadCity}, uncovering regional stone inscriptions and architectural remnants.`,
        architectureDetails: "Masonry typologies reveal multi-tiered carved sandstone lintels, underground conduits, and ornamental floral friezes.",
        folkloreStory: "Local oral folklore recounts the heroic contributions of grassroots water-guild artisans who engineered subterranean cisterns during seasonal famines.",
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
        openMonumentDetail(newSite);
      }, 900);
    }, 800);
  };

  const filteredMonuments = monuments.filter(m => {
    const matchesCat = activeCategory === "all" || m.category === activeCategory;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.style.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#2c1f15] flex flex-col antialiased selection:bg-[#f59e0b] selection:text-[#2a1b12]">
      
      {/* ----------------- CLEAN TOP NAVBAR WITH 3-LINE BUTTON ----------------- */}
      <header className="sticky top-0 z-40 bg-[#183126] text-[#fbf8f3] border-b border-[#244234] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg">
        <div 
          onClick={() => navigateToPage("home")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d99b4d] to-[#b45309] text-[#183126] flex items-center justify-center font-bold shadow-md shadow-emerald-950/40 transition group-hover:scale-105">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#fcfaf5] flex items-center gap-1.5">
              HeritageAI
              <span className="text-[10px] font-sans tracking-widest uppercase bg-[#203c30] text-[#d99b4d] border border-[#d99b4d]/40 px-2 py-0.5 rounded-full">
                IITGN
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={() => navigateToPage("explore")}
            title="Search Archives & Monuments"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#183126] border border-[#2b4c3c] text-[#d99b4d] hover:bg-[#203c30] flex items-center justify-center transition cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          <button 
            onClick={() => navigateToPage("explore")}
            className="hidden sm:flex items-center gap-2 bg-[#d99b4d] hover:bg-[#e5ad5f] text-[#183126] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition cursor-pointer"
          >
            Explore Heritage <ArrowRight className="w-4 h-4" />
          </button>

          <button 
            onClick={() => setDrawerOpen(true)}
            title="Open Menu"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#183126] border border-[#2b4c3c] text-[#d99b4d] hover:bg-[#203c30] flex items-center justify-center transition cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ----------------- SLIDE-OUT DRAWER ----------------- */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="w-80 sm:w-96 bg-[#183126] text-[#fbf8f3] h-full p-6 flex flex-col justify-between border-l border-[#244234] shadow-2xl overflow-y-auto">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#244234]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#d99b4d] text-[#183126] flex items-center justify-center font-bold">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <span className="font-serif font-bold text-xl text-[#faf8f4]">HeritageAI</span>
                </div>
                <button 
                  onClick={() => setDrawerOpen(false)} 
                  className="w-8 h-8 rounded-lg bg-[#203c30] text-[#d99b4d] hover:text-white flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Navigation Links */}
              <nav className="flex flex-col gap-1.5 font-medium text-sm">
                <button 
                  onClick={() => navigateToPage("home")}
                  className={`text-left py-2 px-3 rounded-xl flex items-center gap-3 transition ${
                    activePage === "home" ? "bg-[#203c30] text-[#d99b4d] font-bold border border-[#d99b4d]/30" : "hover:bg-[#1d382c] text-[#e4ded6]"
                  }`}
                >
                  <HomeIcon className="w-4 h-4 text-[#d99b4d]" /> Home
                </button>

                <button 
                  onClick={() => navigateToPage("explore")}
                  className={`text-left py-2 px-3 rounded-xl flex items-center gap-3 transition ${
                    activePage === "explore" ? "bg-[#203c30] text-[#d99b4d] font-bold border border-[#d99b4d]/30" : "hover:bg-[#1d382c] text-[#e4ded6]"
                  }`}
                >
                  <Layers className="w-4 h-4 text-[#d99b4d]" /> Explore Heritage
                </button>

                <button 
                  onClick={() => navigateToPage("categories")}
                  className={`text-left py-2 px-3 rounded-xl flex items-center gap-3 transition ${
                    activePage === "categories" ? "bg-[#203c30] text-[#d99b4d] font-bold border border-[#d99b4d]/30" : "hover:bg-[#1d382c] text-[#e4ded6]"
                  }`}
                >
                  <Grid className="w-4 h-4 text-[#d99b4d]" /> Categories
                </button>

                <button 
                  onClick={() => navigateToPage("ocr_workbench")}
                  className={`text-left py-2 px-3 rounded-xl flex items-center justify-between transition ${
                    activePage === "ocr_workbench" ? "bg-[#203c30] text-[#d99b4d] font-bold border border-[#d99b4d]/30" : "hover:bg-[#1d382c] text-[#e4ded6]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <ScanLine className="w-4 h-4 text-[#d99b4d]" /> Vision OCR (On Stone Image)
                  </span>
                  <span className="text-[9px] bg-[#d99b4d] text-[#183126] font-bold px-1.5 py-0.5 rounded">NEW</span>
                </button>

                <button 
                  onClick={() => open3DSubpage()}
                  className={`text-left py-2 px-3 rounded-xl flex items-center justify-between transition ${
                    activePage === "3d_twins" ? "bg-[#203c30] text-[#d99b4d] font-bold border border-[#d99b4d]/30" : "hover:bg-[#1d382c] text-[#e4ded6]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Box className="w-4 h-4 text-[#d99b4d]" /> 3D Digital Twins
                  </span>
                  <span className="text-[9px] bg-[#2a4d3c] text-[#9fc7ae] px-1.5 py-0.5 rounded font-mono">3D</span>
                </button>

                <button 
                  onClick={() => navigateToPage("geospatial_map")}
                  className={`text-left py-2 px-3 rounded-xl flex items-center justify-between transition ${
                    activePage === "geospatial_map" ? "bg-[#203c30] text-[#d99b4d] font-bold border border-[#d99b4d]/30" : "hover:bg-[#1d382c] text-[#e4ded6]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Compass className="w-4 h-4 text-[#d99b4d]" /> Geospatial Corridor Map
                  </span>
                  <span className="text-[9px] bg-[#2a4d3c] text-[#9fc7ae] px-1.5 py-0.5 rounded font-mono">MAP</span>
                </button>

                <button 
                  onClick={() => navigateToPage("about")}
                  className={`text-left py-2 px-3 rounded-xl flex items-center gap-3 transition ${
                    activePage === "about" ? "bg-[#203c30] text-[#d99b4d] font-bold border border-[#d99b4d]/30" : "hover:bg-[#1d382c] text-[#e4ded6]"
                  }`}
                >
                  <Info className="w-4 h-4 text-[#d99b4d]" /> About
                </button>
              </nav>

              {/* Amber CTA Button matching screenshot */}
              <button
                onClick={() => navigateToPage("explore")}
                className="w-full bg-[#d99b4d] hover:bg-[#e5ad5f] text-[#183126] font-bold text-xs sm:text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 shadow transition cursor-pointer"
              >
                Explore Heritage <ArrowRight className="w-4 h-4" />
              </button>

              {/* Architectural Categories List (Matching Video Drawer) */}
              <div className="pt-3 border-t border-[#244234] flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-[#d99b4d] uppercase tracking-wider">
                  CATEGORIES
                </span>
                {["Stepwells", "Temples", "Forts & Palaces", "Archaeological Sites", "Historical Places"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      navigateToPage("explore", cat);
                    }}
                    className="text-left text-xs py-1 text-[#cbdcd1] hover:text-[#d99b4d] transition"
                  >
                    • {cat}
                  </button>
                ))}
              </div>

              {/* Regions List (Matching Video Drawer) */}
              <div className="pt-3 border-t border-[#244234] flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-[#d99b4d] uppercase tracking-wider">
                  REGIONS
                </span>
                {["Ahmedabad", "Patan", "Vadodara", "Modhera", "Champaner", "Dwarka", "Kutch"].map((reg) => (
                  <button
                    key={reg}
                    onClick={() => {
                      setSearchQuery(reg);
                      navigateToPage("explore");
                    }}
                    className="text-left text-xs py-1 text-[#cbdcd1] hover:text-[#d99b4d] transition"
                  >
                    • {reg}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#244234] flex flex-col gap-1 text-xs">
              <span className="text-[#a3b8ac]">Blithchron '27 · Track 2 (HC26-CULT01)</span>
              <span className="text-[#d99b4d] font-mono text-[11px]">IIT Gandhinagar · HeritageAI</span>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SUBPAGE 1: HOME ===================== */}
      {activePage === "home" && (
        <main className="animate-fadeIn flex-1">
          <section className="relative min-h-[540px] flex items-center justify-center text-center px-4 sm:px-8 py-20 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
              style={{
                backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/4/4e/Rani_Ki_Vav%2C_Above_View.JPG')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#183126]/90 via-[#1c382c]/82 to-[#183126]/95" />

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#d99b4d] uppercase mb-4 drop-shadow">
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
                  onClick={() => navigateToPage("explore")}
                  className="w-full sm:w-auto bg-[#d99b4d] hover:bg-[#e5ad5f] text-[#183126] font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition cursor-pointer"
                >
                  Explore Heritage <ArrowRight className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => navigateToPage("ocr_workbench")}
                  className="w-full sm:w-auto bg-[#183126]/80 hover:bg-[#203c30] text-[#faf8f4] border border-[#d99b4d]/40 font-medium text-sm sm:text-base px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 backdrop-blur-sm transition cursor-pointer"
                >
                  Discover Our Archive
                </button>
              </div>
            </div>
          </section>

          {/* 3 Core Hackathon Pillars Showcase */}
          <section className="max-w-6xl mx-auto px-4 sm:px-8 -mt-10 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                onClick={() => open3DSubpage()}
                className="bg-white p-5 rounded-2xl border border-[#e8dfd5] shadow-lg hover:shadow-xl transition cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#eaf1ec] text-[#3d5947] flex items-center justify-center mb-3 group-hover:bg-[#f59e0b] group-hover:text-[#24170f] transition">
                  <Box className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#2e1f14]">Pathway 1: Computer Vision & 3D Twins</h3>
                <p className="text-xs text-[#5f7366] mt-1.5 leading-relaxed">Client-side Three.js reconstruction generating 360° digital twins of subterranean stepwells and temples.</p>
                <span className="text-xs font-bold text-[#b45309] mt-3 inline-flex items-center gap-1">Launch 3D Models <ArrowRight className="w-3 h-3" /></span>
              </div>

              <div 
                onClick={() => openOCRWorkbench()}
                className="bg-white p-5 rounded-2xl border border-[#e8dfd5] shadow-lg hover:shadow-xl transition cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#eaf1ec] text-[#3d5947] flex items-center justify-center mb-3 group-hover:bg-[#f59e0b] group-hover:text-[#24170f] transition">
                  <ScanLine className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#2e1f14]">Pathway 2: Vision OCR (On Inscription Image)</h3>
                <p className="text-xs text-[#5f7366] mt-1.5 leading-relaxed">Interactive glowing bounding boxes directly projected on historical stone plaques with live translation.</p>
                <span className="text-xs font-bold text-[#b45309] mt-3 inline-flex items-center gap-1">Open Image OCR <ArrowRight className="w-3 h-3" /></span>
              </div>

              <div 
                onClick={() => navigateToPage("geospatial_map")}
                className="bg-white p-5 rounded-2xl border border-[#e8dfd5] shadow-lg hover:shadow-xl transition cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#eaf1ec] text-[#3d5947] flex items-center justify-center mb-3 group-hover:bg-[#f59e0b] group-hover:text-[#24170f] transition">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#2e1f14]">Pathway 3: Geospatial Trajectory Map</h3>
                <p className="text-xs text-[#5f7366] mt-1.5 leading-relaxed">Interactive Gujarat corridor plotting student travel routes, EXIF telemetry, and regional folklore stories.</p>
                <span className="text-xs font-bold text-[#b45309] mt-3 inline-flex items-center gap-1">View Interactive Map <ArrowRight className="w-3 h-3" /></span>
              </div>
            </div>
          </section>

          {/* Featured Highlights */}
          <section className="max-w-6xl mx-auto px-4 sm:px-8 py-14">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2e1f14]">Iconic Cultural Heritage</h2>
                <p className="text-xs sm:text-sm text-[#5e7366] mt-0.5">Explore grassroots records from the IIT Gandhinagar Explorer Fellowship.</p>
              </div>
              <button 
                onClick={() => navigateToPage("explore")}
                className="text-xs sm:text-sm font-bold text-[#b45309] hover:underline flex items-center gap-1"
              >
                View Complete Catalog ({monuments.length}) <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {monuments.slice(0, 3).map(m => (
                <div key={m.id} className="bg-white rounded-2xl border border-[#e6ded4] overflow-hidden shadow-sm hover:shadow-md transition">
                  <div className="h-48 relative overflow-hidden">
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                    <span className="absolute top-2.5 left-2.5 bg-[#24170f]/90 text-[#fbbf24] text-[10px] font-bold px-2.5 py-1 rounded-md">
                      {m.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif font-bold text-lg text-[#2e1f14]">{m.name}</h3>
                    <span className="text-[11px] text-[#647c6e] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" /> {m.city}, {m.district}
                    </span>
                    <p className="text-xs text-[#526458] mt-2.5 line-clamp-2 leading-relaxed">{m.shortDesc}</p>
                    <button 
                      onClick={() => openMonumentDetail(m)}
                      className="mt-4 text-xs font-bold text-[#b45309] flex items-center gap-1 hover:text-[#d97706]"
                    >
                      View Details & Audio <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* ===================== SUBPAGE 2: VISION OCR ON STONE IMAGE (PATHWAY 2) ===================== */}
      {activePage === "ocr_workbench" && (
        <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 animate-fadeIn flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#b45309] bg-[#eaf0eb] px-2.5 py-1 rounded">
                PATHWAY 2: VISION TRANSFORMER OCR (ON IMAGE)
              </span>
              <h1 className="text-3xl font-serif font-bold text-[#2e1f14] mt-2 flex items-center gap-2">
                <ScanLine className="w-6 h-6 text-[#f59e0b]" /> Image-Level Epigraphy OCR Workbench
              </h1>
              <p className="text-xs text-[#5f7366] mt-0.5">
                Tap on any bounding box directly on the historical stone image to view live transcription, transliteration, and translation.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setOcrScanningEffect(!ocrScanningEffect)}
                className={`text-xs px-3 py-2 rounded-xl border font-bold transition flex items-center gap-1.5 ${
                  ocrScanningEffect 
                    ? "bg-[#281a10] text-[#fbbf24] border-[#442e1d]" 
                    : "bg-white text-[#5c4a3b] border-[#d6cec4]"
                }`}
              >
                <ScanLine className="w-3.5 h-3.5 text-[#f59e0b]" />
                {ocrScanningEffect ? "Laser Scan ON" : "Laser Scan OFF"}
              </button>

              <select
                value={selectedMonument.id}
                onChange={(e) => {
                  const found = monuments.find(m => m.id === e.target.value);
                  if (found) setSelectedMonument(found);
                }}
                className="bg-white border border-[#d6cec4] text-xs font-semibold text-[#2e1f14] rounded-xl px-3.5 py-2 shadow-sm focus:outline-none focus:border-[#f59e0b]"
              >
                {monuments.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.city})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Interactive Stone Inscription Image with Bounding Boxes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 7 Columns: Inscription Image with Projected Bounding Boxes */}
            <div className="lg:col-span-7 bg-[#18110b] rounded-3xl p-5 border border-[#38271a] shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-[#faf8f4] mb-3">
                  <span className="font-bold flex items-center gap-1.5 text-[#fbbf24]">
                    <ImageIcon className="w-4 h-4" /> Stone Inscription Photo · {selectedMonument.name}
                  </span>
                  <span className="text-[10px] font-mono bg-[#281a10] text-[#fbbf24] px-2.5 py-1 rounded-md border border-[#442e1d]">
                    {selectedMonument.inscriptionBoxes.length} Bounding Boxes Detected
                  </span>
                </div>

                {/* THE IMAGE CONTAINER WITH DIRECT INTERACTIVE BOUNDING BOXES */}
                <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-[#38271a] bg-[#120c08] select-none">
                  <img
                    src={selectedMonument.inscriptionImage}
                    alt="Stone Inscription Rubbing"
                    className="w-full h-full object-cover"
                  />

                  {/* Laser Scanning Line Animation */}
                  {ocrScanningEffect && (
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_14px_#f59e0b] animate-bounce top-1/2 pointer-events-none" />
                  )}

                  {/* INTERACTIVE OCR BOUNDING BOXES DRAWN OVER THE STONE IMAGE */}
                  {selectedMonument.inscriptionBoxes.map((box, index) => {
                    const isBoxActive = selectedBox?.id === box.id;
                    return (
                      <div
                        key={box.id}
                        onClick={() => setSelectedBox(box)}
                        style={{
                          top: `${box.top}%`,
                          left: `${box.left}%`,
                          width: `${box.width}%`,
                          height: `${box.height}%`
                        }}
                        className={`absolute border-2 rounded cursor-pointer transition transform duration-200 flex items-start justify-between p-1.5 ${
                          isBoxActive
                            ? "border-emerald-400 bg-emerald-500/25 shadow-[0_0_15px_#34d399] scale-[1.02] z-30"
                            : "border-amber-400/80 bg-amber-500/15 hover:border-amber-300 hover:bg-amber-500/30 z-20"
                        }`}
                      >
                        <span className="bg-black/85 text-emerald-300 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-emerald-500/40 shadow">
                          Line {index + 1}: {box.confidence}%
                        </span>

                        <span className="text-[10px] bg-[#f59e0b] text-[#24170f] font-bold px-1.5 py-0.2 rounded shadow hidden sm:inline">
                          Tap to Translate
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#2d1e13] flex items-center justify-between text-xs text-[#ded7cc]">
                <span>Tap any glowing box on the stone to inspect</span>
                <span className="font-mono text-emerald-400">TrOCR Vision Engine v2.4</span>
              </div>
            </div>

            {/* Right 5 Columns: Inspection Card of Selected Bounding Box on Image */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#e8dfd5] shadow-xl flex flex-col justify-between">
              {selectedBox ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#f0ebe3]">
                    <span className="text-xs font-bold text-[#b45309] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#f59e0b]" /> Box Inspection Active
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full">
                      {selectedBox.confidence}% ViT Accuracy
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-[#5e7065] block mb-1">
                      Detected Inscription Characters on Image:
                    </span>
                    <div className="p-3.5 bg-[#fbf9f4] border border-[#e8ded0] rounded-xl font-mono text-base font-bold text-[#2e1f14]">
                      {selectedBox.script}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-[#5e7065] block mb-1">
                      Phonetic Transliteration:
                    </span>
                    <div className="p-2.5 bg-[#faf7f0] border border-[#ede5d5] rounded-xl font-mono text-xs text-[#8c6721]">
                      {selectedBox.transliteration}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-[#5e7065] block mb-1">
                      Academic English Decipherment:
                    </span>
                    <div className="p-3 bg-[#f5f8f5] border border-[#cbe2d3] rounded-xl text-xs sm:text-sm text-[#274635] leading-relaxed">
                      "{selectedBox.translation}"
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-[#8c7b6f] text-xs">
                  Tap any box on the image to view the vision transformer transcript.
                </div>
              )}

              <div className="pt-4 border-t border-[#f0ebe3] flex items-center justify-between mt-4">
                <button
                  onClick={() => openMonumentDetail(selectedMonument)}
                  className="text-xs font-bold text-[#b45309] hover:underline flex items-center gap-1"
                >
                  View Full Site Profile <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => playAudioGuide(selectedMonument, audioLang)}
                  className="bg-[#281a10] hover:bg-[#382619] text-[#fbbf24] font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Listen Audio
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ===================== SUBPAGE 3: GEOSPATIAL MAP (PATHWAY 3) ===================== */}
      {activePage === "geospatial_map" && (
        <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 animate-fadeIn flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#b45309] bg-[#eaf0eb] px-2.5 py-1 rounded">
                PATHWAY 3: GEOSPATIAL CORRIDOR
              </span>
              <h1 className="text-3xl font-serif font-bold text-[#2e1f14] mt-2">
                Fellowship Expedition Trajectory Map
              </h1>
              <p className="text-xs text-[#5f7366] mt-0.5">
                Explore dynamic travel routes, geotagged architectural anchors, and regional folklore across Gujarat.
              </p>
            </div>

            <button
              onClick={() => setExpeditionActive(!expeditionActive)}
              className={`text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition shadow-md ${
                expeditionActive
                  ? "bg-amber-600 text-white animate-pulse"
                  : "bg-[#281a10] text-[#fbbf24] hover:bg-[#382619]"
              }`}
            >
              {expeditionActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {expeditionActive ? "Pause Expedition Route" : "Auto-Play Travel Route"}
            </button>
          </div>

          <div className="bg-[#18110b] rounded-3xl p-6 border border-[#38271a] shadow-2xl relative overflow-hidden">
            <div className="relative h-[480px] sm:h-[540px] w-full bg-[#120c08] rounded-2xl border border-[#2d1e13] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

              <div className="absolute top-6 left-8 text-[11px] font-mono text-[#5c4a3b] pointer-events-none">
                GULF OF KUTCH / RANN
              </div>
              <div className="absolute bottom-8 left-12 text-[11px] font-mono text-[#5c4a3b] pointer-events-none">
                ARABIAN SEA (SAURASHTRA COAST)
              </div>
              <div className="absolute top-8 right-12 text-[11px] font-mono text-[#5c4a3b] pointer-events-none">
                MAINLAND GUJARAT (SABARMATI CORRIDOR)
              </div>

              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <polyline
                  points="26%,30% 44%,32% 46%,38% 50%,46% 52%,48% 60%,58% 68%,54% 34%,72% 30%,84% 12%,56%"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeDasharray="6,6"
                  className={expeditionActive ? "animate-pulse" : "opacity-60"}
                />
              </svg>

              {monuments.map((m) => {
                const isSelected = selectedMonument.id === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMonument(m)}
                    style={{ left: `${m.mapPosition.x}%`, top: `${m.mapPosition.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition transform hover:scale-125 ${
                      isSelected
                        ? "bg-[#f59e0b] border-white shadow-lg shadow-amber-500/60 scale-110"
                        : "bg-[#281a10] border-[#f59e0b] hover:border-white"
                    }`}>
                      <Landmark className={`w-4 h-4 ${isSelected ? "text-[#24170f]" : "text-[#fbbf24]"}`} />
                    </div>

                    <div className={`absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md text-[10px] font-bold pointer-events-none transition ${
                      isSelected
                        ? "bg-[#f59e0b] text-[#24170f] opacity-100 shadow"
                        : "bg-[#20150d]/90 text-[#faf8f4] opacity-0 group-hover:opacity-100"
                    }`}>
                      {m.name} ({m.city})
                    </div>
                  </div>
                );
              })}

              <div className="absolute bottom-4 left-4 right-4 sm:right-auto max-w-sm bg-[#20150d]/95 backdrop-blur border border-[#442e1d] p-4 rounded-2xl text-[#faf8f4] shadow-xl">
                <span className="text-[10px] font-mono text-[#fbbf24] uppercase tracking-wider block mb-1">
                  Active Heritage Anchor · Fellowship Route
                </span>
                <h4 className="font-serif font-bold text-base text-[#faf8f4]">{selectedMonument.name}</h4>
                <p className="text-xs text-[#c5b8ac] mt-1 line-clamp-2">{selectedMonument.shortDesc}</p>
                <div className="mt-2 text-[10px] font-mono text-[#8c7b6f] flex items-center justify-between">
                  <span>GPS: {selectedMonument.coordinates.lat.toFixed(4)}°N, {selectedMonument.coordinates.lng.toFixed(4)}°E</span>
                  <button 
                    onClick={() => openMonumentDetail(selectedMonument)} 
                    className="text-[#f59e0b] font-bold hover:underline"
                  >
                    Details ➔
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 p-5 bg-[#20150d] rounded-2xl border border-[#38271a] text-[#fbf8f3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#f59e0b] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Regional Folklore & Oral Tradition for {selectedMonument.name}
                </span>
                <p className="text-xs sm:text-sm text-[#ded7cc] mt-1 leading-relaxed">
                  "{selectedMonument.folkloreStory}"
                </p>
              </div>

              <button
                onClick={() => playAudioGuide(selectedMonument, audioLang)}
                className="bg-[#f59e0b] hover:bg-[#fbbf24] text-[#24170f] font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shrink-0 shadow"
              >
                <Volume2 className="w-4 h-4" /> Listen Audio
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ===================== SUBPAGE 4: 3D DIGITAL TWIN EXPLORER (PATHWAY 1) ===================== */}
      {activePage === "3d_twins" && (
        <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 animate-fadeIn flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#b45309] bg-[#eaf0eb] px-2.5 py-1 rounded">
                PATHWAY 1: COMPUTER VISION & 3D RECONSTRUCTION
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2e1f14] mt-2 flex items-center gap-2">
                <Box className="w-6 h-6 text-[#f59e0b]" /> WebGL 3D Digital Twin Viewport
              </h1>
              <p className="text-xs text-[#5f7366] mt-0.5">
                Procedural and photogrammetric WebGL reconstruction. Drag to rotate 360°, scroll to zoom depth.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="bg-[#ede8dc] p-1 rounded-xl flex items-center gap-1">
                <button
                  onClick={() => setThreeDMode("twin")}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1 ${
                    threeDMode === "twin" ? "bg-[#281a10] text-[#fbbf24] shadow" : "text-[#4d3d30]"
                  }`}
                >
                  <Box className="w-3.5 h-3.5" /> 3D Digital Twin
                </button>
                <button
                  onClick={() => setThreeDMode("source_photos")}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1 ${
                    threeDMode === "source_photos" ? "bg-[#281a10] text-[#fbbf24] shadow" : "text-[#4d3d30]"
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" /> Source 2D Photos
                </button>
              </div>

              <select 
                value={selectedMonument.id}
                onChange={(e) => {
                  const found = monuments.find(m => m.id === e.target.value);
                  if (found) setSelectedMonument(found);
                }}
                className="bg-white border border-[#d6cec4] text-xs font-semibold text-[#2e1f14] rounded-xl px-3 py-2 shadow-sm focus:outline-none focus:border-[#f59e0b]"
              >
                {monuments.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.city})</option>
                ))}
              </select>

              {threeDMode === "twin" && (
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`text-xs px-3 py-2 rounded-xl border font-mono transition flex items-center gap-1.5 shadow-sm ${
                    wireframe 
                      ? "bg-[#f59e0b] text-[#24170f] border-[#f59e0b] font-bold" 
                      : "bg-[#281a10] text-[#fbbf24] border-[#442e1d] hover:border-[#f59e0b]"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" /> {wireframe ? "Solid Mesh" : "Wireframe Mode"}
                </button>
              )}
            </div>
          </div>

          <div className="bg-[#18110b] rounded-3xl p-4 border border-[#38271a] shadow-2xl relative">
            {threeDMode === "twin" ? (
              <div className="h-[460px] sm:h-[520px] w-full rounded-2xl overflow-hidden relative border border-[#2d1e13] bg-[#120c08] flex items-center justify-center">
                <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

                <div className="absolute bottom-4 left-4 bg-[#20150d]/90 backdrop-blur border border-[#442e1d] px-4 py-2 rounded-xl text-xs text-[#ded7cc] flex items-center gap-3 pointer-events-none">
                  <Sliders className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>360° Drag / Swipe to Orbit</span>
                  <span className="text-[#523e2f]">|</span>
                  <span className="text-[#fbbf24] font-medium">{selectedMonument.style}</span>
                </div>
              </div>
            ) : (
              <div className="h-[460px] sm:h-[520px] w-full rounded-2xl p-6 overflow-y-auto border border-[#2d1e13] bg-[#120c08] text-[#faf8f4]">
                <div className="mb-4">
                  <h4 className="font-serif font-bold text-lg text-[#fbbf24]">Crowdsourced Field 2D Photographs</h4>
                  <p className="text-xs text-[#a89b8e]">Multi-angle photographic dataset collected by fellowship students, used as ground truth for 3D reconstruction.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedMonument.fieldPhotos.map((photo, i) => (
                    <div key={i} className="h-60 rounded-xl overflow-hidden border border-[#3b271a] relative">
                      <img src={photo} alt="Field Survey" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 bg-black/80 text-[#fbbf24] text-[10px] font-mono px-2 py-0.5 rounded">
                        Angle {i + 1} · EXIF Geotagged
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 p-4 bg-[#20150d] rounded-2xl border border-[#38271a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#fbf8f3]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#faf8f4]">{selectedMonument.name}</h3>
                <span className="text-xs text-[#fbbf24]">{selectedMonument.nameGujarati} · {selectedMonument.period}</span>
              </div>
              <button 
                onClick={() => openMonumentDetail(selectedMonument)}
                className="bg-[#f59e0b] hover:bg-[#fbbf24] text-[#24170f] font-bold text-xs px-4 py-2 rounded-xl transition flex items-center justify-center gap-1.5"
              >
                View Full Historical Description <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ===================== SUBPAGE 5: EXPLORE HERITAGE DIRECTORY ===================== */}
      {activePage === "explore" && (
        <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 animate-fadeIn flex-1">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#2e1f14]">Gujarat Heritage Directory</h1>
              <p className="text-xs text-[#5f7366] mt-1">Explore all documented architectural stepwells, temples, citadels, and Harappan settlements.</p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#b45309]" />
              <input 
                type="text" 
                placeholder="Filter by name, district, style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border border-[#d6cec4] rounded-xl pl-9 pr-3 py-2 text-xs text-[#2e1f14] placeholder-[#8f8276] focus:outline-none focus:border-[#f59e0b] w-full sm:w-64 shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {["all", "Stepwells", "Temples", "Forts & Palaces", "Archaeological Sites", "Historical Places"].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#382619] text-[#fbbf24] shadow"
                    : "bg-[#eaf0eb] text-[#3d5244] hover:bg-[#d8e4db]"
                }`}
              >
                {cat === "all" ? "All Monuments" : cat}
              </button>
            ))}
          </div>

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
                      {monument.city}, {monument.district}
                    </div>

                    <p className="text-xs text-[#526458] mt-3 line-clamp-3 leading-relaxed">
                      {monument.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 flex items-center justify-between border-t border-[#f4eee6]">
                  <button 
                    onClick={() => openMonumentDetail(monument)}
                    className="text-xs font-bold text-[#b45309] hover:text-[#d97706] flex items-center gap-1.5 transition"
                  >
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button 
                    onClick={() => open3DSubpage(monument)}
                    className="text-[11px] font-semibold bg-[#eaf0eb] text-[#344d3d] hover:bg-[#f59e0b] hover:text-[#24170f] px-2.5 py-1 rounded-md flex items-center gap-1 transition"
                  >
                    <Box className="w-3.5 h-3.5" /> 3D View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ===================== SUBPAGE 6: CATEGORIES ===================== */}
      {activePage === "categories" && (
        <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 animate-fadeIn flex-1">
          <h1 className="text-3xl font-serif font-bold text-[#2e1f14] mb-2">Heritage Categories</h1>
          <p className="text-xs text-[#5f7366] mb-8">Browse the rich diversity of Gujarat by architectural typology.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Stepwells (વાવ)", category: "Stepwells", count: 2, image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Rani_Ki_Vav%2C_Above_View.JPG", desc: "Subterranean multi-tiered architectural wonders for cooling, sacred reverence, and public water storage." },
              { title: "Temples (મંદિર)", category: "Temples", count: 4, image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Sun_Temple_Modhera.jpg", desc: "Classical Solanki and Maru-Gurjara shrines featuring sacred mandapas, intricate stone kalash, and celestial carvings." },
              { title: "Forts & Palaces", category: "Forts & Palaces", count: 2, image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Laxmi_vilas_palace%2C_Vadodara_02.jpg", desc: "Impregnable hilltop military citadels and royal Indo-Saracenic residences of western Indian dynasties." },
              { title: "Archaeological Sites", category: "Archaeological Sites", count: 2, image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Water_reservoir_at_Dholavira_site.jpg", desc: "Ancient Harappan Bronze Age civilisations and unexcavated medieval sultanate capital cities." },
              { title: "Historical Places", category: "Historical Places", count: 1, image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Jali_at_Sidi_Saiyyed_Mosque_02.jpg", desc: "Walled medieval trading cities, gated residential pol networks, and living heritage communities." }
            ].map(cat => (
              <div 
                key={cat.category}
                onClick={() => navigateToPage("explore", cat.category)}
                className="bg-white border border-[#e8dfd5] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 w-full relative overflow-hidden bg-stone-100">
                    <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 right-3 bg-[#f59e0b] text-[#24170f] text-xs font-bold px-2.5 py-1 rounded-md shadow">
                      {cat.count} Sites
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif font-bold text-lg text-[#2e1f14]">{cat.title}</h3>
                    <p className="text-xs text-[#5e7065] mt-1.5 leading-relaxed">{cat.desc}</p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <span className="text-xs font-bold text-[#b45309] group-hover:text-[#f59e0b] flex items-center gap-1">
                    Browse Category <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ===================== SUBPAGE 7: INGESTION LAB ===================== */}
      {activePage === "ingest" && (
        <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8 animate-fadeIn flex-1">
          <div className="bg-white border border-[#e4ded0] rounded-3xl p-6 sm:p-8 shadow-md">
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

      {/* ===================== SUBPAGE 8: ABOUT & MISSION ===================== */}
      {activePage === "about" && (
        <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8 animate-fadeIn flex-1">
          <div className="bg-[#241810] text-[#faf8f4] rounded-3xl p-6 sm:p-10 shadow-xl border border-[#442e1f] mb-8">
            <span className="text-xs font-bold tracking-widest uppercase text-[#fbbf24] bg-[#3a271a] px-3 py-1 rounded">
              IIT GANDHINAGAR INITIATIVE
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#fcfaf6] mt-4 tracking-tight">
              Preserving the Past. Inspiring the Future.
            </h1>
            <p className="text-xs sm:text-sm text-[#cbd4ce] mt-3 leading-relaxed max-w-3xl">
              At IIT Gandhinagar, the Explorer Fellowship sends students across India to document grassroots cultural, craft, and architectural traditions. VirasatGraph (HeritageAI) rescues this massive influx of on-the-ground records from the "archival graveyard" and transforms dead presentation decks into living, interactive digital twins.
            </p>

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
          </div>
        </main>
      )}

      {/* ===================== SUBPAGE 9: MONUMENT DETAIL VIEW ===================== */}
      {activePage === "detail" && selectedMonument && (
        <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 animate-fadeIn flex-1">
          <button 
            onClick={() => navigateToPage("explore")}
            className="text-xs font-bold text-[#2e1f14] hover:text-[#b45309] flex items-center gap-1.5 mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to directory
          </button>

          <div className="relative rounded-3xl overflow-hidden border border-[#d8cec2] shadow-xl mb-8 bg-[#251810]">
            <div className="h-72 sm:h-96 w-full relative">
              <img 
                src={selectedMonument.image} 
                alt={selectedMonument.name}
                className="w-full h-full object-cover opacity-75" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#20140d] via-[#20140d]/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-[#fbfaf6]">
                <div className="flex items-center gap-2 flex-wrap text-xs font-semibold mb-2">
                  <span className="bg-[#f59e0b] text-[#24170f] px-2.5 py-0.5 rounded-md font-bold">
                    {selectedMonument.category}
                  </span>
                  <span className="bg-[#1b1009]/80 text-[#ddd6ca] px-2.5 py-0.5 rounded-md flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#fbbf24]" /> {selectedMonument.city}, {selectedMonument.district}
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

            <div className="bg-[#1e130b] px-6 py-3 flex items-center justify-between border-t border-[#3a2618] flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => open3DSubpage(selectedMonument)}
                  className="bg-[#f59e0b] hover:bg-[#fbbf24] text-[#24170f] font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow"
                >
                  <Box className="w-4 h-4" /> Open 3D Digital Twin View
                </button>

                <button 
                  onClick={() => openOCRWorkbench(selectedMonument)}
                  className="bg-[#352215] hover:bg-[#47301f] text-[#fbbf24] font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 border border-[#4d3422]"
                >
                  <ScanLine className="w-4 h-4" /> Vision OCR on Stone Image
                </button>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={audioLang}
                  onChange={(e) => setAudioLang(e.target.value as "gu" | "hi" | "en")}
                  className="bg-[#2a1a0e] border border-[#442c1b] text-[#fbbf24] text-xs rounded-xl px-2.5 py-2 focus:outline-none font-semibold cursor-pointer"
                >
                  <option value="gu">🏛️ ગુજરાતી (Gujarati)</option>
                  <option value="hi">🇮🇳 हिन्दी (Hindi)</option>
                  <option value="en">🇬🇧 English</option>
                </select>

                <button 
                  onClick={() => playAudioGuide(selectedMonument, audioLang)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                    isPlayingAudio 
                      ? "bg-amber-600 text-white animate-pulse" 
                      : "bg-[#f59e0b] text-[#24170f] hover:bg-[#fbbf24]"
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  {isPlayingAudio ? "Playing..." : "Listen Audio"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#e4ded0] rounded-2xl p-6 shadow-sm">
                <h3 className="font-serif font-bold text-lg text-[#2e1f14] flex items-center gap-2 mb-3">
                  <History className="w-5 h-5 text-[#f59e0b]" /> Historical Background
                </h3>
                <p className="text-xs sm:text-sm text-[#4b6053] leading-relaxed">
                  {selectedMonument.fullHistory}
                </p>
                <div className="mt-4 pt-4 border-t border-[#f0ebe0]">
                  <span className="text-[11px] font-bold text-[#2e1f14] block mb-1">Architectural Epigraphy on Stone:</span>
                  <p className="text-xs font-mono text-[#8c6721] bg-[#fbf8f0] p-3 rounded-xl border border-[#eedfc0]">
                    {selectedMonument.inscriptionBoxes[0]?.script || "Stone inscription recorded on foundation plinth."}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-[#e4ded0] rounded-2xl p-6 shadow-sm">
                <h3 className="font-serif font-bold text-lg text-[#2e1f14] flex items-center gap-2 mb-3">
                  <Layers className="w-5 h-5 text-[#f59e0b]" /> Architectural Composition & Design
                </h3>
                <p className="text-xs sm:text-sm text-[#4b6053] leading-relaxed">
                  {selectedMonument.architectureDetails}
                </p>
                <div className="mt-4 pt-4 border-t border-[#f0ebe0]">
                  <span className="text-[11px] font-bold text-[#2e1f14] block mb-1">Cultural Significance:</span>
                  <p className="text-xs text-[#2b4d3a] bg-[#eaf0eb] p-3 rounded-xl border border-[#c4d6cb]">
                    {selectedMonument.significance}
                  </p>
                </div>
              </div>
            </div>

            {/* INTERACTIVE PROMPT CHIPS & SMART AI ASSISTANT (WITH MIC VOICE LISTENING & AUDIO OUTPUT) */}
            <div className="bg-white border border-[#e4ded0] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#f0ebe3]">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-[#f59e0b]" />
                  <h3 className="text-xs font-bold tracking-wider uppercase text-[#b45309]">
                    Heritage AI Voice & Text Assistant
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#647c6e] hidden sm:inline">Voice Mode:</span>
                  <select
                    value={aiLang}
                    onChange={(e) => setAiLang(e.target.value as "gu" | "hi" | "en")}
                    className="bg-[#faf7f0] border border-[#d6cec4] text-xs font-bold text-[#2e1f14] rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
                  >
                    <option value="gu">🏛️ ગુજરાતી (Gujarati)</option>
                    <option value="hi">🇮🇳 हिन्दी (Hindi)</option>
                    <option value="en">🇬🇧 English</option>
                  </select>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "Who built it and why?",
                  "Explain this monument in simple language.",
                  "What is special about its architecture?",
                  "Tell me the folklore legend.",
                  "Where is it located?"
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

              {/* INPUT BOX WITH MIC VOICE LISTENING BUTTON */}
              <div className="flex gap-2 items-center">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && chatInput.trim()) {
                        handleAIPrompt(chatInput);
                        setChatInput("");
                      }
                    }}
                    placeholder={
                      isListeningMic 
                        ? "🎙️ Listening... Speak your question now in Gujarati, Hindi or English!"
                        : `Ask or speak about ${selectedMonument.name}...`
                    }
                    className={`w-full bg-[#f9f8f4] border rounded-xl pl-4 pr-11 py-2.5 text-xs sm:text-sm text-[#2c1f15] focus:outline-none transition ${
                      isListeningMic 
                        ? "border-red-500 bg-red-50/50 text-red-950 animate-pulse" 
                        : "border-[#dcd6c6] focus:border-[#f59e0b]"
                    }`}
                  />
                  <button
                    onClick={startVoiceInput}
                    title="Tap to Speak (Voice Listening)"
                    className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition cursor-pointer ${
                      isListeningMic
                        ? "bg-red-600 text-white animate-bounce shadow-md shadow-red-500/50"
                        : "bg-[#f59e0b] text-[#24170f] hover:bg-[#d97706]"
                    }`}
                  >
                    {isListeningMic ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>

                <button 
                  onClick={() => {
                    if (chatInput.trim()) {
                      handleAIPrompt(chatInput);
                      setChatInput("");
                    }
                  }}
                  disabled={isAiLoading || !chatInput.trim()}
                  className="bg-[#24170f] hover:bg-[#382619] disabled:opacity-50 text-[#fbbf24] px-4 py-2.5 rounded-xl transition flex items-center justify-center cursor-pointer shrink-0"
                >
                  {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin text-[#fbbf24]" /> : <Send className="w-4 h-4" />}
                </button>
              </div>

              {isListeningMic && (
                <div className="mt-2 text-xs text-red-600 font-bold flex items-center gap-1.5 animate-pulse">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                  Microphone is active! Speak your question in Gujarati, Hindi, or English.
                </div>
              )}

              {isAiLoading && (
                <div className="mt-4 p-4 bg-[#f8f5ed] border border-[#e8dfcf] rounded-xl text-xs text-[#5e7065] flex items-center gap-2.5 animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin text-[#f59e0b]" />
                  <span>Heritage AI is querying archives and epigraph records for {selectedMonument.name}...</span>
                </div>
              )}

              {chatResponse && !isAiLoading && (
                <div className="mt-4 p-4 bg-[#f8f5ed] border border-[#e8dfcf] rounded-xl text-xs sm:text-sm text-[#2c1f15] leading-relaxed flex flex-col gap-2.5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#e4ded0] pb-2 gap-2">
                    <span className="font-bold text-[#b45309] flex items-center gap-1.5 text-xs">
                      <Sparkles className="w-4 h-4 text-[#f59e0b]" /> AI Archive Answer
                    </span>

                    <div className="flex items-center gap-2">
                      <select
                        value={aiLang}
                        onChange={(e) => setAiLang(e.target.value as "gu" | "hi" | "en")}
                        className="bg-white border border-[#d6cec4] text-xs font-semibold text-[#2e1f14] rounded-lg px-2 py-1 focus:outline-none focus:border-[#f59e0b] cursor-pointer"
                      >
                        <option value="gu">🏛️ ગુજરાતી (Gujarati)</option>
                        <option value="hi">🇮🇳 हिन्दी (Hindi)</option>
                        <option value="en">🇬🇧 English</option>
                      </select>

                      <button
                        onClick={() => playAiResponse(aiLang)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                          isAiSpeaking 
                            ? "bg-amber-600 text-white animate-pulse" 
                            : "bg-[#f59e0b] text-[#24170f] hover:bg-[#fbbf24]"
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        {isAiSpeaking ? "Speaking..." : "Listen Response"}
                      </button>
                    </div>
                  </div>

                  <div className="whitespace-pre-line text-[#3d2c20] font-sans text-xs sm:text-sm leading-relaxed">
                    {chatResponse[aiLang]}
                  </div>
                </div>
              )}
            </div>

            {/* Location & Embedded Interactive Map (Fixes preview blocking error) */}
            <div className="bg-white border border-[#e4ded0] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2e1f14] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#d99b4d]" /> Location & Telemetry
                  </h4>
                  <p className="text-xs text-[#52685a] mt-1">
                    {selectedMonument.city}, {selectedMonument.district}, Gujarat, India
                  </p>
                  <p className="text-xs font-mono text-[#8a9e92] mt-0.5">
                    Coordinates: {selectedMonument.coordinates.lat.toFixed(4)}, {selectedMonument.coordinates.lng.toFixed(4)}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      window.open(`https://maps.google.com/?q=${selectedMonument.coordinates.lat},${selectedMonument.coordinates.lng}`, '_blank', 'noopener,noreferrer');
                    }}
                    className="bg-[#183126] hover:bg-[#203c30] text-[#d99b4d] font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow transition cursor-pointer"
                  >
                    Open in Google Maps <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      window.open(`https://www.openstreetmap.org/?mlat=${selectedMonument.coordinates.lat}&mlon=${selectedMonument.coordinates.lng}#map=16/${selectedMonument.coordinates.lat}/${selectedMonument.coordinates.lng}`, '_blank', 'noopener,noreferrer');
                    }}
                    className="bg-[#f4efe4] hover:bg-[#eae3d4] text-[#2c1f15] font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 border border-[#dcd6c6] transition cursor-pointer"
                  >
                    OpenStreetMap <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Embedded Live Map View (Safe, No ERR_BLOCKED_BY_RESPONSE) */}
              <div className="w-full h-56 rounded-xl overflow-hidden border border-[#d8d0c4] shadow-inner relative bg-[#e5e0d8]">
                <iframe
                  title="Monument Location Map"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedMonument.coordinates.lng - 0.02}%2C${selectedMonument.coordinates.lat - 0.02}%2C${selectedMonument.coordinates.lng + 0.02}%2C${selectedMonument.coordinates.lat + 0.02}&layer=mapnik&marker=${selectedMonument.coordinates.lat}%2C${selectedMonument.coordinates.lng}`}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </main>
      )}

      
      {/* FLOATING AI ASSISTANT LAUNCHER (ALWAYS ACCESSIBLE FROM ANY PAGE) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {!floatingAiOpen && (
          <button
            onClick={() => setFloatingAiOpen(true)}
            className="bg-gradient-to-r from-[#d99b4d] to-[#b45309] text-[#183126] font-bold text-xs sm:text-sm px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 hover:scale-105 transition cursor-pointer border border-[#fbbf24]/50"
          >
            <Bot className="w-5 h-5 text-[#183126]" />
            <span>Ask Heritage AI</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </button>
        )}

        {floatingAiOpen && (
          <div className="w-80 sm:w-96 bg-white border border-[#dcd4c8] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fadeIn border-t-4 border-t-[#d99b4d]">
            {/* Header */}
            <div className="bg-[#183126] text-[#faf8f4] p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#d99b4d] text-[#183126] flex items-center justify-center font-bold">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-serif font-bold text-sm">Heritage AI Assistant</div>
                  <div className="text-[10px] text-[#9fc7ae]">Speech & Regional Archives</div>
                </div>
              </div>
              <button
                onClick={() => setFloatingAiOpen(false)}
                className="w-7 h-7 rounded-lg bg-[#203c30] text-[#d99b4d] hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Voice Mode Selector */}
            <div className="bg-[#f5f1e8] px-4 py-2 border-b border-[#e5dfd4] flex items-center justify-between text-xs">
              <span className="text-[#647c6e] font-semibold">Voice Language:</span>
              <select
                value={aiLang}
                onChange={(e) => setAiLang(e.target.value as "gu" | "hi" | "en")}
                className="bg-white border border-[#d6cec4] text-xs font-bold text-[#2e1f14] rounded-lg px-2 py-0.5 focus:outline-none cursor-pointer"
              >
                <option value="gu">🏛️ ગુજરાતી (Gujarati)</option>
                <option value="hi">🇮🇳 हिन्दी (Hindi)</option>
                <option value="en">🇬🇧 English</option>
              </select>
            </div>

            {/* Chat Body */}
            <div className="p-4 max-h-80 overflow-y-auto flex flex-col gap-3 text-xs">
              <div className="bg-[#f7f4ee] p-3 rounded-2xl border border-[#eae3d5] text-[#2c1f15]">
                {aiLang === "gu" && "નમસ્તે! હું વિરાસતગ્રાફ હેરિટેજ AI સહાયક છું. ગુજરાતની પ્રાચીન વાવો, મંદિરો અને ઐતિહાસિક સ્થાપત્યો વિશે પૂછો."}
                {aiLang === "hi" && "नमस्ते! मैं विरासतग्राफ़ हेरिटेज AI सहायक हूँ। गुजरात की प्राचीन बावड़ियों, मंदिरों और ऐतिहासिक धरोहरों के बारे में पूछें।"}
                {aiLang === "en" && "Hello! I am the VirasatGraph Heritage AI Assistant. Ask me anything about Gujarat's ancient stepwells, temples, or epigraphy."}
              </div>

              {/* Quick Prompts */}
              <div className="flex flex-wrap gap-1.5">
                {["Tell me about Rani ki Vav", "Who built Adalaj Stepwell?", "What is Solanki architecture?"].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleAIPrompt(chip)}
                    className="text-[11px] bg-[#f0eae0] hover:bg-[#d99b4d] hover:text-[#183126] text-[#2c1f15] px-2.5 py-1 rounded-lg border border-[#ded5c6] transition"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* AI Response Card */}
              {chatResponse && (
                <div className="bg-[#eef5f0] border border-[#bcdbc5] p-3 rounded-2xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1e4620] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#d99b4d]" /> Response ({aiLang.toUpperCase()})
                    </span>
                    <button
                      onClick={() => speakText(chatResponse[aiLang], aiLang)}
                      className="bg-[#183126] text-[#d99b4d] hover:bg-[#203c30] px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 transition cursor-pointer"
                    >
                      <Volume2 className="w-3 h-3" /> Listen
                    </button>
                  </div>
                  <p className="text-[#1a3328] leading-relaxed">
                    {chatResponse[aiLang]}
                  </p>
                </div>
              )}
            </div>

            {/* Input Bar with Mic Voice Listening */}
            <div className="p-3 bg-[#faf8f4] border-t border-[#e5dfd4] flex gap-2 items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && chatInput.trim()) {
                      handleAIPrompt(chatInput);
                      setChatInput("");
                    }
                  }}
                  placeholder={
                    isListeningMic 
                      ? "🎙️ Listening... Speak now!"
                      : "Type or tap mic to speak..."
                  }
                  className={`w-full bg-white border rounded-xl pl-3 pr-10 py-2 text-xs text-[#2c1f15] focus:outline-none transition ${
                    isListeningMic 
                      ? "border-red-500 bg-red-50/50 text-red-950 animate-pulse" 
                      : "border-[#dcd6c6] focus:border-[#d99b4d]"
                  }`}
                />
                <button
                  onClick={startVoiceInput}
                  title="Voice Listening Mic"
                  className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center transition cursor-pointer ${
                    isListeningMic
                      ? "bg-red-600 text-white animate-bounce shadow"
                      : "bg-[#d99b4d] text-[#183126] hover:bg-[#e5ad5f]"
                  }`}
                >
                  {isListeningMic ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                </button>
              </div>

              <button
                onClick={() => {
                  if (chatInput.trim()) {
                    handleAIPrompt(chatInput);
                    setChatInput("");
                  }
                }}
                disabled={isAiLoading || !chatInput.trim()}
                className="bg-[#183126] hover:bg-[#203c30] disabled:opacity-50 text-[#d99b4d] px-3 py-2 rounded-xl transition flex items-center justify-center cursor-pointer shrink-0"
              >
                {isAiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Global Footer */}
      <footer className="bg-[#20140c] text-[#faf8f4] border-t border-[#3a271a] py-8 px-4 sm:px-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8c7b6f]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#f59e0b] text-[#24170f] flex items-center justify-center font-bold">
              <Landmark className="w-3.5 h-3.5" />
            </div>
            <span className="font-serif font-bold text-sm text-[#faf8f4]">HeritageAI / VirasatGraph</span>
          </div>
          <span>IIT Gandhinagar · Explorer Fellowship Archives · Blithchron '27 Track 2 (HC26-CULT01)</span>
        </div>
      </footer>

    </div>
  );
}