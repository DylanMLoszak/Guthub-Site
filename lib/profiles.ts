export type Profile = {
  id: string;
  name: string;
  age: number;
  city: string;
  occupation: string;
  prompt: { question: string; answer: string };
  bio: string;
  photo: string;
  accent?: "terracotta" | "oxblood" | "rose" | "moss";
};

// Curated Unsplash portraits. The `&w=900&q=80&auto=format&fit=crop` suffix
// keeps payloads small and lets next/image handle responsive variants.
const u = (id: string) =>
  `https://images.unsplash.com/${id}?w=900&q=80&auto=format&fit=crop`;

export const profiles: Profile[] = [
  {
    id: "maya",
    name: "Maya",
    age: 31,
    city: "Brooklyn, NY",
    occupation: "Pastry chef",
    prompt: {
      question: "My ideal Sunday",
      answer:
        "Croissant dough proofing on the counter, vinyl spinning, no plans before 3pm.",
    },
    bio: "Soft-launching the rest of my life. Looking for someone who orders dessert without flinching.",
    photo: u("photo-1531746020798-e6953c6e8e04"),
    accent: "terracotta",
  },
  {
    id: "jules",
    name: "Jules",
    age: 34,
    city: "Oakland, CA",
    occupation: "Graphic designer",
    prompt: {
      question: "Two truths and a lie",
      answer:
        "I cried at the Barbie movie. I can solve a Rubik's cube. I've never broken a bone.",
    },
    bio: "Type-set my own love letters. Strong opinions about kerning and second dates.",
    photo: u("photo-1573496359142-b8d87734a5a2"),
    accent: "rose",
  },
  {
    id: "deji",
    name: "Deji",
    age: 29,
    city: "Atlanta, GA",
    occupation: "Sound engineer",
    prompt: {
      question: "The way to my heart",
      answer:
        "Show me a song you've had on repeat for a week. Bonus points if it makes you feel something embarrassing.",
    },
    bio: "Big body, bigger laugh. I make playlists like love letters.",
    photo: u("photo-1500648767791-00dcc994a43e"),
    accent: "oxblood",
  },
  {
    id: "harper",
    name: "Harper",
    age: 27,
    city: "Chicago, IL",
    occupation: "ER nurse",
    prompt: {
      question: "What I want you to know",
      answer:
        "I work twelve-hour shifts and still want to dance after. Pace yourself.",
    },
    bio: "Wears scrubs by day, slip dresses by night. Looking for someone steady.",
    photo: u("photo-1494790108377-be9c29b29330"),
    accent: "terracotta",
  },
  {
    id: "rohan",
    name: "Rohan",
    age: 33,
    city: "Toronto, ON",
    occupation: "Bookseller",
    prompt: {
      question: "Currently obsessed with",
      answer:
        "James Baldwin essays, slow-cooked dal, and the way snow muffles a city.",
    },
    bio: "I'll read aloud to you. I'll also cook. Sometimes simultaneously.",
    photo: u("photo-1502823403499-6ccfcf4fb453"),
    accent: "moss",
  },
  {
    id: "selene",
    name: "Selene",
    age: 30,
    city: "Lisbon, PT",
    occupation: "Ceramicist",
    prompt: {
      question: "A perfect first date",
      answer:
        "Wine somewhere with bad lighting. We argue gently about a film. We walk home the long way.",
    },
    bio: "I throw bowls. I throw better dinner parties. Body confident, low drama.",
    photo: u("photo-1517841905240-472988babdf9"),
    accent: "oxblood",
  },
  {
    id: "theo",
    name: "Theo",
    age: 36,
    city: "Berlin, DE",
    occupation: "Architect",
    prompt: {
      question: "Most controversial opinion",
      answer:
        "Brutalism is romantic. Fight me about it over a long espresso.",
    },
    bio: "Six-foot-three, soft-hearted, allergic to small talk and gluten.",
    photo: u("photo-1488426862026-3ee34a7d66df"),
    accent: "terracotta",
  },
  {
    id: "imani",
    name: "Imani",
    age: 28,
    city: "London, UK",
    occupation: "Poet",
    prompt: {
      question: "I'll fall for you if",
      answer:
        "You text me a photo of the moon at 2am with no caption. That's it. That's the bar.",
    },
    bio: "Curvy, curious, mostly nocturnal. Looking for a co-conspirator.",
    photo: u("photo-1438761681033-6461ffad8d80"),
    accent: "rose",
  },
  {
    id: "marco",
    name: "Marco",
    age: 32,
    city: "Mexico City, MX",
    occupation: "Documentary filmmaker",
    prompt: {
      question: "What I'm working on",
      answer:
        "A short film about my abuela's kitchen. She uses too much salt. I let her.",
    },
    bio: "Big love, big appetite, no apologies. Tell me a story.",
    photo: u("photo-1539571696357-5a69c17a67c6"),
    accent: "oxblood",
  },
  {
    id: "noor",
    name: "Noor",
    age: 35,
    city: "Marrakech, MA",
    occupation: "Textile designer",
    prompt: {
      question: "If I could teach you one thing",
      answer:
        "How to dye silk with pomegranate skins. It takes three days and is worth it.",
    },
    bio: "Voluptuous, deliberate, married to color. Single by design, dating with intent.",
    photo: u("photo-1546961342-c3f516d1d11d"),
    accent: "terracotta",
  },
];
