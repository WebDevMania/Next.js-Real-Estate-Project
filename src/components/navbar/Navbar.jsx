'use client'
import React, { useState } from 'react'
import classes from './navbar.module.css'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import ListModal from '../listModal/ListModal'

const Navbar = () => {
    const page = usePathname()
    const { data: session } = useSession()
    const [showListModal, setShowListModal] = useState(false)

    const handleShowListModal = () => setShowListModal(prev => true)
    const handleHideListModal = () => setShowListModal(prev => false)

    if (page.includes('login') || page.includes('register')) return null

    return (
        <header className={classes.container}>
            <nav className={classes.wrapper}>
                <Link className={classes.left} href='/'>
                    <h2>
                        WebDevMania
                    </h2>
                </Link>
                <div className={classes.right}>
                    {session?.user?.email != null ? (
                        <>
                            <span className={classes.username}>
                                {session?.user?.email}
                            </span>
                            <button onClick={() => signOut()} className={classes.logoutBtn}>
                                Logout
                            </button>
                            <span className={classes.list} onClick={handleShowListModal}>List</span>
                            {showListModal && (
                                <ListModal
                                    handleHideListModal={handleHideListModal}
                                />
                            )}
                        </>
                    ) : (
                        <>
                            <span>Hello guest!</span>
                            <button onClick={() => signIn()} className={classes.login}>Log in</button>
                            <Link className={classes.register} href='/register'>Register</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar