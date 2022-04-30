import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import SetupForm from '../shared/SetupForm'
//import msg handling

const EditSetupModal = (props) => {
    const { user, show, handleClose, updateSetup, msgAlert, triggerRefresh } = props
    const [setup, setSetup] = useState(props.setup)
    // console.log("EditSetupModal user ->\n", user)
    console.log("EditSetupModal props ->\n", props)
    // console.log("EditSetupModal props.setup ->\n", props.setup)

    const handleChange = (e) => {
        // e === event
        e.persist()

        setSetup(prevSetup => {
            const name = e.target.name
            let value = e.target.value

            console.log('etarget type', e.target.type)

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

        console.log('the spooky setup to submit', setup)
        updateSetup(user, setup)
            // if create is successful, we should navigate to the show page
            .then(() => handleClose())
            // then we send a success message
            .then(() =>
                msgAlert({
                    // heading: 'Setup updated!',
                    // message: editSetupSuccess,
                    // variant: 'success',
                }))
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    // heading: 'Setup update failed!',
                    // message: editSetupFailure,
                    // variant: 'danger',
                }))
        // console.log('this is the patched setup', setup)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <SetupForm
                    setup={setup}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit Setup!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditSetupModal