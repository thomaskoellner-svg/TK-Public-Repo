export enum Phase {
  INTRO = 'INTRO',
  LEARN_VIDEO = 'LEARN_VIDEO', // The "Video" / Story part
  TEST_VERBAL = 'TEST_VERBAL', // Speaking drill
  TEST_WRITING = 'TEST_WRITING', // Typing/Spelling drill
  OUTRO = 'OUTRO',
}

export interface VocabWord {
  id: string;
  english: string;
  german: string;
  pastTense?: string; // For verbs
  type: 'verb' | 'noun' | 'phrase' | 'adjective' | 'preposition';
  imageCategory?: 'food' | 'city' | 'health' | 'general'; 
  audioSrc?: string; 
}

export interface Substory {
  id: number;
  title: string;
  theme: string;
  vocabIds: string[]; // IDs of words to learn in this story
  storyText: string[]; // Sentences for the "Video" phase
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}
