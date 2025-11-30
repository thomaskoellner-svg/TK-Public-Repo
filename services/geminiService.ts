import { GoogleGenAI } from "@google/genai";
import { VocabWord } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generatePracticeSentence = async (word: VocabWord): Promise<string | null> => {
  if (!apiKey) return null;

  try {
    const prompt = `
      Create a very simple, short English sentence for a 12-year-old student using the word "${word.english}".
      The context should be about travel in London or feeling sick or eating food.
      Do not translate it. Just return the English sentence.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

export const getGrammarHint = async (verb: string, pastTense: string): Promise<string> => {
  if (!apiKey) return `Magic Hint: ${verb} changes to ${pastTense} in the past!`;
  
  try {
     const prompt = `Explain to a 12-year-old why '${verb}' becomes '${pastTense}' in the past tense. Keep it under 20 words. Be fun and encouraging.`;
     const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
     });
     return response.text.trim();
  } catch (e) {
      return `Remember: Yesterday I ${pastTense}!`;
  }
}

export const checkSentenceAnswer = async (userSentence: string, targetVerb: string): Promise<{isCorrect: boolean, feedback: string}> => {
  if (!apiKey) {
      // Fallback simple check
      const hasWord = userSentence.toLowerCase().includes(targetVerb.toLowerCase());
      return {
          isCorrect: hasWord,
          feedback: hasWord ? "Good job!" : `Try to use '${targetVerb}' in your sentence.`
      };
  }
  
  try {
      const prompt = `Check if this sentence is correct English and uses the word "${targetVerb}": "${userSentence}". Return JSON { "isCorrect": boolean, "feedback": string }. Feedback should be for a child.`;
       const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' }
      });
      return JSON.parse(response.text.trim());
  } catch (e) {
      return { isCorrect: true, feedback: "Great effort!" };
  }
};