import '../index.css'
import { Link } from "react-router-dom";


const Hiscores = () => {
 

  return (
    <div className='box'>
            <Link to="/hangman">
                <button id="returnToGame">Back to the game</button>
            </Link>
      <h1>Hi-Scores</h1>
    </div>
  );
};

export default Hiscores;
