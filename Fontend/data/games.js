/*
  NovaStation — PS5 Game Store Data
  Fake dataset for homepage demonstration
*/
const gamesData = [
  {
    id: 1,
    title: "Marvel's Spider-Man 2",
    category: "Action",
    platform: "PS5",
    price: 49.99,
    originalPrice: 69.99,
    discount: 28,
    rating: 4.9,
    reviews: 2540,
    isNew: false, isFeatured: true, isSale: true, isHot: true,
    image: "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?w=400&auto=format&fit=crop&q=80",
    description: "Peter Parker and Miles Morales return for an exciting new adventure across Marvel's New York."
  },
  {
    id: 2,
    title: "Elden Ring: Shadow of the Erdtree",
    category: "RPG",
    platform: "PS5",
    price: 79.99,
    originalPrice: 79.99,
    discount: 0,
    rating: 5.0,
    reviews: 5120,
    isNew: true, isFeatured: true, isSale: false, isHot: true,
    image: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=400&auto=format&fit=crop&q=80",
    description: "Guided by Miquella, players explore the Land of Shadow — a massive new expansion."
  },
  {
    id: 3,
    title: "God of War Ragnarök",
    category: "Action",
    platform: "PS5",
    price: 39.99,
    originalPrice: 69.99,
    discount: 42,
    rating: 4.8,
    reviews: 3200,
    isNew: false, isFeatured: false, isSale: true, isHot: true,
    image: "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?w=400&auto=format&fit=crop&q=80",
    description: "Kratos and Atreus journey through the Nine Realms to face the Norse apocalypse."
  },
  {
    id: 4,
    title: "Gran Turismo 7",
    category: "Racing",
    platform: "PS5",
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    rating: 4.6,
    reviews: 1820,
    isNew: false, isFeatured: false, isSale: true, isHot: false,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&auto=format&fit=crop&q=80",
    description: "The Real Driving Simulator returns with 450+ cars and 90+ tracks."
  },
  {
    id: 5,
    title: "Resident Evil 4 Remake",
    category: "Action",
    platform: "PS5",
    price: 29.99,
    originalPrice: 59.99,
    discount: 50,
    rating: 4.9,
    reviews: 2900,
    isNew: false, isFeatured: false, isSale: true, isHot: true,
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80",
    description: "A complete reimagining of the survival horror classic. Leon returns to Europe."
  },
  {
    id: 6,
    title: "Final Fantasy VII Rebirth",
    category: "RPG",
    platform: "PS5",
    price: 69.99,
    originalPrice: 69.99,
    discount: 0,
    rating: 4.9,
    reviews: 4150,
    isNew: true, isFeatured: true, isSale: false, isHot: true,
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80",
    description: "Cloud and allies journey beyond Midgar in this massive open-world JRPG sequel."
  },
  {
    id: 7,
    title: "Hogwarts Legacy",
    category: "RPG",
    platform: "PS5",
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    rating: 4.7,
    reviews: 3800,
    isNew: false, isFeatured: false, isSale: true, isHot: false,
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&auto=format&fit=crop&q=80",
    description: "Open-world action RPG set in the wizarding world of Harry Potter."
  },
  {
    id: 8,
    title: "EA Sports FC 26",
    category: "Sports",
    platform: "PS5",
    price: 69.99,
    originalPrice: 69.99,
    discount: 0,
    rating: 4.3,
    reviews: 950,
    isNew: true, isFeatured: false, isSale: false, isHot: false,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&auto=format&fit=crop&q=80",
    description: "The world's game evolved with HyperMotion V technology."
  },
  {
    id: 9,
    title: "Horizon Forbidden West",
    category: "Adventure",
    platform: "PS5",
    price: 29.99,
    originalPrice: 49.99,
    discount: 40,
    rating: 4.8,
    reviews: 2100,
    isNew: false, isFeatured: false, isSale: true, isHot: true,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80",
    description: "Aloy explores the stunning Forbidden West in this open-world action adventure."
  },
  {
    id: 10,
    title: "Demon's Souls",
    category: "RPG",
    platform: "PS5",
    price: 34.99,
    originalPrice: 69.99,
    discount: 50,
    rating: 4.7,
    reviews: 1980,
    isNew: false, isFeatured: true, isSale: true, isHot: false,
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&auto=format&fit=crop&q=80",
    description: "The PS5 launch remake of the original FromSoftware classic, rebuilt from scratch."
  },
  {
    id: 11,
    title: "Returnal",
    category: "Action",
    platform: "PS5",
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    rating: 4.6,
    reviews: 1340,
    isNew: false, isFeatured: false, isSale: true, isHot: false,
    image: "https://images.unsplash.com/photo-1579621970795-87faff3f9050?w=400&auto=format&fit=crop&q=80",
    description: "A third-person shooter roguelike set on a hostile alien world."
  },
  {
    id: 12,
    title: "Ratchet & Clank: Rift Apart",
    category: "Action",
    platform: "PS5",
    price: 44.99,
    originalPrice: 69.99,
    discount: 35,
    rating: 4.8,
    reviews: 2200,
    isNew: false, isFeatured: false, isSale: true, isHot: false,
    image: "https://images.unsplash.com/photo-1614432938086-2ce9dad5a63e?w=400&auto=format&fit=crop&q=80",
    description: "A dimension-hopping adventure across vibrant worlds built for PS5."
  },
  {
    id: 13,
    title: "Ghost of Tsushima: Director's Cut",
    category: "Action",
    platform: "PS5",
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    rating: 4.9,
    reviews: 3100,
    isNew: false, isFeatured: true, isSale: true, isHot: true,
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&auto=format&fit=crop&q=80",
    description: "The definitive version of the samurai open-world epic with Iki Island expansion."
  },
  {
    id: 14,
    title: "NBA 2K26",
    category: "Sports",
    platform: "PS5",
    price: 69.99,
    originalPrice: 69.99,
    discount: 0,
    rating: 4.2,
    reviews: 780,
    isNew: true, isFeatured: false, isSale: false, isHot: false,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&auto=format&fit=crop&q=80",
    description: "The premier basketball simulation returns with new gameplay and updated rosters."
  },
  {
    id: 15,
    title: "Cyberpunk 2077: Phantom Liberty",
    category: "RPG",
    platform: "PS5",
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    rating: 4.8,
    reviews: 4800,
    isNew: false, isFeatured: false, isSale: true, isHot: true,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=80",
    description: "A spy-thriller expansion for Cyberpunk 2077 set in a new district of Night City."
  }
];

// Banner data for the 3-column banner section
const bannersData = [
  {
    id: "b1",
    tag: "Flash Sale",
    title: "God of War\nRagnarök",
    price: "$39.99",
    image: "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?w=600&auto=format&fit=crop&q=80",
    type: "side"
  },
  {
    id: "b2",
    tag: "🔥 Game of the Year",
    title: "Elden Ring: Shadow of the Erdtree",
    price: "$79.99",
    image: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=900&auto=format&fit=crop&q=80",
    type: "main"
  },
  {
    id: "b3",
    tag: "50% Off",
    title: "Resident Evil 4\nRemake",
    price: "$29.99",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    type: "side"
  }
];

if (typeof window !== 'undefined') {
  window.gamesData   = gamesData;
  window.bannersData = bannersData;
}
