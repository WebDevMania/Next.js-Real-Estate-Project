'use client'

import React, { useState } from 'react'
import classes from './register.module.css'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const Register = () => {
    const router = useRouter()
    const [state, setState] = useState({})
    const responseType = {
        error: "error",
        success: "success"
    }

    const handleChange = (e) => {
        setState(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (state.password === '' || state.email === '') {
            toast.error("Fill all fields!")
            return
        }

        if (state.password.length < 6) {
            notify("Password must be at least 6 characters long", responseType.error)
            return
        }

        try {
            const res = await fetch('http://localhost:3000/api/register', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ username: state.username, email: state.email, password: state.password })
            })
            if (res?.error == null) {
                notify("Successfully registered, now login", responseType.success)
                const data = await res.json()
                console.log(data)
                setTimeout(() => {
                    router.push("/login")
                }, 1000)
            } else {
                notify("Error occured while registring", responseType.error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function notify(text, response) {
        toast[response](text)
    }


    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h2>Register Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className={classes.inputWrapper}>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" onChange={handleChange} />
                    </div>
                    <div className={classes.inputWrapper}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={handleChange} />
                    </div>
                    <div className={classes.inputWrapper}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={handleChange} />
                    </div>
                    <button className={classes.registerBtn}>Register</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Register