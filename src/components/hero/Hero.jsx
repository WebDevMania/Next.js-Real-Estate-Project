'use client'
import React, { useState } from 'react'
import classes from './hero.module.css'
import estate1 from '../../assets/estate1.jpg'
import Image from 'next/image'
import SearchModal from '../searchModal/SearchModal'
import { AiFillHome } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { TiTick } from 'react-icons/ti'

const Hero = () => {
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => setShowModal(prev => true)
    const handleHideModal = () => setShowModal(prev => false)

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.left}>
                    <div className={classes.titles}>
                        <h2 className={classes.mainTitle}>
                            Browse through our list of properties
                        </h2>
                        <h5 className={classes.secondaryTitle}>
                            We offer a wide variety of houses and apartments
                        </h5>
                    </div>
                    <p className={classes.desc}>
                        From villas in Italy to apartments in Norway, we've got you covered
                        <br />
                        Getting an estate has never been smoother
                    </p>
                    <div className={classes.results}>
                        <div className={classes.result}>
                            <span>Over 5000 properties</span>
                            <AiFillHome size={20} />
                        </div>
                        <div className={classes.result}>
                            <span>Over 2000 customers</span>
                            <BsFillPersonFill size={20} />
                        </div>
                        <div className={classes.result}>
                            <span>Over 5 types of estates</span>
                            <TiTick size={20} />
                        </div>
                    </div>
                    <div className={classes.search}>
                        <button className={classes.searchBtn} onClick={handleShowModal}>
                            Click to search
                        </button>
                        {showModal && <SearchModal handleHideModal={handleHideModal} />}
                    </div>
                </div>
                <div className={classes.right}>
                    <Image
                        src={estate1}
                        width="500"
                        height="700"
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero
