export const serviceGroups = [
  {
    id: 'outdoor',
    name: { en: 'Large-scale outdoor advertising', hi: 'बड़े पैमाने पर आउटडोर विज्ञापन', te: 'భారీ స్థాయి అవుట్‌డోర్ ప్రకటనలు' },
    products: [
      { id: 'hoarding', model: 'hoarding', name: { en: 'Hoardings', hi: 'होर्डिंग', te: 'హోర్డింగ్‌లు' }, desc: { en: 'BUILT BIG. BUILT TO LAST.', hi: 'बड़ा आकार। टिकाऊ निर्माण।', te: 'భారీగా. మన్నికగా.' } },
      { id: 'blacklight', model: 'blacklight', name: { en: 'Blacklight boards', hi: 'ब्लैकलाइट बोर्ड', te: 'బ్లాక్‌లైట్ బోర్డులు' }, desc: { en: 'NIGHT-TIME, TURNED UP.', hi: 'रात में भी चमकदार।', te: 'రాత్రివేళ మరింత ప్రకాశం.' } },
      { id: 'auto-rickshaw', model: 'auto', name: { en: 'Auto rickshaw advertisements', hi: 'ऑटो रिक्शा विज्ञापन', te: 'ఆటో రిక్షా ప్రకటనలు' }, desc: { en: 'YOUR BRAND ON THE MOVE.', hi: 'चलते-फिरते आपका ब्रांड।', te: 'ప్రయాణంలో మీ బ్రాండ్.' } }
    ]
  },
  {
    id: 'signage',
    name: { en: 'Commercial & premium signage', hi: 'कमर्शियल और प्रीमियम साइनेज', te: 'కమర్షియల్ & ప్రీమియం సైన్‌బోర్డులు' },
    products: [
      { id: 'flex-vinyl', model: 'flex', name: { en: 'Flex and vinyl printing', hi: 'फ्लेक्स और विनाइल प्रिंटिंग', te: 'ఫ్లెక్స్ & వినైల్ ప్రింటింగ్' }, desc: { en: 'BRIGHT COLOUR. CLEAN FINISH.', hi: 'चटख रंग। बेहतरीन फिनिश।', te: 'మెరిసే రంగులు. నాణ్యమైన ఫినిష్.' } },
      { id: 'flute-board', model: 'flute', name: { en: 'Flute boards', hi: 'फ्लूट बोर्ड', te: 'ఫ్లూట్ బోర్డులు' }, desc: { en: 'LIGHTWEIGHT. READY TO DISPLAY.', hi: 'हल्के, डिस्प्ले के लिए तैयार।', te: 'తేలికగా. ప్రదర్శనకు సిద్ధంగా.' } },
      { id: 'one-way-vision', model: 'oneway', name: { en: 'One-way vision stickering', hi: 'वन-वे विज़न स्टिकरिंग', te: 'వన్-వే విజన్ స్టికరింగ్' }, desc: { en: 'PRIVACY WITH A POINT OF VIEW.', hi: 'निजता भी, ब्रांडिंग भी।', te: 'గోప్యతతో కూడిన బ్రాండింగ్.' } },
      { id: 'wall-stickers', model: 'wall', name: { en: 'Digital wall stickers', hi: 'डिजिटल वॉल स्टिकर', te: 'డిజిటల్ వాల్ స్టిక్కర్లు' }, desc: { en: 'MAKE YOUR WALLS WORK.', hi: 'दीवारों को ब्रांड बनाइए।', te: 'మీ గోడలకూ బ్రాండ్ రూపం.' } }
    ]
  },
  {
    id: 'stationery',
    name: { en: 'Corporate & educational stationery', hi: 'कॉर्पोरेट और शैक्षिक स्टेशनरी', te: 'కార్పొరేట్ & విద్యా స్టేషనరీ' },
    products: [
      { id: 'id-cards', model: 'id', name: { en: 'School and business ID cards', hi: 'स्कूल और बिज़नेस ID कार्ड', te: 'స్కూల్ & బిజినెస్ ID కార్డులు' }, desc: { en: 'YOUR PEOPLE. YOUR IDENTITY.', hi: 'आपकी टीम, आपकी पहचान।', te: 'మీ బృందం. మీ గుర్తింపు.' } },
      { id: 'office-files', model: 'file', name: { en: 'Office files', hi: 'ऑफिस फाइलें', te: 'ఆఫీస్ ఫైళ్లు' }, desc: { en: 'KEEP YOUR BRAND IN ORDER.', hi: 'हर फाइल में आपका ब्रांड।', te: 'ప్రతి ఫైల్‌లో మీ బ్రాండ్.' } },
      { id: 'book-labels', model: 'label', name: { en: 'School book labels', hi: 'स्कूल बुक लेबल', te: 'స్కూల్ పుస్తక లేబుళ్లు' }, desc: { en: 'A SMART START TO EVERY TERM.', hi: 'हर किताब पर अपनी पहचान।', te: 'ప్రతి పుస్తకానికీ ప్రత్యేక గుర్తింపు.' } }
    ]
  },
  {
    id: 'promotion',
    name: { en: 'Marketing & promotional material', hi: 'मार्केटिंग और प्रचार सामग्री', te: 'మార్కెటింగ్ & ప్రమోషనల్ మెటీరియల్' },
    products: [
      { id: 'offset', model: 'offset', name: { en: 'Multi-color offset printing', hi: 'मल्टी-कलर ऑफ़सेट प्रिंटिंग', te: 'మల్టీ-కలర్ ఆఫ్‌సెట్ ప్రింటింగ్' }, desc: { en: 'COLOUR THAT MAKES AN IMPACT.', hi: 'रंग जो असर छोड़ें।', te: 'ప్రభావం చూపే రంగులు.' } },
      { id: 'brochures', model: 'brochure', name: { en: 'Physical brochures', hi: 'प्रिंटेड ब्रोशर', te: 'ప్రింటెడ్ బ్రోచర్లు' }, desc: { en: 'A GOOD STORY, IN YOUR HANDS.', hi: 'आपकी कहानी, हाथों में।', te: 'మీ కథ, మీ చేతుల్లో.' } },
      { id: 'pamphlets', model: 'pamphlet', name: { en: 'Pamphlets', hi: 'पैम्फलेट', te: 'పాంప్లెట్లు' }, desc: { en: 'A LITTLE PAPER. A LOT TO SAY.', hi: 'छोटा पन्ना, बड़ी बात।', te: 'చిన్న కాగితం. పెద్ద సందేశం.' } },
      { id: 'calendars', model: 'calendar', name: { en: 'Calendar printing', hi: 'कैलेंडर प्रिंटिंग', te: 'క్యాలెండర్ ప్రింటింగ్' }, desc: { en: 'STAY ON THEIR WALL ALL YEAR.', hi: 'साल भर नज़र में रहें।', te: 'ఏడాదంతా గుర్తుండండి.' } },
      { id: 'keychain', model: 'keychain', name: { en: 'Custom keychains', hi: 'कस्टम कीचेन', te: 'కస్టమ్ కీచెయిన్‌లు' }, desc: { en: 'SMALL OBJECT. BIG ENERGY.', hi: 'छोटी चीज़, बड़ी पहचान।', te: 'చిన్న వస్తువు. పెద్ద గుర్తింపు.' } },
      { id: 'bill-books', model: 'billbook', name: { en: 'Bill books', hi: 'बिल बुक', te: 'బిల్ బుక్స్' }, desc: { en: 'YOUR BRAND, EVERY TRANSACTION.', hi: 'हर बिल पर आपका ब्रांड।', te: 'ప్రతి బిల్లుపై మీ బ్రాండ్.' } }
    ]
  }
];

export const allProducts = serviceGroups.flatMap(group => group.products.map(product => ({ ...product, groupId: group.id })));

// Supplied examples shown beside each 3D mockup so visitors can compare the concept with a real print photo.
export const productReferences = {
  hoarding: './assets/hoarding-billboard-01.png',
  blacklight: './assets/hoarding-billboard-02.png',
  'auto-rickshaw': './assets/street-hoarding-03.png',
  'flex-vinyl': './assets/vinyl-banner.png',
  'flute-board': './assets/flex-banner.png',
  'one-way-vision': './assets/wide-format-printing.png',
  'wall-stickers': './assets/wide-format-printing.png',
  'id-cards': './assets/business-id-lanyard.png',
  'office-files': './assets/brochure-catalogues.png',
  'book-labels': './assets/school-id-cards.png',
  offset: './assets/offset-printing.png',
  brochures: './assets/brochure-folded-mockup.png',
  pamphlets: './assets/promotional-print-items.png',
  calendars: './assets/promotional-print-items.png',
  keychain: './assets/printed-keychain.png',
  'bill-books': './assets/offset-printing.png'
};
