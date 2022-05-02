import React, { useState } from 'react'
import { postComment } from '../../api/comment'
// import { createCommentSuccess, createCommentFailure } from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'
import CommentForm from '../shared/CommentForm'
// import { Form, Container, Button } from 'react-bootstrap'

const PostComment = (props) => {
    // const { id } = useParams()
    // ******************** this might be the issue below 
    const { user, setup, msgAlert, triggerRefresh } = props
    // console.log('CreateComment -> user:', user)
    // console.log('CreateComment -> props:', props)
    const navigate = useNavigate()
    // we'll need two states
    const [comment, setComment] = useState([])
    // console.log('CreateComment -> the comment: ', comment)

    const commentChange = (e) => {
        // e === event
        e.persist()

        setComment(prevComment => {

            const name = e.target.name
            let value = e.target.value
            // console.log('etarget type', e.target.type)

            const updatedValue = { [name]: value }

            // console.log('prevComment', prevComment)
            // console.log('updatedValue', updatedValue)

            return { ...prevComment, ...updatedValue }
        })
    }

    const commentSubmit = (e) => {
        e.preventDefault()

        // console.log("res.data.setup._id ==>",res.data.setup._id)
        postComment(user, setup, comment)
            .then((res) => {
                // console.log("PostComment -> this is res\n", res)
                // console.log("PostComment -> this is setup\n", setup)
            })
            .then(res => { navigate(`/setups/${setup._id}`) })
            // .then(res => { navigate(`/setups`) })
                // then we send a success message
                .then(() =>
                    msgAlert({
                        heading: 'Your comment has been added!',
                        message: "",
                        variant: 'success',
                    }))
                .then(() => triggerRefresh())
                // if there is an error, we'll send an error message
                .catch(() =>
                    msgAlert({
                        heading: 'Failed to add your comment!',
                        message: "",
                        variant: 'danger',
                    }))
        // console.log('PostComment -> The created comment -> ', comment)

    }

    return (
        <CommentForm
            comment={comment}
            commentChange={commentChange}
            commentSubmit={commentSubmit}
            // triggerRefresh={triggerRefresh}
            heading=""
        />
        // <Container className="justify-content-center">
        //     <h3>ADD COM</h3>
        //     <Form onSubmit={commentSubmit}>
        //         <Form.Label>Comment:</Form.Label>
        //         <Form.Control
        //             type="text"
        //             placeholder="Enter a Comment"
        //             name='note'
        //             onChange={commentChange}
        //         />
        //         <Button className="show-buttons" type='submit'>Submit</Button>
        //     </Form>
        // </Container>    
    )
}

export default PostComment