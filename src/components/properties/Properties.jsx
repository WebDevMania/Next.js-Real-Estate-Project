"use client"
import React, { useEffect, useState } from 'react'
import classes from './properties.module.css'
import PropertyCard from '../propertyCard/PropertyCard'


const Properties = ({
    estates
}) => {

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.titles}>
                    <h2 className={classes.mainTitle}>
                        Most viewed properties
                    </h2>
                    <h5 className={classes.secondaryTitle}>
                        Check them out
                    </h5>
                </div>
                <div className={classes.propertyContainer}>
                    {estates?.length > 0
                        ? estates?.map((propertyData) => {
                            return <PropertyCard
                                key={propertyData._id}
                                hey={"hey"}
                                property={propertyData}
                            />
                        }) : <h2>No properties listed</h2>}
                </div>
            </div>
        </div>
    )
}

export default Properties