import React, { useState } from 'react';
import axios from 'axios';
// import inputs like in login page

function SignUp() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMsg, setErrorMsg ] = useState('');
    

    const handleSubmit = (event) => {
        
        event.preventDefault();
        axios({
            method: 'POST',
            url: '/users/createAccount',
            data: {
                email: email,
                pass: password
            }
        })
        .then((response) => {
            console.log(response.status)
        })
        .catch(err => {
            if (err) {
                setErrorMsg('Email already exists');
                setEmail('');
                setPassword('');
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email:
                    <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                </label>
                <label>Password:
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                </label>
                <input type="submit" value="Sign Up">

                </input>
            </form>
            <p>{errorMsg}</p>
        </div>
    )
}

export default SignUp;