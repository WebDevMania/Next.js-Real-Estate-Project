'use client'

import React, { useState } from 'react'
import classes from './login.module.css'
import { ToastContainer, toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const Login = () => {
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
            const res = await signIn('credentials', { email: state.email, password: state.password, redirect: false })

            console.log(res)

            if (res?.error == null) {
                notify("Successfully logged, enjoy your browsing", responseType.success)
                setTimeout(() => {
                    router.push("/")
                }, 1000)
            } else {
                notify("Error occured while logging", responseType.error)
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
                <h2>Login Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className={classes.inputWrapper}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={handleChange} />
                    </div>
                    <div className={classes.inputWrapper}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={handleChange} />
                    </div>
                    <button className={classes.loginBtn}>Login</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Login