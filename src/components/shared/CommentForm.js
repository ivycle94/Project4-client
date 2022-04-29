import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'

///////////////////////////////////////////////////////////////
// This is the Shared Form to be used for a Comment
///////////////////////////////////////////////////////////////
const CommentForm = (props) => {
    const { comment, setup, commentSubmit, commentChange, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={commentSubmit}>
                <Form.Label>Comment:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter a Comment"
                    name='note'
                    onChange={commentChange}
                />
                <Button className="show-buttons" type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default CommentForm