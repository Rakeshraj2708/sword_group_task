import React, { useState } from 'react'
import './LoginSignUp.css'
import { FaUser } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const toggleAction = () => {
        navigate('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const url =  'https://reqres.in/api/login';

     

        try {
            setIsLoading(true);
            const response = await axios.post(url, {
                email, 
                password
            });

            if (response.status === 200) {
                localStorage.setItem('isLoggedIn', true);
                navigate('/user-list');
                
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || "Request failed");
            } else {
                setError("An error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container">
            <div className="header">
                <div className="text">
                   Login
                </div> 
                <div className="underline"></div>
                <div className="inputs">
                    <div className="input">
                        <FaUser className='icon' />
                        <input 
                            type="email" 
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input">
                        <RiLockPasswordFill className='icon' />
                        <input 
                            type="password" 
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <span className='loginLink' >
                     Don't have an account? <a onClick={toggleAction}> Sign Up </a> here 
                </span>
                <div className="submit-container">
                    <button type='submit' className="submit" disabled={isLoading}>
                        Login
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Login;
