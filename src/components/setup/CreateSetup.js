import React, { useState } from 'react'
import { createSetup } from '../../api/setup'
import { useNavigate } from 'react-router-dom'
import SetupForm from '../shared/SetupForm'
// import msg handlers

const CreateSetup = (props) => {
    const { user, msgAlert } = props
    console.log('user in create', user)
    const navigate = useNavigate()

    // we'll need two states
    const [setup, setSetup] = useState({
        title: '', description: '', img: '', tags: ''
    })

    // console.log('In create setup', setup)

    const handleChange = (e) => {
        // e === event
        e.persist()

        setSetup(prevSetup => {

            const name = e.target.name
            let value = e.target.value

            console.log('etarget type', e.target.type)
            console.log('this is e.target checked', e.target.checked)

            if (name === "visited" && e.target.checked) {
                value = true
            } else if (name === "visited" && !e.target.checked) {
                value = false
            }

            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            }

            const updatedValue = { [name]: value }

            console.log('prevSetup', prevSetup)
            console.log('updatedValue', updatedValue)

            return { ...prevSetup, ...updatedValue }
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        createSetup(user, setup)
            // if create is successful, we should navigate to the show page
            .then(res => { navigate(`/setups/${res.data.setup._id}`) })
            // then we send a success message
            .then(() =>
                msgAlert({
                    // heading: 'The Spooky Setup has been Added!',
                    // message: createSetupSuccess,
                    // variant: 'success',
                }))
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    // heading: 'Failed to create a Spooky Setup!',
                    // message: createSetupFailure,
                    // variant: 'danger',
                }))
        // console.log('this is the setup', setup)
    }

    return (
        <SetupForm
            setup={setup}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Add Setup!"
        />
    )
}

export default CreateSetup