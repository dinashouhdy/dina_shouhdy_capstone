import React, { useState } from 'react';
import './Homepage.scss';

function Homepage() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // ADD REQUEST HERE
        console.log(formData);
    };

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
            <button className='homepage__form__button' type="submit">Sign up / Log in</button>
          </form>
        </section>
    );
}

export default Homepage;