// Dados fictícios de demonstração, usados apenas para fins de portfólio.
// Nenhum dado real de cliente, barbeiro ou estabelecimento é utilizado.

export const APPBARBER_URL = "https://exemplo-barbearia.com.br/agendamento";
export const WHATSAPP_BASE = "https://wa.me/5511999999999";

export function whatsappLink(message: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

export interface Service {
  name: string;
  price: number;
  priceFrom?: boolean;
  duration: number;
}

export const SERVICES: Service[] = [
  { name: "Corte + Barba (Barbaterapia)", price: 100, duration: 60 },
  { name: "Corte Completo", price: 50, priceFrom: true, duration: 60 },
  {
    name: "Barba (Barbaterapia com toalha quente)",
    price: 50,
    priceFrom: true,
    duration: 60,
  },
  { name: "Corte Simples (só máquina, pente único)", price: 30, duration: 30 },
  { name: "Barba Simples (só alinhar com máquina)", price: 30, duration: 60 },
  { name: "Corte + Barba Simples", price: 80, duration: 60 },
  { name: "Corte Simples + Barba", price: 80, priceFrom: true, duration: 60 },
  {
    name: "Corte Simples + Barba Simples",
    price: 60,
    priceFrom: true,
    duration: 60,
  },
  { name: "Corte + Relaxamento", price: 90, priceFrom: true, duration: 60 },
  { name: "Corte + Progressiva", price: 120, priceFrom: true, duration: 120 },
  { name: "Corte + Sobrancelha", price: 60, duration: 60 },
  { name: "Depilação Nariz", price: 20, duration: 30 },
  { name: "Hidratação", price: 20, priceFrom: true, duration: 30 },
  { name: "Relaxamento", price: 40, priceFrom: true, duration: 30 },
  { name: "Selagem", price: 70, priceFrom: true, duration: 30 },
  { name: "Sobrancelha", price: 15, duration: 30 },
];

export interface Package {
  name: string;
  price: number;
  description: string;
}

export const PACKAGES: Package[] = [
  {
    name: "4 Barbas Completas",
    price: 150,
    description: "4 sessões de barbaterapia completa, com toalha quente.",
  },
  {
    name: "4 Cortes",
    price: 150,
    description: "4 cortes de cabelo para usar quando quiser.",
  },
  {
    name: "Pacote Corte + Barba",
    price: 250,
    description:
      "4 cortes de cabelo, 4 barbas completas, mais sobrancelha e hidratação de cortesia. Dia e horário sujeitos à disponibilidade — fale com a gente para combinar.",
  },
];

export const PROFESSIONALS = ["Carlos", "Eduardo", "Felipe", "Gabriel"];

export interface Review {
  name: string;
  date: string;
  stars: number;
  comment?: string;
}

// Avaliações fictícias, usadas apenas para ilustrar o layout desta demo.
export const REVIEWS: Review[] = [
  {
    name: "Cliente A.",
    date: "11/04/2025",
    stars: 5,
    comment: "Ótimo atendimento, profissionais excelentes!",
  },
  { name: "Cliente B.", date: "02/03/2026", stars: 5 },
  { name: "Cliente C.", date: "06/02/2025", stars: 5 },
  { name: "Cliente D.", date: "28/07/2024", stars: 5 },
  { name: "Cliente E.", date: "08/07/2024", stars: 5 },
  { name: "Cliente F.", date: "21/05/2024", stars: 5 },
  { name: "Cliente G.", date: "18/04/2024", stars: 5 },
];

export const AMENITIES = [
  { icon: "📶", label: "Wi-fi" },
  { icon: "🚗", label: "Estacionamento" },
  { icon: "♿", label: "Acessibilidade" },
  { icon: "🧒", label: "Atende crianças" },
];

export const PAYMENT_METHODS = [
  "Dinheiro",
  "Cartão de Crédito",
  "Cartão de Débito",
  "PIX",
];

export interface HoursRow {
  day: string;
  ranges: string[];
}

export const HOURS: HoursRow[] = [
  { day: "Terça-feira", ranges: ["09:00 - 11:00", "13:00 - 19:00"] },
  { day: "Quarta-feira", ranges: ["09:00 - 11:00", "13:00 - 19:00"] },
  { day: "Quinta-feira", ranges: ["09:00 - 11:00", "13:00 - 19:00"] },
  { day: "Sexta-feira", ranges: ["09:00 - 11:00", "13:00 - 20:00"] },
  { day: "Sábado", ranges: ["08:00 - 11:00", "13:00 - 17:00"] },
];

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
