// import { useCallback, useEffect, useState } from 'react';
// import words from '../assets/wordList.json';
// import { HangmanDrawing } from '../components/HangmanDrawing';
// import { HangmanWord } from '../components/HangmanWord';
// import { Keyboard } from '../components/Keyboard';
// import Navbar from '../components/Navbar';

// const Hangman = () => {
//   const [wordToGuess, setWordToGuess] = useState(() => {
//     return words[Math.floor(Math.random() * words.length)];
//   });

//   const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

//   const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

//   const isLoser = incorrectLetters.length >= 6;
//   const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter));

//   const addGuessedLetter = useCallback((letter: string) => {
//     if (guessedLetters.includes(letter) || isLoser || isWinner) return;
//     setGuessedLetters(currentLetters => [...currentLetters, letter]);
//   }, [guessedLetters, isWinner, isLoser]);

//   const refreshPage = () => {
//     window.location.reload();
//   };

//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => {
//       const key = e.key;
//       if (!key.match(/^[a-z]$/)) return;
//       e.preventDefault();
//       addGuessedLetter(key);
//     };

//     document.addEventListener("keypress", handler);

//     return () => {
//       document.removeEventListener("keypress", handler);
//     };
//   }, [guessedLetters, addGuessedLetter]);

//   return (
//     <>
//       <Navbar />
//       <div
//         className="hangman"
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "85vh",
//           gap: "1rem",
//           textAlign: "center",
//           padding: "1rem",
//         }}
//       >
//         <div style={{ fontSize: "calc(1.5rem + 1vw)" }}>
//           {isWinner && "You Win! - Refresh to try again!"}
//           {isLoser && "You Lose! :( - Refresh to try again!"}
//         </div>

//         <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
//         <HangmanWord
//           reveal={isLoser}
//           guessedLetters={guessedLetters}
//           wordToGuess={wordToGuess}
//         />
//         <Keyboard
//           disabled={isWinner || isLoser}
//           activeLetters={guessedLetters.filter((letter) => wordToGuess.includes(letter))}
//           inactiveLetters={incorrectLetters}
//           addGuessedLetter={addGuessedLetter}
//         />

//         <button onClick={refreshPage} style={{ padding: '10px 20px', fontSize: '1rem' }}>
//           New Game
//         </button>
//       </div>
//     </>
//   );
// };

// export default Hangman;

import { useCallback, useEffect, useState } from 'react';
import words from '../assets/wordList.json';
import { HangmanDrawing } from '../components/HangmanDrawing';
import { HangmanWord } from '../components/HangmanWord';
import { Keyboard } from '../components/Keyboard';
import Navbar from '../components/Navbar';

const Hangman = () => {
  const [wordToGuess, setWordToGuess] = useState(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    return randomWord || "default"; // Fallback for empty word list
  });

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every((letter) =>
    guessedLetters.includes(letter)
  );

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  const startNewGame = () => {
    setWordToGuess(words[Math.floor(Math.random() * words.length)] || "default");
    setGuessedLetters([]);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [addGuessedLetter]);

  return (
    <>
      <Navbar />
      <div
        className="hangman"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "85vh",
          gap: "1rem",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <div style={{ fontSize: "calc(1.5rem + 1vw)" }}>
          {isWinner && "🎉You Win! - Refresh to try again!"}
          {isLoser && `❌ You Lose! - Refresh to try again!`}
        </div>

        <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
        <HangmanWord
          reveal={isLoser}
          guessedLetters={guessedLetters}
          wordToGuess={wordToGuess}
        />
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />

        <button
          onClick={startNewGame}
          style={{ padding: "10px 20px", fontSize: "1rem" }}
        >
          New Game
        </button>
      </div>
    </>
  );
};

export default Hangman;



