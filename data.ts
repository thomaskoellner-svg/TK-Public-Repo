import { VocabWord, Substory } from './types';

// Comprehensive list based on book photos (p.56, 57, 166-172, 216)
export const VOCABULARY: VocabWord[] = [
  // --- UNIT 3-4 VOCABULARY (p. 56-57) ---
  { id: 'do_exercises', english: 'do exercises', german: 'Übungen machen', type: 'verb', imageCategory: 'general' },
  { id: 'shout', english: 'shout', german: 'rufen/schreien', type: 'verb', pastTense: 'shouted', imageCategory: 'general' },
  { id: 'somebody', english: 'somebody', german: 'jemand', type: 'noun', imageCategory: 'general' },
  { id: 'these_people', english: 'these people', german: 'diese Menschen', type: 'noun', imageCategory: 'general' },
  { id: 'special', english: 'special', german: 'besonderer/e/s', type: 'adjective', imageCategory: 'general' },
  
  // Irregular Verbs (p. 57 & 216)
  { id: 'find_out', english: 'find out', german: 'herausfinden', pastTense: 'found out', type: 'verb', imageCategory: 'general' },
  { id: 'ring', english: 'ring', german: 'läuten/klingeln', pastTense: 'rang', type: 'verb', imageCategory: 'general' },
  { id: 'sleep', english: 'sleep', german: 'schlafen', pastTense: 'slept', type: 'verb', imageCategory: 'general' },
  { id: 'stand', english: 'stand', german: 'stehen', pastTense: 'stood', type: 'verb', imageCategory: 'general' },
  { id: 'take', english: 'take', german: 'nehmen', pastTense: 'took', type: 'verb', imageCategory: 'general' },
  { id: 'tell', english: 'tell', german: 'erzählen', pastTense: 'told', type: 'verb', imageCategory: 'general' },
  { id: 'win', english: 'win', german: 'gewinnen', pastTense: 'won', type: 'verb', imageCategory: 'general' },
  { id: 'eat', english: 'eat', german: 'essen', pastTense: 'ate', type: 'verb', imageCategory: 'food' },
  { id: 'buy', english: 'buy', german: 'kaufen', pastTense: 'bought', type: 'verb', imageCategory: 'general' },
  { id: 'go', english: 'go', german: 'gehen', pastTense: 'went', type: 'verb', imageCategory: 'city' },
  { id: 'say', english: 'say', german: 'sagen', pastTense: 'said', type: 'verb', imageCategory: 'general' },
  { id: 'run', english: 'run', german: 'rennen', pastTense: 'ran', type: 'verb', imageCategory: 'general' },
  { id: 'put', english: 'put', german: 'legen/stellen', pastTense: 'put', type: 'verb', imageCategory: 'general' },
  { id: 'sing', english: 'sing', german: 'singen', pastTense: 'sang', type: 'verb', imageCategory: 'general' },

  // --- THEME 1: What's wrong with...? (p. 166) ---
  { id: 'ill', english: 'ill', german: 'krank', type: 'adjective', imageCategory: 'health' },
  { id: 'skive', english: 'skive', german: 'schwänzen (Schule)', type: 'verb', imageCategory: 'general' },
  { id: 'maybe', english: 'maybe', german: 'vielleicht', type: 'adjective', imageCategory: 'general' },
  { id: 'headache', english: 'headache', german: 'Kopfschmerzen', type: 'noun', imageCategory: 'health' },
  { id: 'worried', english: 'worried', german: 'besorgt', type: 'adjective', imageCategory: 'health' },
  { id: 'sore_throat', english: 'sore throat', german: 'Halsschmerzen', type: 'noun', imageCategory: 'health' },
  { id: 'temperature', english: 'temperature', german: 'Fieber/Temperatur', type: 'noun', imageCategory: 'health' },
  { id: 'doctor', english: 'doctor', german: 'Arzt', type: 'noun', imageCategory: 'health' },
  
  // --- THEME 2: Skills Training / Orientation (p. 168-170) ---
  { id: 'do_better', english: 'do better', german: 'besser abschneiden', type: 'verb', imageCategory: 'general' },
  { id: 'way', english: 'way', german: 'Weg', type: 'noun', imageCategory: 'city' },
  { id: 'excuse_me', english: 'excuse me', german: 'Entschuldigung', type: 'phrase', imageCategory: 'city' },
  { id: 'cross', english: 'cross', german: 'überqueren', type: 'verb', imageCategory: 'city' },
  { id: 'turn_right', english: 'turn right', german: 'rechts abbiegen', type: 'phrase', imageCategory: 'city' },
  { id: 'turn_left', english: 'turn left', german: 'links abbiegen', type: 'phrase', imageCategory: 'city' },
  { id: 'along', english: 'along', german: 'entlang', type: 'preposition', imageCategory: 'city' },
  { id: 'past', english: 'past', german: 'vorbei (an)', type: 'preposition', imageCategory: 'city' },
  { id: 'bank', english: 'bank', german: 'Bank (Geldinstitut)', type: 'noun', imageCategory: 'city' },
  { id: 'traffic_lights', english: 'traffic lights', german: 'Ampel', type: 'noun', imageCategory: 'city' },
  { id: 'map', english: 'map', german: 'Karte', type: 'noun', imageCategory: 'city' },
  { id: 'supermarket', english: 'supermarket', german: 'Supermarkt', type: 'noun', imageCategory: 'city' },
  { id: 'post_office', english: 'post office', german: 'Postamt', type: 'noun', imageCategory: 'city' },
  { id: 'neighbourhood', english: 'neighbourhood', german: 'Nachbarschaft/Viertel', type: 'noun', imageCategory: 'city' },
  { id: 'hairdresser', english: 'hairdresser', german: 'Friseur', type: 'noun', imageCategory: 'city' },

  // --- ADDITIONAL WORDS from photos ---
  { id: 'hungry', english: 'hungry', german: 'hungrig', type: 'adjective', imageCategory: 'food' },
  { id: 'salad', english: 'salad', german: 'Salat', type: 'noun', imageCategory: 'food' },
  { id: 'meat', english: 'meat', german: 'Fleisch', type: 'noun', imageCategory: 'food' },
  { id: 'cake', english: 'cake', german: 'Kuchen', type: 'noun', imageCategory: 'food' },
  { id: 'bonfire', english: 'bonfire', german: 'Feuer/Freudenfeuer', type: 'noun', imageCategory: 'general' },
  { id: 'celebrate', english: 'celebrate', german: 'feiern', pastTense: 'celebrated', type: 'verb', imageCategory: 'general' },
  { id: 'potato', english: 'potato', german: 'Kartoffel', type: 'noun', imageCategory: 'food' },
  { id: 'crisps', english: 'crisps', german: 'Chips', type: 'noun', imageCategory: 'food' },
  { id: 'feel', english: 'feel', german: 'fühlen', pastTense: 'felt', type: 'verb', imageCategory: 'health' },
  { id: 'wait', english: 'wait', german: 'warten', type: 'verb', imageCategory: 'general' },
];

export const SUBSTORIES: Substory[] = [
  {
    id: 1,
    title: "Mission 1: Lost in the City",
    theme: "Orientation & Places",
    vocabIds: ['way', 'map', 'turn_left', 'turn_right', 'traffic_lights', 'cross', 'post_office', 'hairdresser', 'supermarket', 'past', 'excuse_me'],
    storyText: [
      "Hi! I am Alex. I am in London, but I am lost.",
      "I have a map, but it is confusing.",
      "Excuse me, can you help me find the way?",
      "We need to go to the post office.",
      "Look at the traffic lights. We must cross the street.",
      "Then turn left and go past the hairdresser."
    ]
  },
  {
    id: 2,
    title: "Mission 2: The Hungry Traveller",
    theme: "Food & Past Tense (Irregular)",
    vocabIds: ['hungry', 'eat', 'buy', 'meat', 'salad', 'cake', 'potato', 'crisps', 'drink'], // drink inferred
    storyText: [
      "Walking makes me hungry.",
      "Yesterday I bought a lot of crisps.",
      "But today I want a salad and some meat.",
      "Yesterday I ate chocolate cake.",
      "It was delicious, but not healthy.",
      "Let's eat something good now!"
    ]
  },
  {
    id: 3,
    title: "Mission 3: What's wrong with Ben?",
    theme: "Health & Feelings",
    vocabIds: ['ill', 'headache', 'sore_throat', 'temperature', 'doctor', 'worried', 'feel', 'maybe', 'shout'],
    storyText: [
      "Oh look, there is my friend Ben.",
      "He looks ill. I am worried.",
      "Maybe he has a headache?",
      "He says he has a sore throat and a temperature.",
      "He feels hot. We must find a doctor.",
      "Don't shout, his head hurts!"
    ]
  },
  {
    id: 4,
    title: "Mission 4: The Past Tense Champion",
    theme: "Irregular Verbs Drill",
    vocabIds: ['find_out', 'ring', 'sleep', 'stand', 'take', 'tell', 'win', 'go', 'say', 'run', 'sing'],
    storyText: [
      "We found the doctor and Ben is okay.",
      "Now let's tell stories about yesterday.",
      "Yesterday I ran to the park.",
      "I sang a song and I won a game.",
      "I stood on a chair and rang a bell.",
      "Then I went home and slept."
    ]
  }
];
