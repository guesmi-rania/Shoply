// @ts-nocheck
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: 'Sac Cuir Caramel',
    description: "Sac à main artisanal en cuir véritable couleur caramel. Doublure en soie, fermeture dorée.",
    price: 189,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    category: 'Accessoires'
  },
  {
    name: 'Sneakers Blanc Minimaliste',
    description: "Baskets en cuir nappa blanc, semelle en gomme naturelle. Design épuré, confort toute la journée.",
    price: 145,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    category: 'Chaussures'
  },
  {
    name: 'Montre Acier Noir',
    description: "Montre analogique cadran noir, boîtier inox brossé, bracelet cuir. Mouvement japonais. Étanche 50m.",
    price: 320,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    category: 'Montres'
  },
  {
    name: 'Parfum Oud & Rose',
    description: "Fragrance orientale aux notes de oud, rose de Damas et ambre. Longue tenue 12h. Flacon 50ml.",
    price: 95,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80',
    category: 'Beauté'
  },
  {
    name: 'Veste Lin Beige',
    description: "Veste légère en lin naturel, coupe oversize, poches plaquées. Fabrication artisanale tunisienne.",
    price: 112,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    category: 'Vetements'
  },
  {
    name: 'Lunettes Soleil Vintage',
    description: "Monture acétate tortoise, verres polarisés UV400. Style rétro années 70. Étui en cuir inclus.",
    price: 78,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80',
    category: 'Accessoires'
  },
  {
    name: 'Sac a Dos Urban Noir',
    description: "Sac à dos imperméable, compartiment laptop 15p, port USB intégré. Design épuré et fonctionnel.",
    price: 135,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    category: 'Accessoires'
  },
  {
    name: 'Creme Visage Argan Bio',
    description: "Crème hydratante à l'argan pur du Maroc, certifiée bio. Formule légère non grasse. 50ml.",
    price: 45,
    image: 'https://images.unsplash.com/photo-1556228720-da0e4a33e4a3?w=600&q=80',
    category: 'Beauté'
  },
  {
    name: 'Ceinture Cuir Tresse',
    description: "Ceinture en cuir tressé main, boucle laiton massif. Artisanat marocain. Longueur ajustable.",
    price: 58,
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80',
    category: 'Accessoires'
  },
  {
    name: 'Robe Soie Creme',
    description: "Robe midi en soie naturelle crème, col en V, coupe fluide et élégante. Tailles S à XL.",
    price: 210,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
    category: 'Vetements'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connecté');

    await Product.deleteMany({});
    console.log('🗑️  Anciens produits supprimés');

    var inserted = await Product.insertMany(products);
    console.log('✅ ' + inserted.length + ' produits insérés :');
    inserted.forEach(function(p) {
      console.log('  - ' + p.name + ' (' + p.price + ' DT)');
    });

    await mongoose.disconnect();
    console.log('\n🎉 Seed terminé !');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur:', err);
    process.exit(1);
  }
}

seed();