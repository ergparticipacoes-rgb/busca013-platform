const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export async function apiGet(path, params={}){
  const url = new URL(API + path);
  Object.entries(params).forEach(([k,v])=> v!=null && url.searchParams.set(k, v));
  const res = await fetch(url);
  if(!res.ok) throw new Error('Erro ao comunicar com API');
  return res.json();
}
export async function apiPost(path, body){
  const res = await fetch(API + path, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
  if(!res.ok) throw new Error('Erro ao enviar');
  return res.json();
}
export async function apiDelete(path){
  const res = await fetch(API + path, { method:'DELETE' });
  if(!res.ok) throw new Error('Erro ao excluir');
  return res.json();
}