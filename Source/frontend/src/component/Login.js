import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Login.css'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Khởi tạo useNavigate

    useEffect(() => {
        // Mã JavaScript của bạn ở đây
        const switchers = [...document.querySelectorAll('.switcher')]

        switchers.forEach(item => {
            item.addEventListener('click', function() {
                switchers.forEach(item => item.parentElement.classList.remove('is-active'))
                this.parentElement.classList.add('is-active')
            })
        })

        // Có thể thêm mã khác vào đây
        console.log('Component mounted!');
        
        // Cleanup (nếu cần)
        return () => {
            console.log('Component unmounted!');
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Lưu token vào localStorage
                setMessage("Login successful!");
                navigate('/home'); // Chuyển hướng sang trang Home sau khi đăng nhập thành công
            } else {
                const errorData = await response.json();
                setMessage(errorData.message);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <section class="forms-section">
            <h1 class="section-title">Animated Forms</h1>
            <div class="forms">
                <div class="form-wrapper is-active">
                <button type="button" class="switcher switcher-login">
                    Login
                    <span class="underline"></span>
                </button>
                <form class="form form-login" onSubmit={handleLogin}>
                    {message && <p>{message}</p>}
                    <fieldset>
                    <legend>Please, enter your email and password for login.</legend>
                    <div class="input-block">
                        <label for="login-email">E-mail</label>
                        <input id="login-email" type="email" required onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div class="input-block">
                        <label for="login-password">Password</label>
                        <input id="login-password" type="password" required onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    </fieldset>
                    <button type="submit" class="btn-login">Login</button>
                </form>
                </div>
                <div class="form-wrapper">
                <button type="button" class="switcher switcher-signup">
                    Sign Up
                    <span class="underline"></span>
                </button>
                <form class="form form-signup">
                    <fieldset>
                    <legend>Please, enter your email, password and password confirmation for sign up.</legend>
                    <div class="input-block">
                        <label for="signup-email">E-mail</label>
                        <input id="signup-email" type="email" required/>
                    </div>
                    <div class="input-block">
                        <label for="signup-password">Password</label>
                        <input id="signup-password" type="password" required/>
                    </div>
                    <div class="input-block">
                        <label for="signup-password-confirm">Confirm password</label>
                        <input id="signup-password-confirm" type="password" required/>
                    </div>
                    </fieldset>
                    <button type="submit" class="btn-signup">Continue</button>
                </form>
                </div>
            </div>
            </section>
    );
}

export default Login;
