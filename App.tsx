import React, { useState, useEffect, useRef } from 'react';
import { Phase, VocabWord, Substory } from './types';
import { VOCABULARY, SUBSTORIES } from './data';
import { checkSentenceAnswer } from './services/geminiService';

export default function App() {
  const [phase, setPhase] = useState<Phase>(Phase.INTRO);
  const [currentSubstoryIndex, setCurrentSubstoryIndex] = useState(0);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [score, setScore] = useState(0);

  // Helper to get current substory data
  const currentSubstory = SUBSTORIES[currentSubstoryIndex];

  const toggleFont = () => setDyslexicFont(!dyslexicFont);
  
  // Advanced TTS Helper
  const speak = (text: string, lang: 'en-GB' | 'de-DE' = 'en-GB') => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang; 
    utterance.rate = 0.9; 
    utterance.pitch = 1.0;

    // Try to find a specific voice for the language
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
    if (voice) {
        utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Pre-load voices
  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  const nextPhase = () => {
    if (phase === Phase.INTRO) {
      setPhase(Phase.LEARN_VIDEO);
    } else if (phase === Phase.LEARN_VIDEO) {
      setPhase(Phase.TEST_VERBAL);
    } else if (phase === Phase.TEST_VERBAL) {
      setPhase(Phase.TEST_WRITING);
    } else if (phase === Phase.TEST_WRITING) {
      if (currentSubstoryIndex < SUBSTORIES.length - 1) {
        setCurrentSubstoryIndex(prev => prev + 1);
        setPhase(Phase.LEARN_VIDEO); // Start next story
      } else {
        setPhase(Phase.OUTRO);
      }
    }
  };

  const fontClass = dyslexicFont ? 'font-dyslexic' : 'font-sans';
  const baseClasses = `min-h-screen bg-slate-50 text-slate-900 transition-all duration-300 ${fontClass}`;

  return (
    <div className={baseClasses}>
      <header className="bg-blue-700 text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-2">
           <span className="text-3xl">🇬🇧</span>
           <div className="flex flex-col">
             <h1 className="text-xl md:text-2xl font-bold tracking-wide">Mission: Lost in London</h1>
             <span className="text-xs uppercase opacity-80">{phase.replace('_', ' ')} • Story {currentSubstoryIndex + 1}/{SUBSTORIES.length}</span>
           </div>
        </div>
        <div className="flex gap-4 items-center">
            <div className="flex items-center bg-blue-800 px-3 py-1 rounded-full border border-blue-500">
                <span className="text-yellow-400 text-xl mr-2">⭐</span>
                <span className="font-bold text-xl">{score}</span>
            </div>
            <button 
                onClick={toggleFont} 
                className="bg-white text-blue-800 px-3 py-1 rounded font-bold text-sm hover:bg-blue-100 transition shadow-sm"
                aria-label="Toggle Dyslexia Friendly Font"
            >
                Aa
            </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-8">
        {phase === Phase.INTRO && (
          <IntroScreen onStart={nextPhase} speak={speak} />
        )}

        {phase === Phase.LEARN_VIDEO && (
          <LearningVideo 
            substory={currentSubstory} 
            onComplete={nextPhase} 
            speak={speak} 
          />
        )}

        {phase === Phase.TEST_VERBAL && (
          <VerbalTest 
            substory={currentSubstory} 
            onComplete={nextPhase} 
            addScore={(pts) => setScore(s => s + pts)}
            speak={speak} 
          />
        )}

        {phase === Phase.TEST_WRITING && (
          <WritingTest 
            substory={currentSubstory} 
            onComplete={nextPhase} 
            addScore={(pts) => setScore(s => s + pts)}
            speak={speak} 
          />
        )}

        {phase === Phase.OUTRO && (
          <OutroScreen score={score} speak={speak} onRestart={() => window.location.reload()} />
        )}
      </main>
    </div>
  );
}

// --- HELPER TYPES FOR TESTS ---

type TestTaskType = 'TRANSLATE_TO_ENGLISH' | 'CONJUGATE_PAST';

interface TestTask {
    word: VocabWord;
    type: TestTaskType;
    prompt: string;      // The text shown to user
    target: string;      // The expected answer
    audioPrompt: string; // What is spoken
    audioLang: 'de-DE' | 'en-GB';
}

const generateTasks = (vocabIds: string[]): TestTask[] => {
    const tasks: TestTask[] = [];
    const words = VOCABULARY.filter(v => vocabIds.includes(v.id));

    words.forEach(word => {
        // 1. Translation Task (German -> English)
        tasks.push({
            word,
            type: 'TRANSLATE_TO_ENGLISH',
            prompt: word.german,
            target: word.english,
            audioPrompt: word.german,
            audioLang: 'de-DE'
        });

        // 2. Past Tense Task (if applicable) (English Present -> English Past)
        if (word.type === 'verb' && word.pastTense) {
            tasks.push({
                word,
                type: 'CONJUGATE_PAST',
                prompt: `Past tense of: ${word.english}`,
                target: word.pastTense,
                audioPrompt: word.english,
                audioLang: 'en-GB'
            });
        }
    });

    return tasks;
};

// --- SUB-COMPONENTS ---

const IntroScreen = ({ onStart, speak }: { onStart: () => void, speak: (t: string) => void }) => {
    useEffect(() => {
        speak("Hi! I'm Alex. Welcome to Mission Lost in London. We will watch videos, speak, and write. Are you ready?");
    }, []);

    return (
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in mt-8">
            <div className="text-9xl mb-4 animate-bounce">💂</div>
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-8 border-blue-500 relative max-w-lg">
                <h2 className="text-3xl font-bold mb-4 text-blue-900">Your Mission</h2>
                <ul className="text-left space-y-4 text-xl text-slate-700">
                    <li className="flex items-center gap-3">
                        <span className="bg-blue-100 p-2 rounded-full">📺</span> Watch the story
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="bg-green-100 p-2 rounded-full">🗣️</span> Speak the words
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="bg-orange-100 p-2 rounded-full">✍️</span> Write the test
                    </li>
                </ul>
            </div>
            
            <button 
                onClick={() => { speak("Let's go!"); onStart(); }}
                className="bg-green-600 hover:bg-green-700 text-white text-2xl font-bold py-4 px-12 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95 flex items-center gap-2"
            >
                Start Mission 🚀
            </button>
        </div>
    );
}

const LearningVideo = ({ substory, onComplete, speak }: { substory: Substory, onComplete: () => void, speak: (t: string) => void }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Auto-speak when slide changes
        if (step < substory.storyText.length) {
            speak(substory.storyText[step]);
        }
    }, [step, substory]);

    const handleNext = () => {
        if (step < substory.storyText.length - 1) {
            setStep(step + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div className="flex flex-col items-center space-y-6">
            <div className="bg-blue-100 text-blue-900 px-6 py-3 rounded-full font-bold text-lg shadow-sm">
                📺 Learning Video: {substory.title}
            </div>

            <div className="w-full h-80 bg-slate-900 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 text-center relative overflow-hidden border-4 border-slate-800">
                {/* Simulated Video UI */}
                <div className="absolute top-4 right-4 text-red-500 animate-pulse">● REC</div>
                
                <div className="text-8xl mb-6">
                    {substory.theme.includes("Food") ? '🍔' : 
                     substory.theme.includes("Health") ? '🤒' : 
                     substory.theme.includes("Drill") ? '🎤' : '🗺️'}
                </div>
                
                <p className="text-white text-3xl font-medium leading-relaxed drop-shadow-md">
                    "{substory.storyText[step]}"
                </p>
                
                <div className="absolute bottom-4 w-full px-8 flex gap-1 justify-center">
                    {substory.storyText.map((_, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full ${i === step ? 'bg-white' : 'bg-slate-700'}`} />
                    ))}
                </div>
            </div>

            <div className="flex gap-4">
                <button 
                    onClick={() => speak(substory.storyText[step])}
                    className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 p-4 rounded-full shadow-lg"
                    aria-label="Repeat Audio"
                >
                    🔊 Repeat
                </button>
                <button 
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg transition transform hover:scale-105"
                >
                    {step < substory.storyText.length - 1 ? "Next ▶" : "Finish Video ✅"}
                </button>
            </div>
        </div>
    );
};

const VerbalTest = ({ substory, onComplete, addScore, speak }: { substory: Substory, onComplete: () => void, addScore: (n: number) => void, speak: (t: string, l?: 'en-GB'|'de-DE') => void }) => {
    const [tasks, setTasks] = useState<TestTask[]>([]);
    const [index, setIndex] = useState(0);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        setTasks(generateTasks(substory.vocabIds));
        setIndex(0);
        setRevealed(false);
    }, [substory]);

    const currentTask = tasks[index];

    useEffect(() => {
        if (!currentTask) return;

        if (!revealed) {
            // Speak the prompt word in its native language
            // Intro in English, then the word.
            if (currentTask.type === 'TRANSLATE_TO_ENGLISH') {
                speak("What is this in English?", 'en-GB');
                setTimeout(() => speak(currentTask.audioPrompt, 'de-DE'), 1800);
            } else {
                speak("What is the past tense of?", 'en-GB');
                setTimeout(() => speak(currentTask.audioPrompt, 'en-GB'), 1800);
            }
        } else {
             // Speak answer in English
             speak(currentTask.target, 'en-GB');
        }
    }, [index, revealed, currentTask]);

    const handleReveal = () => {
        setRevealed(true);
    };

    const handleResult = (success: boolean) => {
        if (success) addScore(10);
        
        if (index < tasks.length - 1) {
            setRevealed(false);
            setIndex(index + 1);
        } else {
            onComplete();
        }
    };

    if (!currentTask) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center space-y-6">
            <div className="bg-green-100 text-green-900 px-6 py-3 rounded-full font-bold text-lg shadow-sm">
                🗣️ Verbal Test
            </div>

            <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border-b-8 border-green-200 min-h-[350px] flex flex-col items-center justify-center p-8 relative">
                <p className="text-slate-400 font-bold uppercase tracking-widest mb-4">
                    {currentTask.type === 'CONJUGATE_PAST' ? 'Say the Past Tense' : 'Translate to English'}
                </p>
                
                {/* The Prompt Word */}
                <h3 className={`text-5xl font-black mb-8 text-center ${currentTask.type === 'TRANSLATE_TO_ENGLISH' ? 'text-blue-600' : 'text-slate-800'}`}>
                    {currentTask.prompt.includes('Past tense') ? currentTask.word.english : currentTask.prompt}
                </h3>
                
                {currentTask.type === 'CONJUGATE_PAST' && (
                    <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded mb-6 text-sm">Verb</span>
                )}

                <div className="w-24 h-1 bg-slate-100 mb-8 rounded-full"></div>

                {revealed ? (
                    <div className="animate-zoom-in text-center">
                        <p className="text-4xl font-bold text-green-600">
                            {currentTask.target}
                        </p>
                        {currentTask.type === 'CONJUGATE_PAST' && <p className="text-slate-400 text-lg mt-2">(Yesterday I...)</p>}
                    </div>
                ) : (
                    <div className="text-6xl text-slate-200 font-black">?</div>
                )}
            </div>

            {!revealed ? (
                <button 
                    onClick={handleReveal}
                    className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 text-2xl font-bold py-4 px-12 rounded-full shadow-lg"
                >
                    Show Answer 👀
                </button>
            ) : (
                <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                    <button 
                        onClick={() => handleResult(false)}
                        className="bg-red-100 hover:bg-red-200 text-red-800 text-xl font-bold py-4 rounded-xl border-2 border-red-200"
                    >
                        I was wrong ❌
                    </button>
                    <button 
                        onClick={() => handleResult(true)}
                        className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 rounded-xl shadow-lg border-b-4 border-green-700"
                    >
                        I said it! ✅
                    </button>
                </div>
            )}
            
            <p className="text-slate-400">{index + 1} / {tasks.length}</p>
        </div>
    );
};

const WritingTest = ({ substory, onComplete, addScore, speak }: { substory: Substory, onComplete: () => void, addScore: (n: number) => void, speak: (t: string, l?: 'en-GB'|'de-DE') => void }) => {
    const [tasks, setTasks] = useState<TestTask[]>([]);
    const [index, setIndex] = useState(0);
    const [input, setInput] = useState('');
    const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
    const [attempts, setAttempts] = useState(0);

    // Auto-focus input
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTasks(generateTasks(substory.vocabIds));
        setIndex(0);
    }, [substory]);

    const currentTask = tasks[index];

    useEffect(() => {
        if (!currentTask) return;
        if (inputRef.current) inputRef.current.focus();
        setInput('');
        setStatus('idle');
        setAttempts(0);
        
        // Audio Prompt
        if (currentTask.type === 'TRANSLATE_TO_ENGLISH') {
            speak(`Write the English word for`, 'en-GB');
            setTimeout(() => speak(currentTask.audioPrompt, 'de-DE'), 1500);
        } else {
            speak(`Write the past tense of`, 'en-GB');
            setTimeout(() => speak(currentTask.audioPrompt, 'en-GB'), 1500);
        }
    }, [index, currentTask]);

    const checkAnswer = () => {
        if (!currentTask) return;

        if (input.trim().toLowerCase() === currentTask.target.toLowerCase()) {
            setStatus('correct');
            speak("Correct!", 'en-GB');
            addScore(20); 
            setTimeout(() => {
                if (index < tasks.length - 1) {
                    setIndex(index + 1);
                } else {
                    onComplete();
                }
            }, 1500);
        } else {
            setStatus('wrong');
            setAttempts(a => a + 1);
            speak("Try again.", 'en-GB');
        }
    };

    const giveUp = () => {
        if (!currentTask) return;
        setInput(currentTask.target);
        speak(`The answer is ${currentTask.target}`, 'en-GB');
        setTimeout(() => {
            if (index < tasks.length - 1) {
                setIndex(index + 1);
            } else {
                onComplete();
            }
        }, 2000);
    };

    if (!currentTask) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center space-y-6">
            <div className="bg-orange-100 text-orange-900 px-6 py-3 rounded-full font-bold text-lg shadow-sm">
                ✍️ Writing Test
            </div>

            <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg border-2 border-orange-100">
                <div className="mb-6 text-center">
                    <p className="text-slate-500 mb-2 uppercase font-bold text-xs tracking-wider">
                        {currentTask.type === 'CONJUGATE_PAST' ? `Past Tense` : `Translate`}
                    </p>
                    <h3 className={`text-4xl font-bold ${currentTask.type === 'TRANSLATE_TO_ENGLISH' ? 'text-blue-600' : 'text-slate-800'}`}>
                        {currentTask.prompt.includes('Past tense') ? currentTask.word.english : currentTask.prompt}
                    </h3>
                </div>

                <div className="relative">
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                        className={`w-full p-4 text-2xl font-mono text-center border-4 rounded-xl outline-none transition-colors
                            ${status === 'idle' ? 'border-slate-300 focus:border-blue-400' : ''}
                            ${status === 'correct' ? 'border-green-500 bg-green-50' : ''}
                            ${status === 'wrong' ? 'border-red-500 bg-red-50' : ''}
                        `}
                        placeholder="Type here..."
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                    />
                    {status === 'correct' && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl">✅</span>}
                    {status === 'wrong' && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl">❌</span>}
                </div>

                {status === 'wrong' && (
                     <p className="text-red-500 mt-2 text-center font-bold">Not quite. Try again!</p>
                )}

                <div className="mt-8 flex gap-4">
                     {attempts >= 2 && (
                         <button onClick={giveUp} className="flex-1 bg-slate-200 text-slate-600 py-3 rounded-lg font-bold">
                             Skip / Show Answer
                         </button>
                     )}
                     <button 
                        onClick={checkAnswer}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-3 rounded-lg shadow-md"
                     >
                        Check Answer ⏎
                     </button>
                </div>
            </div>

            <p className="text-slate-400">{index + 1} / {tasks.length}</p>
        </div>
    );
};

const OutroScreen = ({ score, speak, onRestart }: { score: number, speak: (t: string) => void, onRestart: () => void }) => {
    useEffect(() => {
        speak("Mission Complete! You are a master of London. Fantastic work!");
    }, []);

    return (
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in py-8">
            <div className="text-9xl animate-bounce">🏰</div>
            <h2 className="text-4xl font-bold text-blue-900">Mission Complete!</h2>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-4 border-yellow-300">
                <p className="text-xl text-slate-600 mb-2">Total Score</p>
                <p className="text-7xl font-bold text-yellow-500 mb-6">{score}</p>
                <div className="text-green-600 font-bold text-xl">
                    Vocabulary Master Certified! 🎓
                </div>
            </div>

            <button 
                onClick={onRestart}
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:bg-blue-700"
            >
                Play Again 🔄
            </button>
        </div>
    );
}