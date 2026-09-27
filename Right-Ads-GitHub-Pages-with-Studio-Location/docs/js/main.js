import { siteConfig } from './site-config.js';
import { buildInquiryMessage, openWhatsApp } from './whatsapp.js';
import { mountProductViewer } from './product-viewer.js';
import { translations } from './translations.js';
import { allProducts, productReferences, serviceGroups } from './catalog.js';

let savedLanguage = 'en';
try { savedLanguage = localStorage.getItem('rightAdsLanguage') || 'en'; } catch {}
let currentLanguage = savedLanguage;
if (!translations[currentLanguage]) currentLanguage = 'en';
const languageButtons = [...document.querySelectorAll('[data-language]')];

function setHtml(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.innerHTML = value;
}

function setLabelText(label, value) {
  const textNode = [...label.childNodes].find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
  if (textNode) textNode.textContent = ` ${value} `;
}

function serviceName(id, language = currentLanguage) {
  return allProducts.find(product => product.id === id)?.name[language] || id;
}

function updateProductReference(id, language = currentLanguage) {
  const product = allProducts.find(item => item.id === id);
  if (!product) return;
  const imagePath = productReferences[id] || './assets/hoarding-billboard-01.png';
  const label = translations[language].voice.reference;
  const image = document.querySelector('#product-reference-image');
  const fallbackImage = document.querySelector('#fallback-product-image');
  image.src = imagePath;
  image.alt = `${label}: ${product.name[language]}`;
  document.querySelector('#product-reference-label').textContent = label;
  document.querySelector('#product-reference-name').textContent = product.name[language];
  fallbackImage.src = imagePath;
  document.querySelector('#fallback-product-title').textContent = `${product.name[language].toLocaleUpperCase(language)} · ${label.toLocaleUpperCase(language)}`;
}

function populateFormOptions(t) {
  const serviceSelect = document.querySelector('[name="service"]');
  serviceSelect.innerHTML = `<option value="" disabled selected>${t.form.servicePrompt || t.form.labels[1]}</option>`;
  serviceGroups.forEach(group => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = group.name[currentLanguage];
    group.products.forEach(product => {
      const option = document.createElement('option');
      option.value = product.id;
      option.textContent = product.name[currentLanguage];
      optgroup.append(option);
    });
    serviceSelect.append(optgroup);
  });

  const timeline = document.querySelector('[name="timeline"]');
  timeline.innerHTML = `<option value="" selected>${t.form.timelinePlaceholder}</option>`;
  ['asap', 'twoWeeks', 'month', 'planning'].forEach((value, index) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = t.form.timeline[index];
    timeline.append(option);
  });
}

function populatePreviewOptions(language) {
  const picker = document.querySelector('#product-select');
  const selected = picker.value || 'blacklight';
  picker.replaceChildren();
  serviceGroups.forEach(group => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = group.name[language];
    group.products.forEach(product => {
      const option = document.createElement('option');
      option.value = product.id;
      option.textContent = product.name[language];
      optgroup.append(option);
    });
    picker.append(optgroup);
  });
  picker.value = selected;
  const product = allProducts.find(item => item.id === picker.value);
  if (product) {
    document.querySelector('#product-name').textContent = product.name[language];
    document.querySelector('#product-desc').textContent = product.desc[language];
    document.querySelector('#product-number').textContent = String(allProducts.indexOf(product) + 1).padStart(2, '0');
    updateProductReference(product.id, language);
  }
}

function applyLanguage(language, persist = true) {
  if (!translations[language]) language = 'en';
  currentLanguage = language;
  const t = translations[language];
  document.documentElement.lang = t.lang;
  document.title = t.pageTitle;
  if (persist) { try { localStorage.setItem('rightAdsLanguage', language); } catch {} }
  languageButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));

  setHtml('#announce-main', t.announcement[0]);
  setHtml('#announce-side', t.announcement[1]);
  document.querySelectorAll('.main-nav a').forEach((link, i) => { link.textContent = t.nav[i]; });
  document.querySelector('.main-nav').setAttribute('aria-label', t.nav[0]);
  document.querySelector('.header-cta span').textContent = t.headerCall;
  document.querySelector('.menu-toggle').setAttribute('aria-label', t.menu);

  const heroEyebrows = document.querySelectorAll('.hero-copy .eyebrow span:not(.eyebrow-line)');
  heroEyebrows[0].textContent = t.hero.eyebrow;
  heroEyebrows[1].textContent = t.hero.eyebrowEnd;
  setHtml('.hero h1', t.hero.title);
  document.querySelector('.hero-lede').textContent = t.hero.lede;
  document.querySelector('#compat-note').textContent = t.hero.compat;
  setHtml('.hero-actions .button', `${t.hero.start} <span>↗</span>`);
  setHtml('.hero-actions .text-link', `<span class="phone-icon">↗</span> ${t.hero.call}`);
  document.querySelector('.hero-foot > span:not(.hero-index)').innerHTML = t.hero.team;
  document.querySelector('.hero-index').textContent = t.hero.scroll;
  document.querySelector('.hero-stage').setAttribute('aria-label', t.hero.picker);
  document.querySelector('.stage-topline > span:first-child').innerHTML = `<i class="live-dot"></i> ${t.hero.live}`;
  document.querySelector('.stage-topline > span:last-child').textContent = t.hero.rotate;
  document.querySelector('#product-picker-label').textContent = t.hero.picker;
  document.querySelector('#product-select').setAttribute('aria-label', t.hero.picker);
  populatePreviewOptions(language);
  document.querySelector('.viewer-loading > span:last-child').textContent = t.hero.loading;
  document.querySelector('.stage-stamp').innerHTML = t.hero.stamp;
  document.querySelectorAll('.ticker-track > span').forEach((item, i) => { item.textContent = t.ticker[i]; });

  const serviceHeading = document.querySelector('#services .section-heading');
  const serviceEyebrows = serviceHeading.querySelectorAll('.eyebrow span:not(.eyebrow-line)');
  serviceEyebrows[0].textContent = t.services.eyebrow;
  serviceEyebrows[1].textContent = t.services.eyebrowEnd;
  setHtml('#services .section-heading h2', t.services.title);
  serviceHeading.querySelector(':scope > p').textContent = t.services.intro;
  document.querySelectorAll('.service-card').forEach((card, index) => {
    card.querySelector('h3').innerHTML = t.services.cards[index];
    card.querySelector('ul').innerHTML = t.services.items[index].map(item => `<li>${item}</li>`).join('');
    card.querySelector('.art-label').textContent = `${String(index + 1).padStart(2, '0')} / ${serviceGroups[index].name[language].toLocaleUpperCase(language)}`;
  });
  document.querySelector('.service-note-prefix').textContent = t.services.note;
  document.querySelector('.service-note a').innerHTML = `${t.services.noteLink} <span>↗</span>`;

  const process = document.querySelector('#process');
  process.querySelector('.eyebrow span').textContent = t.process.eyebrow;
  process.querySelector('.process-intro h2').innerHTML = t.process.title;
  process.querySelector('.process-intro p').textContent = t.process.intro;
  process.querySelectorAll('.process-step').forEach((step, index) => {
    step.querySelector('h3').innerHTML = t.process.steps[index][0];
    step.querySelector('p').textContent = t.process.steps[index][1];
    step.querySelector('.step-link').innerHTML = `${t.process.steps[index][2]} <b>↗</b>`;
  });

  const gallery = document.querySelector('#work');
  const galleryEyebrows = gallery.querySelectorAll('.eyebrow span:not(.eyebrow-line)');
  galleryEyebrows[0].textContent = t.gallery.eyebrow;
  galleryEyebrows[1].textContent = t.gallery.eyebrowEnd;
  gallery.querySelector('h2').innerHTML = t.gallery.title;
  gallery.querySelector('.work-link').innerHTML = `${t.gallery.cta} <span>↗</span>`;
  gallery.querySelectorAll('.reference-grid figure').forEach((figure, index) => {
    figure.querySelector('figcaption').textContent = t.gallery.captions[index];
    figure.querySelector('img').alt = t.gallery.captions[index];
  });
  gallery.querySelector('.portfolio-hint').innerHTML = `<span>↗</span> ${t.gallery.note}`;

  const studioLocation = document.querySelector('#location');
  const locationEyebrows = studioLocation.querySelectorAll('.eyebrow span:not(.eyebrow-line)');
  locationEyebrows[0].textContent = t.location.eyebrow[0];
  locationEyebrows[1].textContent = t.location.eyebrow[1];
  studioLocation.querySelector('#location-title').innerHTML = t.location.title;
  studioLocation.querySelector('#location-intro').textContent = t.location.intro;
  studioLocation.querySelector('#location-address-label').textContent = t.location.address;
  studioLocation.querySelector('#location-code-label').textContent = t.location.code;
  studioLocation.querySelector('#map-google').innerHTML = `${t.location.google} <span>↗</span>`;
  studioLocation.querySelector('#map-apple').innerHTML = `${t.location.apple} <span>↗</span>`;
  const inquiry = document.querySelector('#inquiry');
  const inquiryEyebrows = inquiry.querySelectorAll('.eyebrow span:not(.eyebrow-line)');
  inquiryEyebrows[0].textContent = t.form.eyebrow;
  inquiryEyebrows[1].textContent = t.form.eyebrowEnd;
  inquiry.querySelector('.inquiry-copy h2').innerHTML = t.form.title;
  inquiry.querySelector('.inquiry-copy > p').textContent = t.form.intro;
  inquiry.querySelector('.inquiry-callout > span').textContent = t.form.callout;
  inquiry.querySelector('.inquiry-callout a').innerHTML = `${t.form.call} <b>↗</b>`;
  const form = document.querySelector('#inquiry-form');
  form.querySelector('.form-topline span:first-child').textContent = t.form.top;
  form.querySelector('.form-topline span:last-child').textContent = t.form.helper;
  form.querySelectorAll('label').forEach((label, index) => setLabelText(label, t.form.labels[index]));
  form.querySelectorAll('.optional').forEach(item => { item.textContent = t.form.optional; });
  form.querySelector('[name="name"]').placeholder = t.form.namePlaceholder;
  form.querySelector('[name="quantity"]').placeholder = t.form.quantityPlaceholder;
  form.querySelector('[name="notes"]').placeholder = t.form.notesPlaceholder;
  populateFormOptions(t);
  form.querySelector('[type="submit"]').innerHTML = `${t.form.submit} <span>↗</span>`;
  document.querySelector('#copy-brief').textContent = t.form.copy;
  document.querySelector('.form-privacy').textContent = t.form.privacy;
  document.querySelector('.form-feedback').textContent = '';

  document.querySelector('.footer-tagline').innerHTML = t.footer.tagline;
  document.querySelector('#closing-eyebrow').textContent = t.closing.eyebrow;
  document.querySelector('#closing-note').textContent = t.closing.note;
  document.querySelector('.footer-contact > span').textContent = t.footer.contact;
  document.querySelector('.footer-contact [data-call]').innerHTML = `${t.footer.call} <b>↗</b>`;
  document.querySelector('.footer-contact [data-whatsapp]').innerHTML = `${t.footer.whatsapp} <b>↗</b>`;
  document.querySelector('.footer-social > span').textContent = t.footer.social;
  document.querySelector('.footer-bottom span:nth-child(2)').textContent = t.footer.bottom;
  document.querySelector('.footer-bottom a').textContent = `${t.footer.back} ↑`;
  document.querySelector('.floating-whatsapp > span:last-child').textContent = t.footer.whatsapp;
  document.querySelector('.floating-whatsapp').setAttribute('aria-label', t.footer.whatsapp);
  const voice = t.voice;
  document.querySelector('.voice-assistant').setAttribute('aria-label', voice.kicker);
  document.querySelector('#voice-toggle').setAttribute('aria-label', voice.toggle);
  document.querySelector('#voice-kicker').textContent = voice.kicker;
  document.querySelector('#voice-title').textContent = voice.title;
  document.querySelector('#voice-description').textContent = voice.description;
  document.querySelector('#voice-instructions').textContent = voice.instructions;
  document.querySelector('#voice-examples').textContent = voice.examples;
  document.querySelector('#voice-toggle-label').textContent = voice.toggle;
  document.querySelector('#voice-speak-label').textContent = voice.speak;
  document.querySelector('#voice-listen-label').textContent = voice.listen;
  document.querySelector('#voice-close').setAttribute('aria-label', voice.close);
  document.querySelector('#voice-stop').setAttribute('aria-label', voice.stop);
  document.querySelector('#voice-services').textContent = voice.showServices;
  document.querySelector('#voice-3d').textContent = voice.show3d;
  document.querySelector('#voice-work').textContent = voice.showGallery;
  document.querySelector('#voice-whatsapp').textContent = voice.showWhatsApp;
  document.querySelector('#voice-call').textContent = `${voice.call} ↗`;
  document.querySelector('#voice-status').textContent = voice.statusReady;
  document.dispatchEvent(new CustomEvent('rightads:language-change', { detail: { language } }));
}

const voicePanel = document.querySelector('#voice-panel');
const voiceToggle = document.querySelector('#voice-toggle');
const voiceStatus = document.querySelector('#voice-status');
const languageSpeechTag = { en: 'en-IN', hi: 'hi-IN', te: 'te-IN' };
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let voiceRecognition = null;

function setVoicePanel(open) {
  voicePanel.hidden = !open;
  voiceToggle.setAttribute('aria-expanded', String(open));
  if (open) voiceStatus.textContent = translations[currentLanguage].voice.statusReady;
}

function speechVoicesReady() {
  const synth = window.speechSynthesis;
  const initial = synth.getVoices();
  if (initial.length) return Promise.resolve(initial);
  return new Promise(resolve => {
    let timer;
    const finish = () => {
      clearTimeout(timer);
      synth.removeEventListener?.('voiceschanged', finish);
      resolve(synth.getVoices());
    };
    synth.addEventListener?.('voiceschanged', finish, { once: true });
    timer = setTimeout(finish, 1200);
  });
}

async function speakGuide() {
  const language = currentLanguage;
  const voice = translations[language].voice;
  if (!('speechSynthesis' in window)) {
    voiceStatus.textContent = voice.statusSpeechUnsupported;
    return;
  }
  window.speechSynthesis.cancel();
  voiceStatus.textContent = voice.statusSpeaking;
  const availableVoices = await speechVoicesReady();
  if (currentLanguage !== language) return;
  const languageCode = languageSpeechTag[language].toLowerCase();
  const matchingVoice = availableVoices.find(item => item.lang.toLowerCase() === languageCode)
    || availableVoices.find(item => item.lang.toLowerCase().startsWith(`${language}-`));
  if (!matchingVoice && language !== 'en') {
    voiceStatus.textContent = voice.statusVoiceUnavailable;
    return;
  }
  const utterance = new SpeechSynthesisUtterance(voice.guide);
  utterance.lang = languageSpeechTag[language];
  if (matchingVoice) utterance.voice = matchingVoice;
  utterance.rate = 0.94;
  utterance.onend = () => { voiceStatus.textContent = translations[currentLanguage].voice.statusReady; };
  utterance.onerror = event => {
    const message = ['language-unavailable', 'voice-unavailable'].includes(event.error)
      ? translations[currentLanguage].voice.statusVoiceUnavailable
      : translations[currentLanguage].voice.statusSpeechUnsupported;
    voiceStatus.textContent = message;
  };
  window.speechSynthesis.speak(utterance);
}
function handleVoiceCommand(rawText) {
  const value = rawText.toLocaleLowerCase().normalize('NFC').replace(/[-_.,!?]/g, ' ').replace(/\s+/g, ' ').trim();
  const t = translations[currentLanguage].voice;
  voiceStatus.textContent = `${t.statusHeard}${rawText}`;
  const includes = (...words) => words.some(word => value.includes(word));
  if (includes('whatsapp', 'what s app', 'व्हाट्सऐप', 'व्हाट्सएप', 'वाट्सअप', 'వాట్సాప్')) {
    openWhatsApp(translations[currentLanguage].whatsapp.intro);
    return true;
  }
  if (includes('call', 'phone', 'कॉल', 'फोन', 'ఫోన్', 'కాల్')) {
    location.href = `tel:${siteConfig.phone}`;
    return true;
  }
  if (includes('service', 'सेवा', 'सर्विस', 'सेवाएँ', 'सेवाएं', 'seva', 'sevalu', 'సేవ', 'సేవలు')) {
    location.hash = 'services';
    return true;
  }
  if (includes('gallery', 'portfolio', 'work', 'तस्वीर', 'गैलरी', 'काम', 'గ్యాలరీ', 'చిత్ర', 'పని')) {
    location.hash = 'work';
    return true;
  }
  const productAliases = {
    hoarding: ['hoarding', 'hoardings', 'billboard', 'बिलबोर्ड', 'होर्डिंग', 'హోర్డింగ్'],
    blacklight: ['blacklight', 'black light', 'ब्लैकलाइट', 'ब्लैक लाइट', 'బ్లాక్‌లైట్', 'బ్లాక్ లైట్'],
    'auto-rickshaw': ['auto rickshaw', 'rickshaw ad', 'ऑटो रिक्शा', 'ఆటో రిక్షా'],
    'flex-vinyl': ['flex', 'vinyl', 'banner', 'फ्लेक्स', 'विनाइल', 'బ్యానర్', 'ఫ్లెక్స్', 'వినైల్'],
    'flute-board': ['flute board', 'flute boards', 'फ्लूट बोर्ड', 'फ्लूट', 'ఫ్లూట్ బోర్డు'],
    'one-way-vision': ['one way vision', 'oneway', 'वन वे विजन', 'वन-वे विज़न', 'వన్ వే విజన్', 'వన్ వే'],
    'wall-stickers': ['wall sticker', 'wall stickers', 'wall art', 'वॉल स्टिकर', 'दीवार स्टिकर', 'వాల్ స్టిక్కర్', 'గోడ స్టిక్కర్'],
    'id-cards': ['id card', 'id cards', 'identity card', 'पहचान पत्र', 'आईडी कार्ड', 'ఐడి కార్డు'],
    'office-files': ['office file', 'office files', 'ऑफिस फाइल', 'ऑफिस फ़ाइल', 'ఆఫీస్ ఫైల్'],
    'book-labels': ['book label', 'school label', 'किताब का लेबल', 'बुक लेबल', 'स्कूल लेबल', 'బుక్ లేబుల్', 'పుస్తక లేబుల్'],
    offset: ['offset printing', 'offset', 'ऑफसेट', 'आफसेट', 'ఆఫ్‌సెట్', 'ఆఫ్సెట్'],
    brochures: ['brochure', 'brochures', 'ब्रोशर', 'బ్రోచర్', 'బ్రోచర్లు'],
    pamphlets: ['pamphlet', 'pamphlets', 'पैम्फलेट', 'पर्चा', 'పాంప్లెట్', 'కరపత్రం'],
    calendars: ['calendar', 'calendars', 'कैलेंडर', 'క్యాలెండర్'],
    keychain: ['keychain', 'key chain', 'keychains', 'कीचेन', 'चाबी का छल्ला', 'కీచెయిన్', 'కీ చైన్'],
    'bill-books': ['bill book', 'bill books', 'बिल बुक', 'रसीद बुक', 'బిల్ బుక్', 'బిల్లు పుస్తకం']
  };
  const spokenProduct = allProducts.find(item => {
    const aliases = [...Object.values(item.name), ...(productAliases[item.id] || [])];
    return aliases.some(name => value.includes(name.toLocaleLowerCase().normalize('NFC').replace(/[-_.,!?]/g, ' ').replace(/\s+/g, ' ').trim()));
  });
  if (spokenProduct) {
    const picker = document.querySelector('#product-select');
    picker.value = spokenProduct.id;
    picker.dispatchEvent(new Event('change', { bubbles: true }));
    location.hash = 'top';
    return true;
  }
  if (includes('3d', 'three d', 'three dimensional', 'थ्री डी', 'तीन डी', 'త్రి డి', '3డి')) {
    location.hash = 'top';
    return true;
  }
  voiceStatus.textContent = t.statusNoMatch;
  return false;
}

voiceToggle.addEventListener('click', () => setVoicePanel(voicePanel.hidden));
document.querySelector('#voice-close').addEventListener('click', () => setVoicePanel(false));
document.querySelector('#voice-speak').addEventListener('click', speakGuide);
document.querySelector('#voice-stop').addEventListener('click', () => {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  try { voiceRecognition?.stop(); } catch {}
  voiceStatus.textContent = translations[currentLanguage].voice.statusReady;
});
document.querySelector('#voice-listen').addEventListener('click', () => {
  const voice = translations[currentLanguage].voice;
  if (!Recognition) {
    voiceStatus.textContent = voice.statusUnsupported;
    return;
  }
  if (!voiceRecognition) {
    voiceRecognition = new Recognition();
    voiceRecognition.interimResults = false;
    voiceRecognition.maxAlternatives = 5;
    voiceRecognition.onstart = () => { voiceStatus.textContent = translations[currentLanguage].voice.statusListening; };
    voiceRecognition.onresult = event => {
      const alternatives = Array.from(event.results?.[0] || [], result => result.transcript).filter(Boolean);
      if (!alternatives.some(handleVoiceCommand)) voiceStatus.textContent = translations[currentLanguage].voice.statusNoMatch;
    };
    voiceRecognition.onnomatch = () => { voiceStatus.textContent = translations[currentLanguage].voice.statusNoMatch; };
    voiceRecognition.onerror = event => {
      const errors = { 'no-speech': 'statusNoSpeech', 'not-allowed': 'statusPermission', 'service-not-allowed': 'statusPermission', network: 'statusNetwork', 'audio-capture': 'statusMicrophone', 'language-not-supported': 'statusLanguageUnsupported', 'language-unavailable': 'statusLanguageUnsupported' };
      voiceStatus.textContent = translations[currentLanguage].voice[errors[event.error] || 'statusError'];
    };
    voiceRecognition.onend = () => {
      if (voiceStatus.textContent === translations[currentLanguage].voice.statusListening) voiceStatus.textContent = translations[currentLanguage].voice.statusReady;
    };
  }
  voiceRecognition.lang = languageSpeechTag[currentLanguage];
  voiceStatus.textContent = voice.statusListening;
  try { voiceRecognition.start(); } catch { voiceStatus.textContent = voice.statusError; }
});
document.querySelectorAll('[data-voice-command]').forEach(button => button.addEventListener('click', () => {
  handleVoiceCommand(button.dataset.voiceCommand);
  if (button.dataset.voiceCommand !== 'whatsapp') setVoicePanel(false);
}));
function formServiceValue() {
  return document.querySelector('[name="service"]')?.value || '';
}

document.querySelectorAll('[data-call]').forEach(link => {
  link.href = `tel:${siteConfig.phone}`;
  link.setAttribute('aria-label', `Call ${siteConfig.businessName}`);
});
document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.href = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`;
  link.addEventListener('click', event => {
    event.preventDefault();
    const selectedService = formServiceValue();
    openWhatsApp(buildInquiryMessage({
      name: document.querySelector('[name="name"]').value,
      service: selectedService ? serviceName(selectedService) : translations[currentLanguage].whatsapp.generic
    }, currentLanguage));
  });
});
document.querySelectorAll('[data-social]').forEach(link => {
  const url = siteConfig.social[link.dataset.social];
  if (url) link.href = url;
  else {
    link.href = '#';
    link.title = `Add the ${link.dataset.social} profile URL in js/site-config.js`;
    link.addEventListener('click', event => event.preventDefault());
  }
});
document.querySelectorAll('[data-service-image]').forEach(image => {
  const configuredPath = siteConfig.serviceImages[image.dataset.serviceImage];
  if (configuredPath) image.src = configuredPath;
});
document.querySelector('#year').textContent = new Date().getFullYear();

const form = document.querySelector('#inquiry-form');
const feedback = document.querySelector('#form-feedback');
const valuesFromForm = () => Object.fromEntries(new FormData(form).entries());
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const values = valuesFromForm();
  values.service = serviceName(values.service);
  openWhatsApp(buildInquiryMessage(values, currentLanguage));
  feedback.textContent = translations[currentLanguage].form.sent;
});
document.querySelector('#copy-brief').addEventListener('click', async () => {
  const message = buildInquiryMessage(valuesFromForm());
  try {
    await navigator.clipboard.writeText(message);
    feedback.textContent = translations[currentLanguage].form.copied;
  } catch {
    const field = document.createElement('textarea');
    field.value = message;
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.append(field);
    field.select();
    document.execCommand('copy');
    field.remove();
    feedback.textContent = translations[currentLanguage].form.copied;
  }
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

languageButtons.forEach(button => button.addEventListener('click', () => applyLanguage(button.dataset.language)));
document.querySelector('#product-select').addEventListener('change', event => {
  const product = allProducts.find(item => item.id === event.target.value);
  if (!product) return;
  document.querySelector('#product-name').textContent = product.name[currentLanguage];
  document.querySelector('#product-desc').textContent = product.desc[currentLanguage];
  document.querySelector('#product-number').textContent = String(allProducts.indexOf(product) + 1).padStart(2, '0');
  updateProductReference(product.id, currentLanguage);
});
applyLanguage(currentLanguage, false);

mountProductViewer(document.querySelector('#product-viewer'));
