import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import classes from './propertyCard.module.css'

const PropertyCard = ({
  property
}) => {
  const detailsPageUrl = `/details/${property?._id}`


  return (
    <Link className={classes.container} href={detailsPageUrl}>
      <div className={classes.wrapper}>
        <div className={classes.imageContainer}>
          <Image
            src={property?.img}
            width="350"
            height="300"
          />
          <span className={classes.propertyCategory}>
            {property?.type}
          </span>
          <div className={classes.propertyData}>
            <h5>{property?.title}</h5>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PropertyCard