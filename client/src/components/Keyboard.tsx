import "../index.css"
// const KEYS = [
//     "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
//     "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
//     "u", "v", "w", "x", "y", "z",
// ];
// type KeyboardProps = {
//     disabled?: boolean
//     activeLetters: string[]
//     inactiveLetters: string[]
//     addGuessedLetter: (letter: string) => void
// }
// export function Keyboard({ disabled=false, activeLetters, inactiveLetters, addGuessedLetter }: KeyboardProps) {
//     return (
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))", gap: ".5rem", textTransform: "uppercase", width:"100%" }}>
//             {KEYS.map(key => {
//                 const isActive = activeLetters.includes(key);
//                 const isInactive = inactiveLetters.includes(key);
//                 return (
//                     <button
//                     style={{textTransform:"uppercase"}}
//                         onClick={() => addGuessedLetter(key)} 
//                         className={`key ${isActive ? "rightletter" : ""} ${isInactive ? "wrongletter" : ""}`}
//                         key={key}
//                         disabled={isInactive || isActive || disabled} 
//                     >
//                         {key}
//                     </button>
//                 );
//             })}
//         </div>
//     );
// }

const KEYS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

type KeyboardProps = {
  disabled?: boolean;
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
};

export function Keyboard({ disabled = false, activeLetters, inactiveLetters, addGuessedLetter }: KeyboardProps) {
  return (
    <div className="keyboard-container">
      {KEYS.map((row, index) => (
        <div className="keyboard-row" key={index}>
          {row.map(key => {
            const isActive = activeLetters.includes(key);
            const isInactive = inactiveLetters.includes(key);
            return (
              <button
                onClick={() => addGuessedLetter(key)}
                className={`key ${isActive ? 'rightletter' : ''} ${isInactive ? 'wrongletter' : ''}`}
                key={key}
                disabled={isInactive || isActive || disabled}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}


