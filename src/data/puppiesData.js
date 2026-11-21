// ============================================================
// PebblePups U.A.E. — Data extracted from reference HTML files
// ============================================================

export const WHATSAPP_NUMBER = '971500000000';

export const getWhatsAppLink = (message = '') => {
  const encoded = encodeURIComponent(message || "Hi PebblePups! I'd love to know more about your puppies.");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};

export const getPuppyWhatsAppLink = (puppy) => {
  const msg = `Hi PebblePups! I'm interested in ${puppy.name ? puppy.name + ', ' : ''}the ${puppy.breed} (${puppy.gender}, ${puppy.age}). Could you share more details?`;
  return getWhatsAppLink(msg);
};

// Media base URL from original site
const MEDIA = 'https://puppy.instabizweb.com/media';

export const puppies = [
  {
    id: 'maltipoo-max-male',
    name: 'Max',
    breed: 'Maltipoo',
    gender: 'boy',
    age: '3 months',
    hasVideo: true,
    status: 'available',
    type: 'imported',
    image: `${MEDIA}/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp`,
    objectPosition: '53.8% 44.3%',
    bgColor: '#785838',
  },
  {
    id: 'korean-teacup-maltipoo-female',
    name: 'Korean Teacup Maltipoo',
    breed: 'Maltipoo',
    gender: 'girl',
    age: '2 months',
    hasVideo: true,
    status: 'available',
    type: 'korean-teacup',
    image: `${MEDIA}/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg`,
    objectPosition: '50% 30%',
    bgColor: '#6b4a2a',
  },
  {
    id: 'korean-teacup-poodle-female',
    name: 'Korean Teacup Poodle',
    breed: 'Poodle',
    gender: 'girl',
    age: '2 months',
    hasVideo: false,
    status: 'available',
    type: 'korean-teacup',
    image: `${MEDIA}/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg`,
    objectPosition: '50% 40%',
    bgColor: '#8b5e3c',
  },
  {
    id: 'maltipoo-cavapoo-male',
    name: 'Maltipoo & Cavapoo',
    breed: 'Maltipoo',
    gender: 'boy',
    age: '3 months Maltipoo & 2 months Cavapoo',
    hasVideo: true,
    status: 'available',
    type: 'imported',
    image: `${MEDIA}/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg`,
    objectPosition: '50% 35%',
    bgColor: '#7a5030',
  },
  {
    id: 'toy-poodle',
    name: 'Toy Poodle',
    breed: 'Poodle',
    gender: 'boy',
    age: '2 months',
    hasVideo: false,
    status: 'available',
    type: 'imported',
    image: `${MEDIA}/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg`,
    objectPosition: '50% 40%',
    bgColor: '#6e4825',
  },
  {
    id: 'maltipoo-female',
    name: 'Maltipoo',
    breed: 'Maltipoo',
    gender: 'girl',
    age: '2 months',
    hasVideo: false,
    status: 'available',
    type: 'imported',
    image: `${MEDIA}/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg`,
    objectPosition: '50% 35%',
    bgColor: '#8c6540',
  },
  {
    id: 'pomeranian-female',
    name: 'Pomeranian',
    breed: 'Pomeranian',
    gender: 'girl',
    age: '3 months',
    hasVideo: false,
    status: 'available',
    type: 'imported',
    image: `${MEDIA}/3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg`,
    objectPosition: '50% 40%',
    bgColor: '#c8a060',
  },
  {
    id: 'cavapoo-copper-male',
    name: 'Copper',
    breed: 'Cavapoo',
    gender: 'boy',
    age: '2 months',
    hasVideo: false,
    status: 'available',
    type: 'imported',
    image: `${MEDIA}/O-6w4FYqE10j/be76f399cc/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg`,
    objectPosition: '50% 35%',
    bgColor: '#9a6a30',
  },
  {
    id: 'shih-tzu-female',
    name: 'Shih Tzu',
    breed: 'Shih Tzu',
    gender: 'girl',
    age: '2 months',
    hasVideo: false,
    status: 'available',
    type: 'imported',
    image: `${MEDIA}/qNrTCSrsYyzY/168fa8c4ff/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg`,
    objectPosition: '50% 35%',
    bgColor: '#3a3a3a',
  },
  {
    id: 'shih-tzu-male',
    name: 'Shih Tzu',
    breed: 'Shih Tzu',
    gender: 'boy',
    age: '2 months',
    hasVideo: false,
    status: 'available',
    type: 'imported',
    image: `${MEDIA}/crgs9ih6as_M/e37bafb1bf/b942a5_344e49c6c349400d2b09a3ddd5c2e3234-mv2.jpg`,
    objectPosition: '50% 40%',
    bgColor: '#2a2a2a',
  },
  {
    id: 'maltipoo-girl-2',
    name: 'Maltipoo',
    breed: 'Maltipoo',
    gender: 'girl',
    age: '2.5 months',
    hasVideo: false,
    status: 'available',
    type: 'imported',
    image: `${MEDIA}/wNm2_VIBEQvK/4b68f59e75/b942a5_7dd33c9b78c04f78a6a1c7386fb55620-mv2.jpg`,
    objectPosition: '50% 35%',
    bgColor: '#7a5830',
  },
  {
    id: 'maltipoo-girl-3',
    name: 'Maltipoo',
    breed: 'Maltipoo',
    gender: 'girl',
    age: '2 months',
    hasVideo: false,
    status: 'available',
    type: 'imported',
    image: `${MEDIA}/lMhASnmIIVQ4/ad2353ad31/b942a5_6a561770_8d75408b8f73725080ed0149-mv2.jpg`,
    objectPosition: '50% 40%',
    bgColor: '#7a5030',
  },
  {
    id: 'korean-teacup-pomeranian-female',
    name: 'Korean Teacup Pomeranian',
    breed: 'Pomeranian',
    gender: 'girl',
    age: '2 months',
    hasVideo: false,
    status: 'available',
    type: 'korean-teacup',
    image: `${MEDIA}/EsAq2LSRvVCJ/4d553ed044/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpg`,
    objectPosition: '50% 35%',
    bgColor: '#d4a060',
  },
  {
    id: 'korean-teacup-pomeranian-female-2',
    name: 'Korean Teacup Pomeranian',
    breed: 'Pomeranian',
    gender: 'girl',
    age: '2 months',
    hasVideo: false,
    status: 'available',
    type: 'korean-teacup',
    image: `${MEDIA}/vzf7P8SPCZ-Q/a8db4ee114/b942a5_967bb346583b4146acb56607f5da5f21-mv2.jpg`,
    objectPosition: '50% 40%',
    bgColor: '#c89848',
  },
  {
    id: 'korean-teacup-pomeranian-male',
    name: 'Korean Teacup Pomeranian',
    breed: 'Pomeranian',
    gender: 'boy',
    age: '2 months',
    hasVideo: false,
    status: 'available',
    type: 'korean-teacup',
    image: `${MEDIA}/nZTGFv46hrZI/fb9eeefc9c/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpg`,
    objectPosition: '50% 35%',
    bgColor: '#c8a060',
  },
];

export const gonePuppies = [
  {
    id: 'ace',
    name: 'Ace',
    image: `${MEDIA}/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg`,
  },
  {
    id: 'leo',
    name: 'Leo',
    image: `${MEDIA}/Vi-kzyvemRl4/e740ed8a24/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg`,
  },
  {
    id: 'mia',
    name: 'Mia',
    image: `${MEDIA}/g_e4ebbc7fyG/8276289ae7/27b888_323008bb0f6a41d4bde2a0da7206cd98f002.jpg`,
  },
  {
    id: 'sadie',
    name: 'Sadie',
    image: `${MEDIA}/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg`,
  },
  {
    id: 'pomeranian-gone',
    name: 'Pomeranian',
    image: `${MEDIA}/dI8Jv0KRTiLJ/d2d7e5375b/27b888_7d940ce5701f48d98327e4a242b53ac4-mv2.jpg`,
  },
];

export const processSteps = [
  {
    step: '01',
    title: 'Choose your breed',
    description: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.",
  },
  {
    step: '02',
    title: 'Get photos & details',
    description: 'Our team will share real photos, health details, and all necessary information directly on WhatsApp.',
  },
  {
    step: '03',
    title: 'Secure & safe delivery',
    description: 'Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.',
  },
];

export const trustPoints = [
  {
    icon: '🐾',
    title: 'Health Guaranteed',
    description: 'Every puppy comes vaccinated, dewormed, and with a verified health certificate.',
  },
  {
    icon: '✈️',
    title: 'Safe Travel',
    description: 'Trusted breeders, safe travel, and premium care from start to finish.',
  },
  {
    icon: '💬',
    title: 'Always Here',
    description: 'Always here to help, from choosing your puppy to post-delivery support.',
  },
  {
    icon: '🌍',
    title: 'Worldwide Delivery',
    description: 'Puppies delivered to loving homes all around the world.',
  },
];

export const faqs = [
  {
    question: 'Are the puppies vaccinated?',
    answer: 'Yes. Every puppy comes fully vaccinated and dewormed according to their age, with a verified health certificate from a licensed veterinarian.',
  },
  {
    question: 'Can I visit the puppies in person?',
    answer: 'Absolutely! We have a showroom in Downtown Dubai where you can meet the available puppies before making a decision. Contact us on WhatsApp to schedule a visit.',
  },
  {
    question: 'Do you deliver outside Dubai?',
    answer: 'Yes, we deliver to all Emirates and ship internationally. We handle all logistics, documentation, and ensure your puppy arrives safely.',
  },
  {
    question: 'What breeds do you offer?',
    answer: 'We specialise in teacup and miniature breeds including Maltipoo, Pomeranian, Poodle, Cavapoo, Shih Tzu, and exclusive Korean Teacup varieties.',
  },
  {
    question: 'How do I reserve a puppy?',
    answer: "Simply message us on WhatsApp! We'll guide you through the process, share photos and health details, and help you reserve your chosen puppy with a deposit.",
  },
  {
    question: 'What is the price range?',
    answer: 'Prices vary by breed, age, and origin. Please contact us on WhatsApp for current pricing and availability — we are happy to help find the perfect puppy within your budget.',
  },
  {
    question: 'Do you offer a health guarantee?',
    answer: 'Yes. We stand behind the health of every puppy we sell. All puppies come with a health guarantee and we provide ongoing support after adoption.',
  },
  {
    question: 'What are Korean Teacup puppies?',
    answer: "Korean Teacup puppies are selectively bred miniature dogs from South Korea's most reputable breeders, known for their exceptionally small size, perfect proportions, and teddy-bear looks.",
  },
];

export const happyFamiliesTestimonials = [
  {
    id: 1,
    text: 'We are truly honored to see our puppies become cherished members of loving families.',
    image: `${MEDIA}/TI-WtaFssfQt/c41fb2a387/27b888_15920f828b864dd1b44b98ec4e964c53-mv2.jpg`,
  },
  {
    id: 2,
    text: 'These heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.',
    image: `${MEDIA}/j6T9eswP2eS8/59c6879a1d/27b888_bc27df54dcce410196c6016475364ff3-mv2.jpg`,
  },
  {
    id: 3,
    text: 'A happy PebblePups family with their new puppy.',
    image: `${MEDIA}/HJgL4rRnmReV/533701358f/27b888_082e47dfd8144423a96dc70d966fa5b2-mv2.jpg`,
  },
  {
    id: 4,
    text: 'A happy PebblePups family with their new puppy.',
    image: `${MEDIA}/uc5ANs5jm7r7/7160d8b7b1/27b888_f7f4966e59e94db591784d4ec546682f-mv2.jpg`,
  },
];

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Puppies', path: '/puppies' },
  { label: 'Happy families', path: '/happy-families' },
  { label: 'How it works', path: '/how-it-works' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Visit & contact', path: '/contact' },
];

export const footerLinks = [
  { label: 'Available puppies', path: '/puppies' },
  { label: 'Gone home', path: '/puppies?tab=gone' },
  { label: 'Happy families', path: '/happy-families' },
  { label: 'How it works', path: '/how-it-works' },
  { label: 'Delivery & collection', path: '/how-it-works' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Visit & contact', path: '/contact' },
];
