import { siteConfig } from './site-config.js';
import { translations } from './translations.js';

const digitsOnly = value => value.replace(/\D/g, '');

export function buildInquiryMessage(values = {}, language = 'en') {
  const t = translations[language]?.whatsapp || translations.en.whatsapp;
  const lines = [
    t.intro,
    '',
    `${t.name}: ${values.name?.trim() || t.missing}`,
    `${t.service}: ${values.service?.trim() || t.missing}`
  ];
  if (values.quantity?.trim()) lines.push(`${t.quantity}: ${values.quantity.trim()}`);
  if (values.timeline?.trim()) lines.push(`${t.timeline}: ${values.timeline.trim()}`);
  if (values.notes?.trim()) lines.push(`${t.details}: ${values.notes.trim()}`);
  return lines.join('\n');
}

export function whatsappUrl(message) {
  return `https://wa.me/${digitsOnly(siteConfig.whatsapp)}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message) {
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
}
