import { useCallback, useEffect, useState } from 'react';
import words from '../assets/wordList.json'
import { HangmanDrawing } from '../components/HangmanDrawing';
import { HangmanWord } from '../components/HangmanWord';
import { Keyboard } from '../components/Keyboard';
import Navbar from '../components/Navbar';


const Hangman = () => {
  const [wordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })

  const[guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback((letter: string) =>{
    if (guessedLetters.includes(letter) || isLoser || isWinner) return
    setGuessedLetters(currentLetters => [ ...currentLetters, letter])
  }, [guessedLetters, isWinner, isLoser])

  const refreshPage = () => { window.location.reload();};


  
useEffect(()=>{
  const handler = (e: KeyboardEvent) => {
    const key = e.key

    if (!key.match(/^[a-z]$/)) return

    e.preventDefault()
    addGuessedLetter(key)
  }

  document.addEventListener("keypress", handler)

  return () => {
    document.removeEventListener("keypress",handler)
  }
}, [guessedLetters])

  return (

    <div className='hangman'
    style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      justifyContent:"center",
      gap: "2rem",
      margin: "0, auto",
      alignItems: "center"
    }}
    >
        <div style={{ fontSize: "2rem", textAlign: "center"}}>
          {isWinner && "You Win! - Click 'New Game' to try again!"} 
          {isLoser && "You Lose! :( - Click 'New Game' to try again!"}
          <button onClick={refreshPage} style={{ padding: '10px 20px', fontSize: '1rem' }}> New Game </button>
        </div>
      
      <Navbar />
      <HangmanDrawing 

      numberOfGuesses={incorrectLetters.length}/>

      <HangmanWord
      reveal={isLoser}
      guessedLetters={guessedLetters} 
      wordToGuess={wordToGuess}/>
      <div style={{ alignSelf: "stretch"}}>

      <Keyboard

      disabled={isWinner || isLoser}
      activeLetters={guessedLetters.filter(letter =>
        wordToGuess.includes(letter)
      )}
      inactiveLetters={incorrectLetters}
      addGuessedLetter={addGuessedLetter}
      />
      </div>
    </div>
  );
};

export default Hangman;