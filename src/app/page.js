"use client"
import classes from './page.module.css'
import Hero from '@/components/hero/Hero'
import Properties from '@/components/properties/Properties'
import { useEffect, useState } from 'react'

export default function Home() {
  const [estates, setEstates] = useState([])

  useEffect(() => {
    const fetchEstates = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/property")
            const data = await res.json()

            setEstates(data)
        } catch (error) {
            console.log(error)
        }
    }
    fetchEstates()
}, [])

  return (
    <main className={classes.main}>
      <Hero />
      <Properties estates={estates}/>
    </main>
  )
}
