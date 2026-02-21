import axios from 'axios';
import { cookies } from 'next/headers';

export const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function fetchLampBySlug(slug: string) {
  const token = cookies().get('token')?.value;

  const res = await apiServer.get(`/lamps/slug/${slug}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return res.data.data;
}