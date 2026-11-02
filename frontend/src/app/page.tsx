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
  Send,
  Home as HomeIcon,
  Grid,
  Info,
  Bot,
  Loader2
} from "lucide-react";

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
    district: "Patan",
    period: "11th Century CE (c. 1063)",
    style: "Maru-Gurjara Architecture",
    coordinates: { lat: 23.8589, lng: 72.1014 },
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Rani_Ki_Vav%2C_Above_View.JPG",
    shortDesc: "An extraordinary 11th-century UNESCO World Heritage stepwell built as an inverted subterranean temple with over 500 sculpted deities.",
    fullHistory: "Commissioned by Queen Udayamati in memory of King Bhima I of the Chaulukya (Solanki) dynasty in 1063 CE. Silted over by the Saraswati river for centuries until excavated by the Archaeological Survey of India in the 1980s, revealing pristine subterranean stone galleries.",
    architectureDetails: "Constructed as an inverted temple across seven subterranean levels measuring 65m long, 20m wide, and 28m deep. Features over 500 principal sculptures and 1,000 minor religious figurines carved out of local Dhrangadhra sandstone.",
    inscriptionRecord: "Chaulukya dynastic stone tablets and memorial foundation records honoring Queen Udayamati's piety and water conservation philanthropy.",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Adalaj_Stepwell_Interior.jpg",
    shortDesc: "A remarkable five-storey stepwell known for intricate pillars, octagonal light shafts, and Solanki floral carvings.",
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
    district: "Mehsana",
    period: "1026–1027 CE",
    style: "Māru-Gurjara Temple Architecture",
    coordinates: { lat: 23.5835, lng: 72.1330 },
    image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Sun_Temple_Modhera.jpg",
    shortDesc: "A masterwork of solar temple architecture featuring a 52-pillared Sabha Mandapa and the 108-shrine Surya Kund reservoir.",
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
    id: "dholavira_harappan",
    name: "Dholavira: Harappan City",
    nameGujarati: "ધોળાવીરા: હડપ્પન નગર",
    category: "Archaeological Sites",
    city: "Khadir Bet",
    district: "Kutch",
    period: "3000 BCE – 1500 BCE (Bronze Age)",
    style: "Harappan Urban Planning & Stone Hydraulic Masonry",
    coordinates: { lat: 23.8864, lng: 70.2131 },
    image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Water_reservoir_at_Dholavira_site.jpg",
    shortDesc: "A UNESCO World Heritage Indus Valley metropolis celebrated for massive stone-cut rainwater reservoirs and ancient urban planning.",
    fullHistory: "Occupied continuously over 1,500 years across seven cultural stages. Excavated by archaeologist R.S. Bisht, revealing a sophisticated citadel, middle town, lower town, and an unprecedented cascade of 16 massive rainwater harvesting reservoirs carved directly into rock.",
    architectureDetails: "Constructed entirely of stone rather than fired brick (unique among Harappan cities). Features a world-famous 10-character Indus script signboard made of white gypsum paste in a wooden frame, and underground sewage networks.",
    inscriptionRecord: "The monumental 10-symbol Dholavira Signboard found near the northern gateway of the citadel, one of the longest surviving inscriptions of the Indus script.",
    significance: "Declared a UNESCO World Heritage Site in 2021, representing the zenith of pre-historic hydraulic engineering and civic governance in South Asia.",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Somnath_temple.JPG",
    shortDesc: "The sacred first Aadi Jyotirlinga of Lord Shiva standing on the edge of the Arabian Sea, an eternal symbol of spiritual resilience.",
    fullHistory: "Referred to in the Rigveda and Mahabharata, the temple witnessed multiple historical destructions and seven successive reconstructions, standing as an enduring symbol of cultural resilience. The current grand temple was rebuilt in 1951 led by Sardar Vallabhbhai Patel.",
    architectureDetails: "Built in the imposing Kailash Mahameru Prasad style using golden sandstone from Dhrangadhra. Features an imposing 155-foot high main spire (shikhar), a majestic Sabha Mandap, and the famous Baan Stambh (arrow pillar) indicating an unobstructed sea line directly to Antarctica.",
    inscriptionRecord: "Sanskrit inscriptions on Baan Stambh stating: 'आसमुद्रांत दक्षिण ध्रुव पर्यंत अबाधित ज्योतिर्मार्ग' confirming that not a single piece of land exists in a straight line from Somnath to the South Pole.",
    significance: "The foremost of the twelve Jyotirlingas and the ultimate testament to civilisational continuity and spiritual sanctity in western India.",
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
    period: "c. 16th Century CE (Foundations 2,200 years old)",
    style: "Chalukyan & Solanki Classical Temple Architecture",
    coordinates: { lat: 22.2376, lng: 68.9678 },
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Dwarkadhish_temple.JPG",
    shortDesc: "The holy 5-storey Jagat Mandir dedicated to Lord Krishna, supported on 72 sculpted pillars with a 78-metre golden spire.",
    fullHistory: "Believed to have been originally established by Lord Krishna's great-grandson Vajranabha over Hari Griha. Marine archaeological excavations off the coast have uncovered submerged stone structures of the ancient city of Dwarka.",
    architectureDetails: "A magnificent five-storey limestone structure supported by 72 exquisitely carved pillars. The central spire rises to 78 metres, topped by a 52-yard sacred flag (Dhvajaji) bearing sun and moon motifs that flutters majestically above the Gomti creek.",
    inscriptionRecord: "Ancient Vaishnava and Solanki copper-plate grants detailing royal endowments, pilgrims' itineraries, and maritime trade routes from Gujarat to Mesopotamia.",
    significance: "One of the sacred Char Dham pilgrimage destinations in Hinduism, drawing millions of pilgrims from across the globe.",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Laxmi_vilas_palace%2C_Vadodara_02.jpg",
    shortDesc: "A grand royal palace four times the size of Buckingham Palace, boasting Italian mosaics, stained glass, and a 300-ft clock tower.",
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
    id: "champaner_pavagadh",
    name: "Champaner-Pavagadh Jami Masjid",
    nameGujarati: "ચાંપાનેર જામા મસ્જિદ",
    category: "Archaeological Sites",
    city: "Champaner",
    district: "Panchmahal",
    period: "1513 CE",
    style: "Gujarat Sultanate Classical Architecture",
    coordinates: { lat: 22.4833, lng: 73.5333 },
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Jami_Masjid%2C_Champaner-001.jpg",
    shortDesc: "A UNESCO medieval masterpiece known for its 172 sculpted pillars, towering 30-metre minarets, and filigreed stone jalis.",
    fullHistory: "Founded as the capital of Sultan Mahmud Begada in the late 15th century atop ancient Chavda and Khichi Chauhan Rajput foundations on Pavagadh hill. An unexcavated complete medieval city.",
    architectureDetails: "Contains over 114 documented monuments including fortifications, palace gateways, pavilions, and the majestic Jami Masjid known for its towering minarets, central dome, and finely filigreed stone jalis.",
    inscriptionRecord: "Arabic and Persian royal decrees on mosque gateways documenting the flourishing trade, irrigation reservoirs, and city planning under the Gujarat Sultanate.",
    significance: "Gujarat's first UNESCO World Heritage Site (2004), preserving the only completely unexcavated, intact pre-Mughal Islamic city in India.",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/d/df/Adi_Kadi_Vav_Uparkot_Fort_Junagadh.jpg",
    shortDesc: "A 2300-year-old citadel featuring 20-metre ramparts, 2nd-century Buddhist rock-cut caves, and the monolithic Adi Kadi Vav.",
    fullHistory: "Originally founded by Chandragupta Maurya in 319 BCE and rebuilt during the Gupta and Chudasama Rajput dynasties. Famously survived an epic 12-year siege by Siddharaj Jaisinh. Includes the Adi Kadi Vav and Navghan Kuwo, deep stepwells carved entirely from living bedrock.",
    architectureDetails: "Constructed with massive stone curtain walls up to 20 meters high, surrounded by a 15-meter deep dry moat. Features the 2nd-century CE rock-cut Buddhist cave complex with ornate Greco-Scythian carved pillars and subterranean monks' quarters.",
    inscriptionRecord: "Ashokan edicts located nearby and medieval Chudasama epigraphs in Sanskrit recording royal victories and fortification repairs.",
    significance: "One of the oldest continuously fortified military and spiritual citadels in Gujarat, standing at the base of the sacred Mount Girnar.",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Jali_at_Sidi_Saiyyed_Mosque_02.jpg",
    shortDesc: "India's first UNESCO World Heritage City, world-renowned for its delicate Tree of Life stone lattice and historic gated pols.",
    fullHistory: "Founded in 1411 CE by Sultan Ahmed Shah on the eastern banks of the Sabarmati river. In 1573, Sidi Saiyyed carved the celebrated ten semi-circular arch screens depicting intertwined palm boughs and the kalpataru tree.",
    architectureDetails: "Characterized by densely packed 'Pols'—gated residential micro-clusters with self-contained rainwater harvesting, internal chowks, and ornate timber-framed facades. The Sidi Saiyyed jali is carved from a single slab of yellow sandstone with paper-thin lace precision.",
    inscriptionRecord: "Bilingual inscriptions at Bhadra Fort, Teen Darwaza, and Sidi Saiyyed Mosque capturing centuries of civic history and the world-famous 'Tree of Life' stone jali lattice.",
    significance: "India's first UNESCO World Heritage City (inscribed 2017), celebrated for living grassroots community heritage and climate-responsive vernacular planning.",
    audioText: {
      en: "Ahmedabad, India's first UNESCO World Heritage City, is world-famous for its historic gated pols, carved wooden havelis, and the iconic Tree of Life stone lattice at Sidi Saiyyed Mosque.",
      hi: "भारत का पहला यूनेस्को विश्व धरोहर शहर, अहमदाबाद 1411 ईस्वी में बसाया गया था। इसकी ऐतिहासिक पोलें, लकड़ी की नक्काशीदार हवेलियां और सीदी सैय्यद की जाली विश्व प्रसिद्ध हैं।",
      gu: "ભારતનું પ્રથમ યુનેસ્કો વર્લ્ડ હેરિટેજ સિટી અમદાવાદ ૧૪૧૧માં વસાવવામાં આવ્યું હતું. તેની ઐતિહાસિક પોળો અને સીદી સૈયદની કલાત્મક વૃક્ષ જાળી સમગ્ર વિશ્વમાં વિખ્યાત છે."
    }
  },
  {
    id: "lothal_dockyard",
    name: "Lothal: Ancient Harappan Port",
    nameGujarati: "લોથલ: હડપ્પન બંદર",
    category: "Archaeological Sites",
    city: "Saragwala",
    district: "Ahmedabad",
    period: "2400 BCE – 1900 BCE",
    style: "Harappan Maritime Engineering & Tidal Basin Masonry",
    coordinates: { lat: 22.5222, lng: 72.2497 },
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Lothal_dock.jpg",
    shortDesc: "The world's earliest known tidal dockyard, connecting ancient India with Persian Gulf and Mesopotamian trade routes.",
    fullHistory: "Excavated by S.R. Rao in 1954–1962, Lothal served as a thriving Harappan port city. The massive brick basin was engineered with sluice gates and spillway channels to handle oceanic tides from the Gulf of Khambhat.",
    architectureDetails: "Features a trapezoidal fired-brick dock measuring 214m by 36m, a warehouse on a 3.5m high mud-brick platform, bead-manufacturing factories, and microscopic micro-drill lapidary instruments.",
    inscriptionRecord: "Terracotta sealings with unicorn motifs, Indus script inscriptions, and Persian Gulf button seals proving direct maritime trade with Dilmun and Sumer.",
    significance: "The world's oldest engineered tidal dockyard, documenting India's 4,500-year-old maritime supremacy and export craftsmanship.",
    audioText: {
      en: "Lothal in Gujarat is the world's oldest recorded tidal dockyard, built around 2400 BCE. It served as a prime Harappan port connecting ancient India to Mesopotamian and Egyptian maritime trade.",
      hi: "गुजरात का लोथल विश्व का सबसे प्राचीन गोदीबाड़ा (डॉकयार्ड) है, जो 2400 ईसा पूर्व का है। यह प्राचीन हड़प्पा सभ्यता का प्रमुख बंदरगाह था जो मेसोपोटामिया से व्यापार जोड़ता था।",
      gu: "અમદાવાદ જિલ્લામાં આવેલું લોથલ વિશ્વનું સૌથી પ્રાચીન ભરતી બંદર (ગોદીવાડો) છે. ઇસવીસન પૂર્વે ૨૪૦૦માં બનેલું આ બંદર સિંધુ સભ્યતાનું આંતરરાષ્ટ્રીય વેપારી કેન્દ્ર હતું."
    }
  },
  {
    id: "palitana_temples",
    name: "Palitana: Shatrunjaya Hill Temples",
    nameGujarati: "પાલીતાણા: શત્રુંજય તીર્થ",
    category: "Temples",
    city: "Palitana",
    district: "Bhavnagar",
    period: "11th–19th Century CE",
    style: "Māru-Gurjara Pure Marble Chaumukha Architecture",
    coordinates: { lat: 21.5297, lng: 71.8288 },
    image: "https://upload.wikimedia.org/wikipedia/commons/4/49/Palitana_temples_view.jpg",
    shortDesc: "The world's only mountain with over 863 sculpted marble temples, the supreme sacred pilgrimage destination of Jainism.",
    fullHistory: "Revered as the sacred place where 23 of the 24 Jain Tirthankaras attained spiritual liberation. Built through collective community philanthropy across dynasties, with no one permitted to stay on the hill overnight.",
    architectureDetails: "Spanning twin peaks and an intermediate saddle, accessed via 3,800 stone steps. Features the grand Adinath temple and Chaumukha temple with quadruple marble shrines, soaring clustered shikhars, and lacework stone ceilings.",
    inscriptionRecord: "Over 2,000 recorded stone inscriptions in Sanskrit, Prakrit, and Old Gujarati capturing medieval merchant endowments and spiritual lineages.",
    significance: "The holiest pilgrimage summit in Jainism, representing the pinnacle of clustered stone temple city planning anywhere in the world.",
    audioText: {
      en: "Palitana on Shatrunjaya hill in Bhavnagar boasts over 863 sculpted white marble temples. Reached by 3,800 steps, it is the most sacred pilgrimage summit in Jainism.",
      hi: "भावनगर के पालिताना स्थित शत्रुंजय पर्वत पर 863 से अधिक संगमरमर के भव्य मंदिर बने हैं। 3800 सीढ़ियां चढ़कर पहुंचने वाला यह पवित्र पर्वत जैन धर्म का सर्वोच्च तीर्थस्थल है।",
      gu: "ભાવનગરના પાલીતાણામાં શત્રુંજય પર્વત પર ૮૬૩થી વધુ આરસપહાણના ભવ્ય જિનાલયો આવેલા છે. ૩૮૦૦ પગથિયાં ચઢીને પહોંચાતું આ પવિત્ર સ્થળ જૈન ધર્મનું સર્વોચ્ચ તીર્થધામ છે."
    }
  }
];

export default function Home() {
  const [monuments, setMonuments] = useState<Monument[]>(MONUMENTS_DATA);
  const [selectedMonument, setSelectedMonument] = useState<Monument>(MONUMENTS_DATA[0]);
  const [activePage, setActivePage] = useState<"home" | "explore" | "categories" | "3d_twins" | "ingest" | "about" | "detail">("home");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Audio Language State
  const [audioLang, setAudioLang] = useState<"gu" | "hi" | "en">("gu");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // AI Q&A State with Instant Intelligent Answers & Loading State
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

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

  // Switch Subpage
  const navigateToPage = (page: typeof activePage, categoryFilter?: string) => {
    setActivePage(page);
    setDrawerOpen(false);
    if (categoryFilter) setActiveCategory(categoryFilter);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Open Monument Detail Subpage
  const openMonumentDetail = (monument: Monument) => {
    setSelectedMonument(monument);
    setActivePage("detail");
    setChatResponse(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Open 3D View Subpage
  const open3DSubpage = (monument?: Monument) => {
    if (monument) setSelectedMonument(monument);
    setActivePage("3d_twins");
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Multilingual Speech Synthesis (Gujarati, Hindi, English)
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
    if (activePage !== "3d_twins" || !canvasRef.current || !selectedMonument) return;

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

    const marbleMat = new THREE.MeshStandardMaterial({
      color: 0xf5f3eb,
      roughness: 0.4,
      metalness: 0.2,
      wireframe: wireframe
    });

    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x24587a,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85
    });

    // 1. STEPWELLS: Descending subterranean tiers, carved pillars & water pool
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
    // 2. TEMPLES: Sprawling Jagati base, 52-pillar Sabha Mandap & tall curvilinear Shikhara
    else if (selectedMonument.category === "Temples") {
      const isPalitana = selectedMonument.id === "palitana_temples";
      const useMat = isPalitana ? marbleMat : sandstone;

      const base = new THREE.Mesh(new THREE.BoxGeometry(6.0, 0.6, 6.0), darkBaseMat);
      base.position.y = -1.6;
      group.add(base);

      // Shikhara (Spire)
      const shikhar = new THREE.Mesh(new THREE.ConeGeometry(1.6, 3.4, 8), useMat);
      shikhar.position.set(0, 1.3, -0.8);
      group.add(shikhar);

      // Amalaka & Kalasha
      const amalaka = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, 0.25, 16), useMat);
      amalaka.position.set(0, 3.0, -0.8);
      group.add(amalaka);

      const kalash = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.7, roughness: 0.3 }));
      kalash.position.set(0, 3.25, -0.8);
      group.add(kalash);

      // Mandapa
      const mandapPillars = [[-1.3, 1.0], [1.3, 1.0], [-1.3, 2.2], [1.3, 2.2], [0, 2.2]];
      mandapPillars.forEach(([x, z]) => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 1.8, 12), useMat);
        col.position.set(x, -0.4, z);
        group.add(col);
      });
      const dome = new THREE.Mesh(new THREE.SphereGeometry(1.4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), useMat);
      dome.position.set(0, 0.5, 1.6);
      group.add(dome);
    }
    // 3. ARCHAEOLOGICAL / HARAPPAN SITES: Reservoir steps, stone citadel bastions & ancient ramp
    else if (selectedMonument.category === "Archaeological Sites") {
      const rockBase = new THREE.Mesh(new THREE.BoxGeometry(6.6, 1.2, 5.5), darkBaseMat);
      rockBase.position.y = -1.2;
      group.add(rockBase);

      // Harappan Water Reservoir Steps
      for (let i = 0; i < 4; i++) {
        const resStep = new THREE.Mesh(new THREE.BoxGeometry(3.5 - i * 0.7, 0.25, 3.0 - i * 0.6), sandstone);
        resStep.position.set(-1.0, -1.0 + i * 0.25, 0);
        group.add(resStep);
      }
      const water = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.1, 1.2), waterMat);
      water.position.set(-1.0, -1.15, 0);
      group.add(water);

      // Citadel Gate Bastions
      const bastion1 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 1.2), sandstone);
      bastion1.position.set(1.8, 0.2, -1.0);
      group.add(bastion1);
      const bastion2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 1.2), sandstone);
      bastion2.position.set(1.8, 0.2, 1.0);
      group.add(bastion2);

      // Signboard Beam
      const signPost = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.6, 0.1), darkBaseMat);
      signPost.position.set(1.8, 1.5, 0);
      group.add(signPost);
      const signBoard = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.4, 1.2), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      signBoard.position.set(1.8, 2.1, 0);
      group.add(signBoard);
    }
    // 4. FORTS & PALACES: Massive Indo-Saracenic royal facade, 300-ft central clock tower & chhatris
    else if (selectedMonument.category === "Forts & Palaces") {
      const palaceBase = new THREE.Mesh(new THREE.BoxGeometry(6.4, 1.8, 3.2), sandstone);
      palaceBase.position.y = -0.7;
      group.add(palaceBase);

      // Central Clock Tower
      const clockTower = new THREE.Mesh(new THREE.BoxGeometry(1.3, 3.8, 1.3), sandstone);
      clockTower.position.set(0, 0.7, 0.3);
      group.add(clockTower);
      const towerRoof = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.2, 4), new THREE.MeshStandardMaterial({ color: 0x963e26 }));
      towerRoof.position.set(0, 2.9, 0.3);
      group.add(towerRoof);

      // Flanking Domes & Minarets
      [-2.4, 2.4].forEach(x => {
        const minar = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 2.8, 16), sandstone);
        minar.position.set(x, 0.2, 0.6);
        group.add(minar);
        const dome = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 16), new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.5 }));
        dome.position.set(x, 1.7, 0.6);
        group.add(dome);
      });
    }
    // 5. HISTORICAL PLACES: Medieval Islamic gateway with jali screen & fluted minarets
    else {
      const gateArch = new THREE.Mesh(new THREE.BoxGeometry(4.8, 2.6, 1.2), sandstone);
      gateArch.position.y = -0.3;
      group.add(gateArch);

      // Pierced Archway
      const archPortal = new THREE.Mesh(new THREE.BoxGeometry(2.0, 2.0, 1.4), new THREE.MeshStandardMaterial({ color: 0x120c08 }));
      archPortal.position.set(0, -0.6, 0);
      group.add(archPortal);

      // Delicate Jali Screen Simulation
      const jali = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.2), new THREE.MeshStandardMaterial({ color: 0xf59e0b, wireframe: true }));
      jali.position.set(0, 0.8, 0.62);
      group.add(jali);

      // Fluted Minars
      [-2.6, 2.6].forEach(x => {
        const minar = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 3.4, 12), sandstone);
        minar.position.set(x, 0.4, 0);
        group.add(minar);
        const cupola = new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.8, 8), new THREE.MeshStandardMaterial({ color: 0x8a4b22 }));
        cupola.position.set(x, 2.2, 0);
        group.add(cupola);
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
  }, [activePage, selectedMonument, wireframe]);

  // SMART AI ASSISTANT NATURAL LANGUAGE RESPONDER
  const handleAIPrompt = (query: string) => {
    if (!selectedMonument || !query.trim()) return;
    setIsAiLoading(true);
    setChatResponse(null);

    const q = query.toLowerCase();

    setTimeout(() => {
      // 1. Who built / Founder / Dynasty / Ruler
      if (q.includes("who built") || q.includes("builder") || q.includes("king") || q.includes("queen") || q.includes("dynasty") || q.includes("kisne") || q.includes("banwaya") || q.includes("ruler")) {
        setChatResponse(`🏛️ Patron & Origin: ${selectedMonument.fullHistory.split('.')[0]}. Built during the ${selectedMonument.period} under the guidance of regional rulers to serve cultural, spiritual, and communal welfare.`);
      }
      // 2. When / Period / Era / Century / Age
      else if (q.includes("when") || q.includes("year") || q.includes("period") || q.includes("century") || q.includes("age") || q.includes("old") || q.includes("kab") || q.includes("date")) {
        setChatResponse(`⏳ Chronology & Era: ${selectedMonument.name} dates back to ${selectedMonument.period}. It represents centuries of architectural evolution in ${selectedMonument.district}, Gujarat.`);
      }
      // 3. Where / Location / City / Reach / Map
      else if (q.includes("where") || q.includes("location") || q.includes("city") || q.includes("district") || q.includes("kahan") || q.includes("reach") || q.includes("place")) {
        setChatResponse(`📍 Geographical Location: ${selectedMonument.name} is situated in ${selectedMonument.city}, ${selectedMonument.district} district, Gujarat, India. Exact GPS Telemetry: ${selectedMonument.coordinates.lat.toFixed(4)}°N, ${selectedMonument.coordinates.lng.toFixed(4)}°E.`);
      }
      // 4. Architecture / Design / Stone / Pillars
      else if (q.includes("architecture") || q.includes("style") || q.includes("design") || q.includes("stone") || q.includes("pillar") || q.includes("tier") || q.includes("stair") || q.includes("carving") || q.includes("vastu")) {
        setChatResponse(`🎨 Architectural Mastery: Built in ${selectedMonument.style}. ${selectedMonument.architectureDetails}`);
      }
      // 5. Why important / Significance / UNESCO
      else if (q.includes("why") || q.includes("important") || q.includes("significance") || q.includes("unesco") || q.includes("special") || q.includes("khas") || q.includes("famous")) {
        setChatResponse(`⭐ Cultural Importance: ${selectedMonument.significance}`);
      }
      // 6. Simple language explanation
      else if (q.includes("simple language") || q.includes("explain") || q.includes("easy") || q.includes("aasan")) {
        setChatResponse(`💡 Simple Overview: ${selectedMonument.name} (${selectedMonument.nameGujarati}) is a treasured heritage site in ${selectedMonument.city}, Gujarat. Built in ${selectedMonument.period}, it showcases ancient craftsmanship, community water-management, and deep spiritual traditions.`);
      }
      // 7. Student study summary
      else if (q.includes("student") || q.includes("summarize") || q.includes("exam") || q.includes("notes") || q.includes("short")) {
        setChatResponse(`📚 Student Quick Notes:\n• Monument: ${selectedMonument.name} (${selectedMonument.nameGujarati})\n• Era: ${selectedMonument.period}\n• Style: ${selectedMonument.style}\n• District: ${selectedMonument.district}, Gujarat\n• Key Takeaway: ${selectedMonument.shortDesc}`);
      }
      // 8. Inscriptions & Related sites
      else if (q.includes("inscription") || q.includes("script") || q.includes("shilalekh") || q.includes("related")) {
        setChatResponse(`📜 Epigraphs & Connections: ${selectedMonument.inscriptionRecord}. Connected to Gujarat's royal pilgrimage corridor alongside Patan, Modhera, and Dwarka.`);
      }
      // 9. Audio command
      else if (q.includes("audio") || q.includes("speak") || q.includes("listen") || q.includes("sunao") || q.includes("voice")) {
        playAudioGuide(selectedMonument, audioLang);
        setChatResponse(`🔊 Playing native audio narration for ${selectedMonument.name} in ${audioLang === "gu" ? "Gujarati (ગુજરાતી)" : audioLang === "hi" ? "Hindi" : "English"}...`);
      }
      // 10. General fallback answer
      else {
        setChatResponse(`🏛️ Heritage Archive Insight: ${selectedMonument.name} (${selectedMonument.nameGujarati}) is documented under ${selectedMonument.category} in ${selectedMonument.city}. ${selectedMonument.shortDesc} ${selectedMonument.significance}`);
      }
      setIsAiLoading(false);
    }, 400);
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
        district: uploadCity,
        period: "15th Century CE",
        style: "Solanki-Vaghela Transition",
        coordinates: { lat: 23.2 + Math.random() * 0.4, lng: 72.5 + Math.random() * 0.4 },
        image: selectedFile ? URL.createObjectURL(selectedFile) : "https://upload.wikimedia.org/wikipedia/commons/c/c1/Adalaj_Stepwell_Interior.jpg",
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
      <header className="sticky top-0 z-40 bg-[#26180f] text-[#fbf8f3] border-b border-[#442c1b] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg">
        {/* Logo & Brand */}
        <div 
          onClick={() => navigateToPage("home")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-[#24170f] flex items-center justify-center font-bold shadow-md shadow-amber-950/40 transition group-hover:scale-105">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#fcfaf5] flex items-center gap-1.5">
              HeritageAI
              <span className="text-[10px] font-sans tracking-widest uppercase bg-[#3f2b1d] text-[#fbbf24] border border-[#f59e0b]/40 px-2 py-0.5 rounded-full">
                IITGN
              </span>
            </div>
          </div>
        </div>

        {/* Right Controls: Quick Search & Clean 3-Line Menu Button */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigateToPage("explore")}
            className="hidden sm:flex items-center gap-2 text-xs font-semibold bg-[#352215] hover:bg-[#47301f] text-[#fbbf24] px-4 py-2 rounded-xl border border-[#4d3422] transition"
          >
            <Compass className="w-4 h-4" /> Explore Catalog ({monuments.length})
          </button>

          {/* THE 3-LINE (HAMBURGER) BUTTON */}
          <button 
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#f59e0b] to-[#d97706] hover:from-[#fbbf24] hover:to-[#f59e0b] text-[#24170f] font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md transition cursor-pointer"
          >
            <Menu className="w-5 h-5" />
            <span className="hidden sm:inline">Menu</span>
          </button>
        </div>
      </header>

      {/* ----------------- SLIDE-OUT DRAWER WHEN 3-LINE BUTTON IS TAPPED ----------------- */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="w-80 sm:w-96 bg-[#26180f] text-[#fbf8f3] h-full p-6 flex flex-col justify-between border-l border-[#442c1b] shadow-2xl">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#3b271a]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#f59e0b] text-[#24170f] flex items-center justify-center font-bold">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <span className="font-serif font-bold text-xl text-[#faf8f4]">HeritageAI Portal</span>
                </div>
                <button 
                  onClick={() => setDrawerOpen(false)} 
                  className="w-8 h-8 rounded-lg bg-[#382619] text-[#fbbf24] hover:text-white flex items-center justify-center transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Subpage Options */}
              <nav className="flex flex-col gap-2 font-medium text-sm">
                <button 
                  onClick={() => navigateToPage("home")}
                  className={`text-left py-3 px-4 rounded-xl flex items-center gap-3 transition ${
                    activePage === "home" ? "bg-[#3e2717] text-[#fbbf24] font-bold border border-[#f59e0b]/30" : "hover:bg-[#322014] text-[#e8ded4]"
                  }`}
                >
                  <HomeIcon className="w-4 h-4 text-[#f59e0b]" /> Home Dashboard
                </button>

                <button 
                  onClick={() => navigateToPage("explore")}
                  className={`text-left py-3 px-4 rounded-xl flex items-center gap-3 transition ${
                    activePage === "explore" ? "bg-[#3e2717] text-[#fbbf24] font-bold border border-[#f59e0b]/30" : "hover:bg-[#322014] text-[#e8ded4]"
                  }`}
                >
                  <Compass className="w-4 h-4 text-[#f59e0b]" /> Explore Heritage ({monuments.length} Sites)
                </button>

                <button 
                  onClick={() => navigateToPage("categories")}
                  className={`text-left py-3 px-4 rounded-xl flex items-center gap-3 transition ${
                    activePage === "categories" ? "bg-[#3e2717] text-[#fbbf24] font-bold border border-[#f59e0b]/30" : "hover:bg-[#322014] text-[#e8ded4]"
                  }`}
                >
                  <Grid className="w-4 h-4 text-[#f59e0b]" /> Heritage Categories
                </button>

                <button 
                  onClick={() => open3DSubpage()}
                  className={`text-left py-3 px-4 rounded-xl flex items-center gap-3 transition ${
                    activePage === "3d_twins" ? "bg-[#3e2717] text-[#fbbf24] font-bold border border-[#f59e0b]/30" : "hover:bg-[#322014] text-[#e8ded4]"
                  }`}
                >
                  <Box className="w-4 h-4 text-[#f59e0b]" /> 3D Digital Twins
                </button>

                <button 
                  onClick={() => navigateToPage("ingest")}
                  className={`text-left py-3 px-4 rounded-xl flex items-center justify-between transition ${
                    activePage === "ingest" ? "bg-[#3e2717] text-[#fbbf24] font-bold border border-[#f59e0b]/30" : "hover:bg-[#322014] text-[#e8ded4]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <UploadCloud className="w-4 h-4 text-[#f59e0b]" /> Ingestion Lab
                  </span>
                  <span className="text-[9px] bg-[#f59e0b] text-[#24170f] font-bold px-1.5 py-0.5 rounded">NEW</span>
                </button>

                <button 
                  onClick={() => navigateToPage("about")}
                  className={`text-left py-3 px-4 rounded-xl flex items-center gap-3 transition ${
                    activePage === "about" ? "bg-[#3e2717] text-[#fbbf24] font-bold border border-[#f59e0b]/30" : "hover:bg-[#322014] text-[#e8ded4]"
                  }`}
                >
                  <Info className="w-4 h-4 text-[#f59e0b]" /> About & Mission
                </button>
              </nav>
            </div>

            <div className="pt-4 border-t border-[#3b271a] flex flex-col gap-2">
              <span className="text-xs text-[#a39487]">
                Blithchron '27 · Track 2: Culture & Digital Heritage
              </span>
              <span className="text-[11px] text-[#fbbf24]">
                IIT Gandhinagar Explorer Fellowship
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SUBPAGE 1: HOME ===================== */}
      {activePage === "home" && (
        <main className="animate-fadeIn flex-1">
          {/* HERO SECTION WITH TRANSPARENT HERITAGE STEPWELL BACKGROUND */}
          <section className="relative min-h-[540px] flex items-center justify-center text-center px-4 sm:px-8 py-20 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
              style={{
                backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/4/4e/Rani_Ki_Vav%2C_Above_View.JPG')`
              }}
            />
            {/* Walnut-to-Sage Transparent Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#24170f]/92 via-[#2d2017]/84 to-[#34463a]/90" />

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
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
                  onClick={() => navigateToPage("explore")}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#f59e0b] to-[#d97706] hover:from-[#fbbf24] hover:to-[#f59e0b] text-[#24170f] font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition"
                >
                  Explore All {monuments.length} Monuments <ArrowRight className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => open3DSubpage()}
                  className="w-full sm:w-auto bg-[#312217]/80 hover:bg-[#38261a] text-[#faf8f4] border border-[#fbbf24]/50 font-medium text-sm sm:text-base px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 backdrop-blur-sm transition"
                >
                  <Box className="w-4 h-4 text-[#f59e0b]" /> Launch 3D Explorer
                </button>
              </div>
            </div>
          </section>

          {/* Quick Metrics */}
          <section className="max-w-6xl mx-auto px-4 sm:px-8 -mt-10 relative z-20">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-[#e8dfd5] shadow-lg">
              <div className="p-3 text-center border-r border-[#f0ebe3]">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#b45309]">{monuments.length}</span>
                <span className="text-[11px] text-[#5e7065] block font-medium">Documented Sites</span>
              </div>
              <div className="p-3 text-center border-r border-[#f0ebe3]">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#b45309]">4</span>
                <span className="text-[11px] text-[#5e7065] block font-medium">UNESCO World Heritage</span>
              </div>
              <div className="p-3 text-center border-r border-[#f0ebe3]">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#b45309]">3</span>
                <span className="text-[11px] text-[#5e7065] block font-medium">Languages (GU / HI / EN)</span>
              </div>
              <div className="p-3 text-center">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#b45309]">360°</span>
                <span className="text-[11px] text-[#5e7065] block font-medium">WebGL Digital Twins</span>
              </div>
            </div>
          </section>

          {/* Featured Highlights (Only 3 top sites for clean homepage) */}
          <section className="max-w-6xl mx-auto px-4 sm:px-8 py-14">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2e1f14]">Featured Architectural Gems</h2>
                <p className="text-xs sm:text-sm text-[#5e7366] mt-0.5">Directly documented through the IIT Gandhinagar Explorer Fellowship.</p>
              </div>
              <button 
                onClick={() => navigateToPage("explore")}
                className="text-xs sm:text-sm font-bold text-[#b45309] hover:underline flex items-center gap-1"
              >
                View Complete Directory ({monuments.length}) <ArrowRight className="w-4 h-4" />
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

      {/* ===================== SUBPAGE 2: EXPLORE HERITAGE DIRECTORY ===================== */}
      {activePage === "explore" && (
        <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 animate-fadeIn flex-1">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#2e1f14]">Gujarat Heritage Directory</h1>
              <p className="text-xs text-[#5f7366] mt-1">Explore all documented architectural stepwells, temples, citadels, and Harappan settlements.</p>
            </div>

            {/* Search input */}
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

          {/* Category Filter Pills */}
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

          {/* Grid of all 12 monuments with original images */}
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

      {/* ===================== SUBPAGE 3: CATEGORIES ===================== */}
      {activePage === "categories" && (
        <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 animate-fadeIn flex-1">
          <h1 className="text-3xl font-serif font-bold text-[#2e1f14] mb-2">Heritage Categories</h1>
          <p className="text-xs text-[#5f7366] mb-8">Browse the rich diversity of Gujarat by architectural typology.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Stepwells (વાવ)", category: "Stepwells", count: 2, image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Rani_Ki_Vav%2C_Above_View.JPG", desc: "Subterranean multi-tiered architectural wonders for cooling, sacred reverence, and public water storage." },
              { title: "Temples (મંદિર)", category: "Temples", count: 4, image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Sun_Temple_Modhera.jpg", desc: "Classical Solanki and Maru-Gurjara shrines featuring sacred mandapas, intricate stone kalash, and celestial carvings." },
              { title: "Forts & Palaces", category: "Forts & Palaces", count: 2, image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Laxmi_vilas_palace%2C_Vadodara_02.jpg", desc: "Impregnable hilltop military citadels and royal Indo-Saracenic residences of western Indian dynasties." },
              { title: "Archaeological Sites", category: "Archaeological Sites", count: 3, image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Water_reservoir_at_Dholavira_site.jpg", desc: "Ancient Harappan Bronze Age civilisations and unexcavated medieval sultanate capital cities." },
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

      {/* ===================== SUBPAGE 4: 3D DIGITAL TWIN EXPLORER ===================== */}
      {activePage === "3d_twins" && (
        <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 animate-fadeIn flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2e1f14] flex items-center gap-2">
                <Box className="w-6 h-6 text-[#f59e0b]" /> WebGL 3D Digital Twin Viewport
              </h1>
              <p className="text-xs text-[#5f7366] mt-0.5">
                Real-time interactive 3D model reconstruction. Drag to rotate 360°, scroll to zoom depth.
              </p>
            </div>

            {/* Monument Selector Dropdown */}
            <div className="flex items-center gap-2">
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

              <button
                onClick={() => setWireframe(!wireframe)}
                className={`text-xs px-3.5 py-2 rounded-xl border font-mono transition flex items-center gap-1.5 shadow-sm ${
                  wireframe 
                    ? "bg-[#f59e0b] text-[#24170f] border-[#f59e0b] font-bold" 
                    : "bg-[#281a10] text-[#fbbf24] border-[#442e1d] hover:border-[#f59e0b]"
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> {wireframe ? "Solid Mesh" : "Wireframe Mode"}
              </button>
            </div>
          </div>

          {/* 3D Viewport Box */}
          <div className="bg-[#18110b] rounded-3xl p-4 border border-[#38271a] shadow-2xl relative">
            <div className="h-[460px] sm:h-[520px] w-full rounded-2xl overflow-hidden relative border border-[#2d1e13] bg-[#120c08] flex items-center justify-center">
              <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

              <div className="absolute bottom-4 left-4 bg-[#20150d]/90 backdrop-blur border border-[#442e1d] px-4 py-2 rounded-xl text-xs text-[#ded7cc] flex items-center gap-3 pointer-events-none">
                <Sliders className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>360° Drag / Swipe to Orbit</span>
                <span className="text-[#523e2f]">|</span>
                <span className="text-[#fbbf24] font-medium">{selectedMonument.style}</span>
              </div>
            </div>

            {/* Monument Info Overlay Under Canvas */}
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

      {/* ===================== SUBPAGE 5: INGESTION LAB ===================== */}
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

      {/* ===================== SUBPAGE 6: ABOUT & MISSION ===================== */}
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

      {/* ===================== SUBPAGE 7: MONUMENT DETAIL VIEW ===================== */}
      {activePage === "detail" && selectedMonument && (
        <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 animate-fadeIn flex-1">
          <button 
            onClick={() => navigateToPage("explore")}
            className="text-xs font-bold text-[#2e1f14] hover:text-[#b45309] flex items-center gap-1.5 mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to directory
          </button>

          {/* Top Banner with Original Image */}
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

            {/* Action Bar: 3D View + Gujarati Audio Guide */}
            <div className="bg-[#1e130b] px-6 py-3 flex items-center justify-between border-t border-[#3a2618] flex-wrap gap-3">
              <button 
                onClick={() => open3DSubpage(selectedMonument)}
                className="bg-[#f59e0b] hover:bg-[#fbbf24] text-[#24170f] font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow"
              >
                <Box className="w-4 h-4" /> Open 3D Digital Twin View
              </button>

              {/* Multilingual Audio Narrator */}
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

          {/* In-Depth Historical & Architectural Breakdown */}
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
                  <span className="text-[11px] font-bold text-[#2e1f14] block mb-1">Architectural Epigraphy & Inscriptions:</span>
                  <p className="text-xs font-mono text-[#8c6721] bg-[#fbf8f0] p-3 rounded-xl border border-[#eedfc0]">
                    {selectedMonument.inscriptionRecord}
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

            {/* INTERACTIVE PROMPT CHIPS & SMART AI ASSISTANT */}
            <div className="bg-white border border-[#e4ded0] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Bot className="w-5 h-5 text-[#f59e0b]" />
                <h3 className="text-xs font-bold tracking-wider uppercase text-[#b45309]">
                  Ask Heritage AI Assistant
                </h3>
              </div>
              
              {/* Quick Click Prompts */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "Who built it and why?",
                  "Explain this monument in simple language.",
                  "What is special about its architecture?",
                  "Summarize its history for a student.",
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

              {/* Chat Input with Enter Key Support */}
              <div className="flex gap-2">
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
                  placeholder={`Ask anything about ${selectedMonument.name}... (Press Enter)`}
                  className="flex-1 bg-[#f9f8f4] border border-[#dcd6c6] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#2c1f15] focus:outline-none focus:border-[#f59e0b]"
                />
                <button 
                  onClick={() => {
                    if (chatInput.trim()) {
                      handleAIPrompt(chatInput);
                      setChatInput("");
                    }
                  }}
                  disabled={isAiLoading || !chatInput.trim()}
                  className="bg-[#24170f] hover:bg-[#382619] disabled:opacity-50 text-[#fbbf24] px-4 py-2 rounded-xl transition flex items-center justify-center cursor-pointer"
                >
                  {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin text-[#fbbf24]" /> : <Send className="w-4 h-4" />}
                </button>
              </div>

              {/* AI Loading State */}
              {isAiLoading && (
                <div className="mt-4 p-4 bg-[#f8f5ed] border border-[#e8dfcf] rounded-xl text-xs text-[#5e7065] flex items-center gap-2.5 animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin text-[#f59e0b]" />
                  <span>Heritage AI is querying archives and epigraph records for {selectedMonument.name}...</span>
                </div>
              )}

              {/* AI Response Box with Audio Listen Action */}
              {chatResponse && !isAiLoading && (
                <div className="mt-4 p-4 bg-[#f8f5ed] border border-[#e8dfcf] rounded-xl text-xs sm:text-sm text-[#2c1f15] leading-relaxed flex flex-col gap-2.5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#e4ded0] pb-2">
                    <span className="font-bold text-[#b45309] flex items-center gap-1.5 text-xs">
                      <Sparkles className="w-4 h-4 text-[#f59e0b]" /> AI Archive Intelligence
                    </span>
                    <button
                      onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(chatResponse);
                        utterance.rate = 0.95;
                        window.speechSynthesis.speak(utterance);
                      }}
                      className="text-[11px] text-[#b45309] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Listen Response
                    </button>
                  </div>
                  <div className="whitespace-pre-line text-[#3d2c20]">
                    {chatResponse}
                  </div>
                </div>
              )}
            </div>

            {/* Location & Maps integration */}
            <div className="bg-white border border-[#e4ded0] rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-serif font-bold text-base text-[#2e1f14] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#f59e0b]" /> Geolocation & Telemetry
                </h4>
                <p className="text-xs text-[#52685a] mt-1">
                  {selectedMonument.city}, {selectedMonument.district}, Gujarat, India
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
        </main>
      )}

      {/* Global Footer */}
      <footer className="bg-[#20140c] text-[#faf8f4] border-t border-[#3a271a] py-8 px-4 sm:px-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8c7b6f]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#f59e0b] text-[#24170f] flex items-center justify-center font-bold">
              <Landmark className="w-3.5 h-3.5" />
            </div>
            <span className="font-serif font-bold text-sm text-[#faf8f4]">HeritageAI / VirasatGraph</span>
          </div>
          <span>IIT Gandhinagar · Explorer Fellowship Archives · Blithchron '27 Track 2</span>
        </div>
      </footer>

    </div>
  );
}