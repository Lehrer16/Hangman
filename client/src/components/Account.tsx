import React , {useState} from "react";



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
        <div>
            <h2>Account Page</h2>
            <p>Welcome {username}!</p>

            {isEditing ? (
                <div>
                    <input
                    type = "test"
                    placeholder = "New Username"
                    value = {newUsername}
                    onChange = {(e) => setNewUsername(e.target.value)}
                    />
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