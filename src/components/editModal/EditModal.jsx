import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { types, countries } from '../searchModal/searchModalData'
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai'
import classes from './editModal.module.css'

const EditModal = ({
    handleHideEditModal,
    property,
    id
}) => {
    const CLOUD_NAME = "doojo83ea"
    const UPLOAD_PRESET = 'real_estate_app_123'
    const responseType = {
        error: "error",
        success: "success"
    }

    const [state, setState] = useState(property)
    const [photo, setPhoto] = useState(null)
    const { data: session } = useSession()
    const router = useRouter()


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

        const isValueEmpty = Object.values(state).some((s) => s === "")

        if (isValueEmpty) {
            return notify("Fill all fields!", responseType.error)
        }

        try {

            if (photo) {
                let imageUrl = await uploadImage()
                state.img = imageUrl
            }

            const res = await fetch(`http://localhost:3000/api/property/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user?.accessToken}`
                },
                method: 'PUT',
                body: JSON.stringify({ ...state, currentOwner: session?.user?._id })
            })


            if (!res.ok) {
                throw new Error("Error occured")
            }

            const property = await res.json()

            router.push(`/details/${property?._id}`)

            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const uploadImage = async () => {
        if (!photo) return

        const formData = new FormData()

        formData.append("file", photo)
        formData.append("upload_preset", UPLOAD_PRESET)

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData
            })

            const data = await res.json()

            const imageUrl = data['secure_url']

            return imageUrl
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
                <h2 className={classes.title}>Edit property</h2>
                <form onSubmit={handleSubmit}>
                    <div className={classes.inputWrapper}>
                        <label htmlFor='title'>Title</label>
                        <input value={state?.title} name="title" onChange={handleChange} type="text" id='title' />
                    </div>
                    <div className={classes.inputWrapper}>
                        <label htmlFor='desc'>Desc</label>
                        <input value={state?.desc} name="desc" onChange={handleChange} type="text" id='desc' />
                    </div>
                    <div className={classes.inputWrapper}>
                        <label htmlFor='price'>Price</label>
                        <input value={state?.price} name="price" onChange={handleChange} type="number" id='price' />
                    </div>
                    <div className={classes.inputWrapper}>
                        <label htmlFor='sqmeters'>Sq. meters</label>
                        <input value={state?.sqmeters} name="sqmeters" onChange={handleChange} type="number" id='sqmeters' />
                    </div>
                    <div className={classes.inputWrapper}>
                        <label htmlFor='beds'>Beds</label>
                        <input value={state?.beds} name="beds" onChange={handleChange} type="number" id='beds' />
                    </div>
                    <div className={classes.inputWrapperImage}>
                        {/* to do file */}
                        <label htmlFor='image'>
                            Upload image
                            <AiOutlineFileImage />
                        </label>
                        <input onChange={(e) => setPhoto(e.target.files[0])} type="file" id='image' style={{ display: 'none' }} />
                    </div>
                    <div className={classes.inputWrapper}>
                        <select value={state?.country} onChange={handleChange} name="country" id='country' className={classes.country}>
                            {countries.map((country, i) => (
                                <option value={i} key={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={classes.inputWrapper}>
                        {/* to do select */}
                        <select value={state?.type} onChange={handleChange} name="type" id='type' className={classes.type}>
                            {types.map((type, i) => (
                                <option value={type} key={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        className={classes.listBtn}
                        type="submit"
                    >
                        List Estate
                    </button>
                </form>
                <AiOutlineClose
                    className={classes.closeIcon}
                    onClick={handleHideEditModal}
                    size={25}
                />
            </div>
            <ToastContainer />
        </div>
    )
}


export default EditModal