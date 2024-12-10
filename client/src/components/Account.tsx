import React , {useState} from "react";
import { Link } from "react-router-dom";



const Account = () => {

    const [username, setUsername] = useState('user')
    const [newUsername, setNewUsername] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    const handleUsernameChange = () => {
        if(newUsername.trim()) {
            setNewUsername(newUsername)
            setUsername('')
            setIsEditing(false)
        } else {
            alert('Username cannot be empty!')
        }
    }

    return (
        <div className="accountPage">
            <Link to="/hangman">
            <button id="returnToGame">Back to the game</button>
            </Link>

            <h2>Account Page</h2>
            <p>Welcome {username}!</p>

            {isEditing ? (
                <div>
                    <h3>Enter New Username:</h3>
                    <div>
                    <input
                    type = "test"
                    placeholder = "New Username"
                    value = {newUsername}
                    onChange = {(e) => setNewUsername(e.target.value)}
                    />
                    </div>
                    
                    <button onClick = {handleUsernameChange}>Save Username</button>
                    <button onClick = {() => setIsEditing(false)}>Cancel</button>
                    </div>
                    
            ) :(
                <div>
                    <button onClick = {() => setIsEditing(true)}>Change Username</button>
                </div>
            )}
        </div>
    )
}

export default Account;