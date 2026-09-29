import { useState, useEffect, useCallback } from 'react';

// ============ TYPES ============
type GameType = 'menu' | 'letters' | 'numbers' | 'math' | 'animals' | 'hangman' | 'colors' | 'shapes';

// ============ MAIN APP ============
export default function App() {
  const [currentGame, setCurrentGame] = useState<GameType>('menu');
  const [stars, setStars] = useState(0);

  const addStar = () => setStars(s => s + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-purple-100 to-pink-200 font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-md p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {currentGame !== 'menu' && (
            <button
              onClick={() => setCurrentGame('menu')}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded-full text-lg transition-all hover:scale-105 shadow-md"
            >
              🏠 Meniu
            </button>
          )}
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎮 Joacă și Învață
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-yellow-100 rounded-full px-4 py-2 shadow-inner">
          <span className="text-2xl">⭐</span>
          <span className="text-xl font-bold text-yellow-700">{stars}</span>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 md:p-8 max-w-6xl mx-auto">
        {currentGame === 'menu' && <MainMenu onSelect={setCurrentGame} stars={stars} />}
        {currentGame === 'letters' && <LetterGame addStar={addStar} />}
        {currentGame === 'numbers' && <NumberGame addStar={addStar} />}
        {currentGame === 'math' && <MathGame addStar={addStar} />}
        {currentGame === 'animals' && <AnimalGame addStar={addStar} />}
        {currentGame === 'hangman' && <HangmanGame addStar={addStar} />}
        {currentGame === 'colors' && <ColorGame addStar={addStar} />}
        {currentGame === 'shapes' && <ShapeGame addStar={addStar} />}
      </main>
    </div>
  );
}

// ============ MAIN MENU ============
function MainMenu({ onSelect, stars }: { onSelect: (game: GameType) => void; stars: number }) {
  const games = [
    { id: 'letters' as GameType, emoji: '🔤', title: 'Literele', desc: 'Învață literele alfabetului', color: 'from-red-400 to-orange-400' },
    { id: 'numbers' as GameType, emoji: '🔢', title: 'Cifrele', desc: 'Învață cifrele de la 0 la 9', color: 'from-blue-400 to-cyan-400' },
    { id: 'math' as GameType, emoji: '➕', title: 'Adunări & Scăderi', desc: 'Calculează până la 10', color: 'from-green-400 to-emerald-400' },
    { id: 'animals' as GameType, emoji: '🐾', title: 'Animale', desc: 'Ghicește animalul', color: 'from-amber-400 to-yellow-400' },
    { id: 'hangman' as GameType, emoji: '📝', title: 'Spânzurătoarea', desc: 'Ghicește cuvântul', color: 'from-purple-400 to-violet-400' },
    { id: 'colors' as GameType, emoji: '🎨', title: 'Culorile', desc: 'Învață culorile', color: 'from-pink-400 to-rose-400' },
    { id: 'shapes' as GameType, emoji: '🔷', title: 'Formele', desc: 'Recunoaște formele', color: 'from-indigo-400 to-blue-400' },
  ];

  return (
    <div className="text-center">
      <div className="mb-8 animate-bounce">
        <span className="text-6xl">🌟</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        Bine ai venit, micuțule explorer! 🚀
      </h2>
      <p className="text-xl text-gray-600 mb-8">
        Ai adunat {stars} stele! Alege un joc să înveți lucruri noi!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map(game => (
          <button
            key={game.id}
            onClick={() => onSelect(game.id)}
            className={`bg-gradient-to-br ${game.color} p-6 rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-white text-left`}
          >
            <div className="text-5xl mb-3">{game.emoji}</div>
            <h3 className="text-2xl font-bold mb-1">{game.title}</h3>
            <p className="text-white/90 text-lg">{game.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============ LETTER GAME ============
function LetterGame({ addStar }: { addStar: () => void }) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const [currentLetter, setCurrentLetter] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  const generateQuestion = useCallback(() => {
    const target = letters[Math.floor(Math.random() * letters.length)];
    setCurrentLetter(target);
    const opts = [target];
    while (opts.length < 4) {
      const r = letters[Math.floor(Math.random() * letters.length)];
      if (!opts.includes(r)) opts.push(r);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
    setFeedback(null);
  }, []);

  useEffect(() => { generateQuestion(); }, [generateQuestion]);

  const handleAnswer = (letter: string) => {
    if (letter === currentLetter) {
      setFeedback('correct');
      setScore(s => s + 1);
      addStar();
      setTimeout(generateQuestion, 1200);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <div className="max-w-lg mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">🔤 Învață Literele</h2>
      <p className="text-lg text-gray-600 mb-4">Scor: {score} ⭐</p>
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
        <p className="text-xl text-gray-600 mb-4">Care este litera?</p>
        <div className="text-9xl font-bold text-purple-600 mb-6 animate-pulse">
          {currentLetter}
        </div>
        <p className="text-lg text-gray-500 mb-6">
          {getLetterWord(currentLetter)}
        </p>
        <div className="grid grid-cols-2 gap-4">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className={`text-3xl font-bold py-4 px-6 rounded-2xl shadow-md transition-all hover:scale-105 ${
                feedback === 'correct' && opt === currentLetter
                  ? 'bg-green-400 text-white'
                  : feedback === 'wrong' && opt !== currentLetter
                  ? 'bg-gray-200 text-gray-400'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {feedback === 'correct' && (
          <div className="mt-4 text-2xl text-green-600 font-bold animate-bounce">
            🎉 Bravo! Foarte bine!
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="mt-4 text-xl text-orange-500 font-bold">
            🤔 Încearcă din nou!
          </div>
        )}
      </div>
    </div>
  );
}

function getLetterWord(letter: string): string {
  const words: Record<string, string> = {
    'A': '🍎 A de la Măr', 'B': '🏠 B de la Casă', 'C': '🐱 C de la Pisică',
    'D': '🦌 D de la Cerb', 'E': '🐘 E de la Elefant', 'F': '🌸 F de la Floare',
    'G': '🐸 G de la Broască', 'H': '🐴 H de la Cal', 'I': '🧊 I de la Gheață',
    'J': '🎮 J de la Joc', 'K': '🪁 K de la Zmeu', 'L': '🦁 L de la Leu',
    'M': '🐵 M de la Maimuță', 'N': '☁️ N de la Nor', 'O': '🐻 O de la Urs',
    'P': '🐟 P de la Pește', 'Q': '❓ Q - literă specială', 'R': '🌹 R de la Trandafir',
    'S': '☀️ S de la Soare', 'T': '🐯 T de la Tigru', 'U': '🍇 U de la Strugure',
    'V': '🌋 V de la Vulcan', 'W': '🧇 W de la Wafle', 'X': '❌ X - literă specială',
    'Y': '🧘 Y - literă specială', 'Z': '🦓 Z de la Zebră',
  };
  return words[letter] || '';
}

// ============ NUMBER GAME ============
function NumberGame({ addStar }: { addStar: () => void }) {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [mode, setMode] = useState<'count' | 'identify'>('count');

  const generateQuestion = useCallback(() => {
    const num = Math.floor(Math.random() * 10) + 1;
    setCurrentNumber(num);
    const opts = [num];
    while (opts.length < 4) {
      const r = Math.floor(Math.random() * 10) + 1;
      if (!opts.includes(r)) opts.push(r);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
    setFeedback(null);
    setMode(Math.random() > 0.5 ? 'count' : 'identify');
  }, []);

  useEffect(() => { generateQuestion(); }, [generateQuestion]);

  const handleAnswer = (num: number) => {
    if (num === currentNumber) {
      setFeedback('correct');
      setScore(s => s + 1);
      addStar();
      setTimeout(generateQuestion, 1200);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const emojis = ['🌟', '🍎', '🌸', '🐝', '🦋', '🍓', '🎈', '🌺', '🐞', '🍒'];

  return (
    <div className="max-w-lg mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">🔢 Învață Cifrele</h2>
      <p className="text-lg text-gray-600 mb-4">Scor: {score} ⭐</p>
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
        {mode === 'count' ? (
          <>
            <p className="text-xl text-gray-600 mb-4">Câte sunt?</p>
            <div className="text-4xl mb-6 flex flex-wrap justify-center gap-2">
              {Array.from({ length: currentNumber }).map((_, i) => (
                <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                  {emojis[currentNumber % emojis.length]}
                </span>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-xl text-gray-600 mb-4">Ce cifră este?</p>
            <div className="text-9xl font-bold text-blue-600 mb-6">
              {currentNumber}
            </div>
          </>
        )}
        <div className="grid grid-cols-2 gap-4">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className={`text-3xl font-bold py-4 px-6 rounded-2xl shadow-md transition-all hover:scale-105 ${
                feedback === 'correct' && opt === currentNumber
                  ? 'bg-green-400 text-white'
                  : feedback === 'wrong' && opt !== currentNumber
                  ? 'bg-gray-200 text-gray-400'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {feedback === 'correct' && (
          <div className="mt-4 text-2xl text-green-600 font-bold animate-bounce">
            🎉 Perfect!
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="mt-4 text-xl text-orange-500 font-bold">
            🤔 Mai încearcă!
          </div>
        )}
      </div>
    </div>
  );
}

// ============ MATH GAME ============
function MathGame({ addStar }: { addStar: () => void }) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState<'+' | '-'>('+');
  const [answer, setAnswer] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const generateQuestion = useCallback(() => {
    const op = Math.random() > 0.5 ? '+' : '-';
    let a: number, b: number, ans: number;
    if (op === '+') {
      a = Math.floor(Math.random() * 9) + 1;
      b = Math.floor(Math.random() * (10 - a)) + 1;
      ans = a + b;
    } else {
      a = Math.floor(Math.random() * 9) + 2;
      b = Math.floor(Math.random() * (a - 1)) + 1;
      ans = a - b;
    }
    setNum1(a);
    setNum2(b);
    setOperation(op);
    setAnswer(ans);
    const opts = [ans];
    while (opts.length < 4) {
      const r = Math.floor(Math.random() * 11);
      if (!opts.includes(r)) opts.push(r);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
    setFeedback(null);
  }, []);

  useEffect(() => { generateQuestion(); }, [generateQuestion]);

  const handleAnswer = (num: number) => {
    if (num === answer) {
      setFeedback('correct');
      setScore(s => s + 1);
      setStreak(s => s + 1);
      addStar();
      setTimeout(generateQuestion, 1200);
    } else {
      setFeedback('wrong');
      setStreak(0);
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <div className="max-w-lg mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">➕ Adunări și Scăderi</h2>
      <p className="text-lg text-gray-600 mb-2">Scor: {score} ⭐ {streak >= 3 && `🔥 Serie: ${streak}!`}</p>
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
        <p className="text-xl text-gray-600 mb-6">Cât face?</p>
        <div className="text-5xl md:text-6xl font-bold text-green-700 mb-8 flex items-center justify-center gap-4">
          <span className="bg-green-100 rounded-2xl px-6 py-4">{num1}</span>
          <span className="text-green-500">{operation}</span>
          <span className="bg-green-100 rounded-2xl px-6 py-4">{num2}</span>
          <span className="text-green-500">=</span>
          <span className="text-green-400">?</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className={`text-3xl font-bold py-4 px-6 rounded-2xl shadow-md transition-all hover:scale-105 ${
                feedback === 'correct' && opt === answer
                  ? 'bg-green-400 text-white'
                  : feedback === 'wrong' && opt !== answer
                  ? 'bg-gray-200 text-gray-400'
                  : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {feedback === 'correct' && (
          <div className="mt-4 text-2xl text-green-600 font-bold animate-bounce">
            🎉 Corect! Ești deștept!
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="mt-4 text-xl text-orange-500 font-bold">
            🤔 Nu chiar... Încearcă din nou!
          </div>
        )}
      </div>
    </div>
  );
}

// ============ ANIMAL GAME ============
function AnimalGame({ addStar }: { addStar: () => void }) {
  const animals = [
    { name: 'Câine', emoji: '🐕', sound: 'Ham-ham!', hint: 'Cel mai bun prieten al omului' },
    { name: 'Pisică', emoji: '🐱', sound: 'Miau-miau!', hint: 'Are mustăți și toarce' },
    { name: 'Vacă', emoji: '🐄', sound: 'Muuu!', hint: 'Ne dă lapte' },
    { name: 'Oaie', emoji: '🐑', sound: 'Beee!', hint: 'Are lână moale' },
    { name: 'Cal', emoji: '🐴', sound: 'Iiiiih!', hint: 'Pe el călărim' },
    { name: 'Porc', emoji: '🐷', sound: 'Oink-oink!', hint: 'Îi place noroiul' },
    { name: 'Găină', emoji: '🐔', sound: 'Cot-codac!', hint: 'Face ouă' },
    { name: 'Rață', emoji: '🦆', sound: 'Mac-mac!', hint: 'Înoată în baltă' },
    { name: 'Leu', emoji: '🦁', sound: 'Roooar!', hint: 'Regele junglei' },
    { name: 'Elefant', emoji: '🐘', sound: 'Puuuuh!', hint: 'Are trompă lungă' },
    { name: 'Maimuță', emoji: '🐵', sound: 'Uuh-uuh!', hint: 'Se cațără în copaci' },
    { name: 'Pește', emoji: '🐟', sound: '...', hint: 'Trăiește în apă' },
    { name: 'Broască', emoji: '🐸', sound: 'Oac-oac!', hint: 'Sare și înoată' },
    { name: 'Urs', emoji: '🐻', sound: 'Groaar!', hint: 'Doarme iarna' },
    { name: 'Iepure', emoji: '🐰', sound: '...', hint: 'Are urechi lungi' },
    { name: 'Pasăre', emoji: '🐦', sound: 'Cirip-cirip!', hint: 'Zboară în cer' },
  ];

  const [currentAnimal, setCurrentAnimal] = useState(animals[0]);
  const [options, setOptions] = useState<typeof animals>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [questionType, setQuestionType] = useState<'emoji' | 'sound' | 'hint'>('emoji');

  const generateQuestion = useCallback(() => {
    const animal = animals[Math.floor(Math.random() * animals.length)];
    setCurrentAnimal(animal);
    const opts = [animal];
    while (opts.length < 4) {
      const r = animals[Math.floor(Math.random() * animals.length)];
      if (!opts.find(o => o.name === r.name)) opts.push(r);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
    setFeedback(null);
    setShowHint(false);
    const types: ('emoji' | 'sound' | 'hint')[] = ['emoji', 'sound', 'hint'];
    setQuestionType(types[Math.floor(Math.random() * types.length)]);
  }, []);

  useEffect(() => { generateQuestion(); }, [generateQuestion]);

  const handleAnswer = (name: string) => {
    if (name === currentAnimal.name) {
      setFeedback('correct');
      setScore(s => s + 1);
      addStar();
      setTimeout(generateQuestion, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <div className="max-w-lg mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">🐾 Ghicește Animalul</h2>
      <p className="text-lg text-gray-600 mb-4">Scor: {score} ⭐</p>
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
        {questionType === 'emoji' && (
          <>
            <p className="text-xl text-gray-600 mb-4">Ce animal este?</p>
            <div className="text-8xl mb-6 animate-bounce">{currentAnimal.emoji}</div>
          </>
        )}
        {questionType === 'sound' && (
          <>
            <p className="text-xl text-gray-600 mb-4">Ce animal face acest sunet?</p>
            <div className="text-4xl font-bold text-amber-600 mb-6 bg-amber-50 rounded-2xl p-6">
              "{currentAnimal.sound}" 🔊
            </div>
          </>
        )}
        {questionType === 'hint' && (
          <>
            <p className="text-xl text-gray-600 mb-4">Ghicește animalul după indiciu:</p>
            <div className="text-2xl text-amber-700 mb-6 bg-amber-50 rounded-2xl p-6">
              💡 {currentAnimal.hint}
            </div>
          </>
        )}
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-sm text-gray-400 hover:text-gray-600 mb-4 underline"
        >
          {showHint ? 'Ascunde indiciul' : 'Arată indiciul'}
        </button>
        {showHint && (
          <p className="text-lg text-gray-500 mb-4">💡 {currentAnimal.hint}</p>
        )}
        <div className="grid grid-cols-2 gap-4">
          {options.map(opt => (
            <button
              key={opt.name}
              onClick={() => handleAnswer(opt.name)}
              className={`text-xl font-bold py-4 px-4 rounded-2xl shadow-md transition-all hover:scale-105 ${
                feedback === 'correct' && opt.name === currentAnimal.name
                  ? 'bg-green-400 text-white'
                  : feedback === 'wrong' && opt.name !== currentAnimal.name
                  ? 'bg-gray-200 text-gray-400'
                  : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              }`}
            >
              {feedback === 'correct' && opt.name === currentAnimal.name ? opt.emoji : ''} {opt.name}
            </button>
          ))}
        </div>
        {feedback === 'correct' && (
          <div className="mt-4 text-2xl text-green-600 font-bold animate-bounce">
            🎉 {currentAnimal.emoji} {currentAnimal.name}! {currentAnimal.sound}
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="mt-4 text-xl text-orange-500 font-bold">
            🤔 Încearcă din nou!
          </div>
        )}
      </div>
    </div>
  );
}

// ============ HANGMAN GAME ============
function HangmanGame({ addStar }: { addStar: () => void }) {
  const words = [
    { word: 'CASA', hint: '🏠 Locuința noastră' },
    { word: 'SOARE', hint: '☀️ Strălucește pe cer' },
    { word: 'MAR', hint: '🍎 Fruct roșu' },
    { word: 'LUNA', hint: '🌙 Strălucește noaptea' },
    { word: 'PESTE', hint: '🐟 Trăiește în apă' },
    { word: 'FLUTURE', hint: '🦋 Are aripi colorate' },
    { word: 'CINE', hint: '🐕 Cel mai bun prieten' },
    { word: 'PAIN', hint: '🍀 Înflorește primăvara' },
    { word: 'NOR', hint: '☁️ Plutește pe cer' },
    { word: 'STELE', hint: '⭐ Strălucesc noaptea' },
    { word: 'MASA', hint: '🪑 Mobilă pe care mâncăm' },
    { word: 'PESTE', hint: '🐟 Are solzi' },
    { word: 'LUP', hint: '🐺 Animal sălbatic' },
    { word: 'URS', hint: '🐻 Doarme iarna' },
    { word: 'APA', hint: '💧 O bem când ne e sete' },
  ];

  const [currentWord, setCurrentWord] = useState(words[0]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [score, setScore] = useState(0);
  const maxWrong = 6;

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const generateWord = useCallback(() => {
    const word = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(word);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameState('playing');
  }, []);

  useEffect(() => { generateWord(); }, [generateWord]);

  const handleGuess = (letter: string) => {
    if (gameState !== 'playing' || guessedLetters.includes(letter)) return;
    
    const newGuessed = [...guessedLetters, letter];
    setGuessedLetters(newGuessed);
    
    if (!currentWord.word.includes(letter)) {
      const newWrong = wrongGuesses + 1;
      setWrongGuesses(newWrong);
      if (newWrong >= maxWrong) {
        setGameState('lost');
      }
    } else {
      const allGuessed = currentWord.word.split('').every(l => newGuessed.includes(l));
      if (allGuessed) {
        setGameState('won');
        setScore(s => s + 1);
        addStar();
      }
    }
  };

  const hangmanParts = [
    '😵', // head
    '😰', // body
    '🦵', // left arm
    '🦵', // right arm
    '🦿', // left leg
    '🦿', // right leg
  ];

  return (
    <div className="max-w-lg mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">📝 Spânzurătoarea</h2>
      <p className="text-lg text-gray-600 mb-4">Scor: {score} ⭐</p>
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
        <p className="text-lg text-gray-500 mb-4">{currentWord.hint}</p>
        
        {/* Hangman display */}
        <div className="mb-4 flex justify-center gap-1 text-3xl">
          {hangmanParts.slice(0, wrongGuesses).map((part, i) => (
            <span key={i}>{part}</span>
          ))}
          {wrongGuesses === 0 && <span className="text-gray-300 text-lg">Nicio greșeală</span>}
        </div>
        
        <p className="text-sm text-gray-400 mb-4">Greșeli: {wrongGuesses}/{maxWrong}</p>
        
        {/* Word display */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {currentWord.word.split('').map((letter, i) => (
            <span
              key={i}
              className={`text-4xl font-bold w-12 h-14 flex items-center justify-center border-b-4 ${
                guessedLetters.includes(letter)
                  ? 'text-purple-600 border-purple-400'
                  : 'text-transparent border-gray-300'
              }`}
            >
              {guessedLetters.includes(letter) ? letter : '_'}
            </span>
          ))}
        </div>

        {/* Game state */}
        {gameState === 'won' && (
          <div className="mb-4">
            <div className="text-2xl text-green-600 font-bold animate-bounce mb-2">
              🎉 Ai câștigat!
            </div>
            <button
              onClick={generateWord}
              className="bg-green-500 text-white font-bold py-2 px-6 rounded-full hover:bg-green-600 transition-all"
            >
              Cuvânt nou ➡️
            </button>
          </div>
        )}
        {gameState === 'lost' && (
          <div className="mb-4">
            <div className="text-xl text-red-500 font-bold mb-2">
              😢 Cuvântul era: <span className="text-purple-600">{currentWord.word}</span>
            </div>
            <button
              onClick={generateWord}
              className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition-all"
            >
              Încearcă din nou 🔄
            </button>
          </div>
        )}

        {/* Alphabet buttons */}
        {gameState === 'playing' && (
          <div className="grid grid-cols-7 gap-2">
            {alphabet.map(letter => (
              <button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={guessedLetters.includes(letter)}
                className={`text-lg font-bold py-2 rounded-xl transition-all ${
                  guessedLetters.includes(letter)
                    ? currentWord.word.includes(letter)
                      ? 'bg-green-200 text-green-700'
                      : 'bg-red-200 text-red-400'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200 hover:scale-110'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============ COLOR GAME ============
function ColorGame({ addStar }: { addStar: () => void }) {
  const colors = [
    { name: 'Roșu', bg: 'bg-red-500', hex: '#ef4444' },
    { name: 'Albastru', bg: 'bg-blue-500', hex: '#3b82f6' },
    { name: 'Galben', bg: 'bg-yellow-400', hex: '#facc15' },
    { name: 'Verde', bg: 'bg-green-500', hex: '#22c55e' },
    { name: 'Portocaliu', bg: 'bg-orange-500', hex: '#f97316' },
    { name: 'Violet', bg: 'bg-purple-500', hex: '#a855f7' },
    { name: 'Roz', bg: 'bg-pink-400', hex: '#f472b6' },
    { name: 'Maro', bg: 'bg-amber-800', hex: '#92400e' },
    { name: 'Negru', bg: 'bg-gray-900', hex: '#111827' },
    { name: 'Alb', bg: 'bg-white border-2 border-gray-300', hex: '#ffffff' },
  ];

  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [options, setOptions] = useState<typeof colors>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [mode, setMode] = useState<'nameToColor' | 'colorToName'>('nameToColor');

  const generateQuestion = useCallback(() => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    setCurrentColor(color);
    const opts = [color];
    while (opts.length < 4) {
      const r = colors[Math.floor(Math.random() * colors.length)];
      if (!opts.find(o => o.name === r.name)) opts.push(r);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
    setFeedback(null);
    setMode(Math.random() > 0.5 ? 'nameToColor' : 'colorToName');
  }, []);

  useEffect(() => { generateQuestion(); }, [generateQuestion]);

  const handleAnswer = (name: string) => {
    if (name === currentColor.name) {
      setFeedback('correct');
      setScore(s => s + 1);
      addStar();
      setTimeout(generateQuestion, 1200);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <div className="max-w-lg mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">🎨 Învață Culorile</h2>
      <p className="text-lg text-gray-600 mb-4">Scor: {score} ⭐</p>
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
        {mode === 'nameToColor' ? (
          <>
            <p className="text-xl text-gray-600 mb-4">Arată culoarea:</p>
            <div className="text-4xl font-bold mb-6 text-gray-800">{currentColor.name}</div>
            <div className="grid grid-cols-2 gap-4">
              {options.map(opt => (
                <button
                  key={opt.name}
                  onClick={() => handleAnswer(opt.name)}
                  className={`h-24 rounded-2xl shadow-md transition-all hover:scale-105 ${opt.bg} ${
                    feedback === 'correct' && opt.name === currentColor.name
                      ? 'ring-4 ring-green-400'
                      : ''
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-xl text-gray-600 mb-4">Ce culoare este?</p>
            <div className={`w-32 h-32 mx-auto rounded-3xl shadow-lg mb-6 ${currentColor.bg}`} />
            <div className="grid grid-cols-2 gap-4">
              {options.map(opt => (
                <button
                  key={opt.name}
                  onClick={() => handleAnswer(opt.name)}
                  className={`text-xl font-bold py-4 px-4 rounded-2xl shadow-md transition-all hover:scale-105 ${
                    feedback === 'correct' && opt.name === currentColor.name
                      ? 'bg-green-400 text-white'
                      : feedback === 'wrong' && opt.name !== currentColor.name
                      ? 'bg-gray-200 text-gray-400'
                      : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                  }`}
                >
                  {opt.name}
                </button>
              ))}
            </div>
          </>
        )}
        {feedback === 'correct' && (
          <div className="mt-4 text-2xl text-green-600 font-bold animate-bounce">
            🎉 Super! Este {currentColor.name}!
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="mt-4 text-xl text-orange-500 font-bold">
            🤔 Încearcă din nou!
          </div>
        )}
      </div>
    </div>
  );
}

// ============ SHAPE GAME ============
function ShapeGame({ addStar }: { addStar: () => void }) {
  const shapes = [
    { name: 'Cerc', svg: <circle cx="50" cy="50" r="40" fill="currentColor" /> },
    { name: 'Pătrat', svg: <rect x="10" y="10" width="80" height="80" fill="currentColor" /> },
    { name: 'Triunghi', svg: <polygon points="50,10 90,90 10,90" fill="currentColor" /> },
    { name: 'Dreptunghi', svg: <rect x="5" y="25" width="90" height="50" fill="currentColor" /> },
    { name: 'Stea', svg: <polygon points="50,5 61,35 95,35 68,57 79,90 50,70 21,90 32,57 5,35 39,35" fill="currentColor" /> },
    { name: 'Inimă', svg: <path d="M50,88 C25,65 5,50 5,30 C5,15 17,5 30,5 C40,5 47,12 50,18 C53,12 60,5 70,5 C83,5 95,15 95,30 C95,50 75,65 50,88Z" fill="currentColor" /> },
    { name: 'Oval', svg: <ellipse cx="50" cy="50" rx="45" ry="30" fill="currentColor" /> },
    { name: 'Rombo', svg: <polygon points="50,5 95,50 50,95 5,50" fill="currentColor" /> },
  ];

  const [currentShape, setCurrentShape] = useState(shapes[0]);
  const [options, setOptions] = useState<typeof shapes>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  const generateQuestion = useCallback(() => {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    setCurrentShape(shape);
    const opts = [shape];
    while (opts.length < 4) {
      const r = shapes[Math.floor(Math.random() * shapes.length)];
      if (!opts.find(o => o.name === r.name)) opts.push(r);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
    setFeedback(null);
  }, []);

  useEffect(() => { generateQuestion(); }, [generateQuestion]);

  const handleAnswer = (name: string) => {
    if (name === currentShape.name) {
      setFeedback('correct');
      setScore(s => s + 1);
      addStar();
      setTimeout(generateQuestion, 1200);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const shapeColors = ['text-indigo-500', 'text-blue-500', 'text-cyan-500', 'text-teal-500'];
  const randomColor = shapeColors[Math.floor(Math.random() * shapeColors.length)];

  return (
    <div className="max-w-lg mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">🔷 Recunoaște Formele</h2>
      <p className="text-lg text-gray-600 mb-4">Scor: {score} ⭐</p>
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
        <p className="text-xl text-gray-600 mb-4">Ce formă este aceasta?</p>
        <div className={`w-32 h-32 mx-auto mb-6 ${randomColor}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {currentShape.svg}
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {options.map(opt => (
            <button
              key={opt.name}
              onClick={() => handleAnswer(opt.name)}
              className={`text-xl font-bold py-4 px-4 rounded-2xl shadow-md transition-all hover:scale-105 ${
                feedback === 'correct' && opt.name === currentShape.name
                  ? 'bg-green-400 text-white'
                  : feedback === 'wrong' && opt.name !== currentShape.name
                  ? 'bg-gray-200 text-gray-400'
                  : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              }`}
            >
              {opt.name}
            </button>
          ))}
        </div>
        {feedback === 'correct' && (
          <div className="mt-4 text-2xl text-green-600 font-bold animate-bounce">
            🎉 Corect! Este un {currentShape.name}!
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="mt-4 text-xl text-orange-500 font-bold">
            🤔 Încearcă din nou!
          </div>
        )}
      </div>
    </div>
  );
}
