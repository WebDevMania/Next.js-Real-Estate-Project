'use client'

import React, { useEffect, useState } from 'react'
import classes from './details.module.css'
import Image from 'next/image'
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'
import { FaBed } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import { countries, types } from '@/components/searchModal/searchModalData'
import EditModal from '@/components/editModal/EditModal'
import { useRouter } from 'next/navigation'

const PropertyDetails = (ctx) => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [property, setProperty] = useState("")
  const { data: session } = useSession()
  const router = useRouter()
  const id = ctx.params.id

  useEffect(() => {
    async function fetchProperty() {
      const res = await fetch(`http://localhost:3000/api/property/${id}`, {
        headers: {
          "Authorization": `Bearer ${session?.user?.accessToken}`
        },
        method: "GET"
      })

      const data = await res.json()

      setProperty(data)
    }
    session && fetchProperty()
  }, [session])

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/property/${id}`, {
        headers: {
          "Authorization": `Bearer ${session?.user?.accessToken}`
        },
        method: "DELETE"
      })

      if (res.ok) {
        router.push('/')
      } else {
        throw new Error("Couldn't delete the property")
      }
    } catch (error) {
      console.error(error)
    }
  }


  const handleOpenEditModal = () => setShowEditModal(prev => true)
  const handleHideEditModal = () => setShowEditModal(prev => false)


  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.imageContainer}>
          <Image
            src={property?.img}
            height={"750"}
            width={"1000"}
          />
          <span className={classes.category}>{property?.type}</span>
          <div className={classes.propertyData}>
            <div className={classes.propertySection}>
              <h2 className={classes.title}>{property?.title}</h2>
              {session?.user?._id.toString() === property?.currentOwner?._id.toString() && (
                <div className={classes.controls}>
                  <button onClick={handleOpenEditModal}>
                    <BsFillPencilFill />
                  </button>
                  <button onClick={handleDelete}>
                    <BsFillTrashFill />
                  </button>
                </div>
              )}
            </div>
            <div className={classes.propertySection}>
              <h5 className={classes.country}>{property?.country}</h5>
              <span className={classes.type}>{property?.type}</span>
            </div>
            <div className={classes.propertySection}>
              <h5 className={classes.sqmeters}>Sq. meters {property?.sqmeters}</h5>
              <span className={classes.beds}>
                {property?.beds}
                <FaBed />
              </span>
            </div>
            <div className={classes.propertySection}>
              <span className={classes.price}>
                Price: ${property?.price}
              </span>
            </div>
          </div>
        </div>
      </div>
      {showEditModal && (
        <EditModal
          handleHideEditModal={handleHideEditModal}
          property={property}
          id={id}
        />
      )}
    </div>
  )
}

export default PropertyDetails