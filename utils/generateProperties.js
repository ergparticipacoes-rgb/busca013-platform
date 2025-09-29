function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const cities = [
  { city: 'Santos', neighborhoods: ['Gonzaga', 'Ponta da Praia', 'Boqueirão', 'Aparecida', 'Embaré'] },
  { city: 'São Vicente', neighborhoods: ['Itararé', 'Centro', 'Boa Vista', 'Parque Bitaru'] },
  { city: 'Guarujá', neighborhoods: ['Pitangueiras', 'Astúrias', 'Enseada', 'Tombo'] },
  { city: 'Praia Grande', neighborhoods: ['Canto do Forte', 'Boqueirão', 'Guilhermina', 'Tupi'] },
  { city: 'Cubatão', neighborhoods: ['Jardim Casqueiro', 'Vila Nova', 'Jd. Anchieta'] },
  { city: 'Bertioga', neighborhoods: ['Centro', 'Riviera', 'Maitinga', 'Indaiá'] },
  { city: 'Mongaguá', neighborhoods: ['Centro', 'Vera Cruz', 'Jussara'] },
  { city: 'Itanhaém', neighborhoods: ['Centro', 'Cibratel', 'Belas Artes', 'Gaivota'] },
  { city: 'Peruíbe', neighborhoods: ['Centro', 'Balneário Flórida', 'Ribamar', 'Arpoador'] }
];

const types = ['Casa', 'Apartamento', 'Terreno', 'Comercial', 'Kitnet', 'Sobrado', 'Cobertura', 'Chácara'];

function generateProperty(i) {
  const c = rand(cities);
  const type = rand(types);
  const bedrooms = randInt(1, 5);
  const bathrooms = randInt(1, 4);
  const area = randInt(35, 320);
  const parking = randInt(0, 3);
  const price = area * (type === 'Apartamento' ? 5200 : 4500) + bedrooms * 12000 + bathrooms * 8000 + parking * 7000;
  const code = `BI013-${(1000 + i).toString()}`;
  const images = [
    `https://picsum.photos/seed/${code}a/800/500`,
    `https://picsum.photos/seed/${code}b/800/500`,
    `https://picsum.photos/seed/${code}c/800/500`
  ];
  return {
    code,
    title: `${type} em ${c.city} - ${rand(c.neighborhoods)}`,
    description: `Imóvel ${type.toLowerCase()} na região da Baixada Santista com ${bedrooms} quartos e ${bathrooms} banheiros, área de ${area}m².`,
    price,
    city: c.city,
    neighborhood: rand(c.neighborhoods),
    type,
    bedrooms,
    bathrooms,
    area,
    parking,
    images,
    whatsapp: '13999999999',
    flags: { featured: Math.random() < 0.2, active: true, demo: true }
  };
}

function generateProperties(n=240) {
  const arr = [];
  for (let i = 0; i < n; i++) arr.push(generateProperty(i));
  return arr;
}

module.exports = { generateProperties };