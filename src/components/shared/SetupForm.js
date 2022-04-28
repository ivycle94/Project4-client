import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'

///////////////////////////////////////////////////////////////
// This is the Shared Form to be used for a Setup
///////////////////////////////////////////////////////////////
const SetupForm = (props) => {
    const { setup, handleSubmit, handleChange, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label className="spooky-setups-header">Title</Form.Label>
                <Form.Control
                    placeholder="Title"
                    value={setup.title}
                    name='title'
                    onChange={handleChange}
                />
                <Form.Label>Image</Form.Label>
                <Form.Control
                    placeholder="Image url/jpeg"
                    value={setup.img}
                    name='img'
                    onChange={handleChange}
                />
                <Form.Label>Description</Form.Label>
                <Form.Control
                    placeholder="Description"
                    value={setup.description}
                    name='description'
                    onChange={handleChange}
                />
                {/* <Form.Label>Tags</Form.Label>
                <Form.Control
                    placeholder="Tags"
                    value={setup.tags}
                    name='tags'
                    onChange={handleChange}
                /> */}
                <Button className="show-buttons" type='submit'>Submit</Button>
                {/* <a href=""><Button className="show-buttons" variant='dark'>Back</Button></a> */}
            </Form>
        </Container>
    )
}

export default SetupForm