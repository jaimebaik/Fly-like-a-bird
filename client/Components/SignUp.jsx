import React, { useState } from 'react';
import axios from 'axios';
import { Input } from "@chakra-ui/react";
import { Link, Redirect } from 'react-router-dom';
// import inputs like in login page

function SignUp() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

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
            console.log('the response from signin is', response)
            if (response.status === 200) {
                console.log("we've reached the response status 200");
                //redirect to Main using react route link
                setIsLoggedIn(true);
            }
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
            {/* is loggedIn === true --> redirect */}
            {isLoggedIn === true ? 
                <Redirect to="/main" /> : 
                <h1>Create account</h1>
            }
            <form onSubmit={handleSubmit}>
                <label>Email:
                    <Input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }}></Input>
                </label>
                <label>Password:
                    <Input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }}></Input>
                </label>
                <Input type="submit" value="Sign Up">

                </Input>
            </form>
            <p>{errorMsg}</p>
        </div>
    )
}

export default SignUp;