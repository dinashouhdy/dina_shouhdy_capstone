import React, { useState } from 'react';
import axios from 'axios';
import './Homepage.scss';

const signupUrl = 'http://localhost:3000/';

function Homepage() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [isSignedUp, setIsSignedUp] = useState(false);    
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(signupUrl, {
                username: formData.username,
                password: formData.password
            });
            
            if (response.status === 200) {
                setIsSignedUp(true);
                setErrorMessage("");
            }
        } catch (error) {
            console.error("Signup error:", error);
            setErrorMessage("Signup failed. Please try again.");
        }
        console.log(formData);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (isSignedUp) {
    //         handleLogin(e);
    //     } else {
    //         handleSignup(e);
    //     }
    // };

    return (
        <section className='homepage'>
          <form className='homepage__form' onSubmit={handleSubmit}>
            <div className='homepage__form__usernameDiv'>
                <label htmlFor="username">Username:</label>
                <br />
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
            </div>
            <div className='homepage__form__passwordDiv'>
                <label htmlFor="password">Password:</label>
                <br />
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <button className='homepage__form__button' type="submit">
                {isSignedUp ? "Log in" : "Sign up"}
            </button>
            {errorMessage && <p className='error'>{errorMessage}</p>}
          </form>
        </section>
    );
}

export default Homepage;