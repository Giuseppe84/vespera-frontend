// lib/query-lamps.ts
import axios from 'axios';
import { Lamp } from '@/types/lamp';

export async function fetchLamps(): Promise<Lamp[]> {
  // 1. Recupero dell'URL dell'API
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Debug (rimuovilo in produzione): ti dirà subito se la variabile è vuota
  if (!apiUrl) {
    console.error("ERRORE: NEXT_PUBLIC_API_URL non è definita nel file .env");
  }

  let token: string | undefined;

  // 2. Gestione asincrona dei cookies (Fix per Next.js 15+)
  if (typeof window === 'undefined') {
    // Siamo sul SERVER (SSR / Prefetch)
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      token = cookieStore.get('token')?.value;
    } catch (e) {
      console.error("Errore nell'accesso ai cookies lato server", e);
    }
  }

  // 3. Chiamata Axios con URL assoluto garantito
  // Se apiUrl è undefined, axios fallirà esplicitamente invece di chiamare localhost
  const res = await axios.get(`${apiUrl}/lamps`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return res.data;
}