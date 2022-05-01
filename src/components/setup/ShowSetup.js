import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getOneSetup, updateSetup, removeSetup } from '../../api/setup'
import { removeComment } from '../../api/comment'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button } from 'react-bootstrap'
import EditSetupModal from './EditSetupModal'
import PostComment from '../comment/PostComment'
import IndexTags from '../tag/IndexTags'
// import favorite creation
// import msg handling later

const ShowSetup = (props) => {

    const [setup, setSetup] = useState(null)
    // Tag is it's own model, so it shouldn't go in here wtf????
    // const [tags, setTags] = useState([])

    const [comments, setComments] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const { user, msgAlert } = props
    const { id } = useParams()
    const navigate = useNavigate()
    // console.log('id in showSetup', id)
    // console.log('props in show page\n', props)
    useEffect(() => {
        getOneSetup(id)
            .then(res => {
                setSetup(res.data.setup)
                setComments(res.data.setup.comments)
                // Tag is it's own model, so it shouldn't go in here wtf???
                // setTags(res.data.tags)
                }
            )
            .then(() => {
                msgAlert({
                    heading: 'The setup has been retrieved!',
                    message: "",
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'Failed to find the setup',
                    message: "",
                    variant: 'danger',
                })
            })
    }, [updated]) // eslint-disable-line react-hooks/exhaustive-deps
    // ERROR MESSAGE, but why? ^ [line 57 - temp fix] -> comment will get rid of the error.
    //   Line 57:8:   React Hook useEffect has missing dependencies: 'id' and 'msgAlert'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
    const removeTheSetup = () => {
        console.log("removeTheSetup id", setup.id)
        console.log("removeTheSetup _id", setup._id)
        // if (setup.visitors.length)
        removeSetup(user, setup._id)
            .then(() => {
                msgAlert({
                    heading: 'The setup has been removed!',
                    message: "",
                    variant: 'success',
                })
            })
            .then(() => { 
                navigate(`/setups`) 
            })
            .catch(() => {
                msgAlert({
                    heading: 'Setup deletion failed.',
                    message: "",
                    variant: 'danger',
                })
            })
    }
    
// --- DELETE COMMENT FUNCTION? -----------------------------//
const removeTheComment = (comment) => {
    // console.log("removeTheComment id", setup.comment.id)
    // console.log("removeTheComment _id", setup.comment._id)
    // console.log("removeTheComment setup", setup)
        removeComment(user, setup._id, comment)
        // removeComment(user, setupId, comId)
            .then(() => {
                msgAlert({
                    heading: 'The comment has been removed!',
                    message: "",
                    variant: 'success',
                })
            })
            .then(() => { 
                console.log("DeletedComment ->\n", comment)
                navigate(`/setups`) 
                navigate(`/setups/${setup._id}`) 
            })
            // .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Comment deletion failed.',
                    message: "",
                    variant: 'danger',
                })
            }) 
}
    if (!setup) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading....</span>
                </Spinner>
            </Container>
        )
    }
// --- display the tags function? -----------------------------//
let tagsArray
if (setup.tags.length > 0) {
    tagsArray = setup.tags.map((tag) => (
        <p>{tag.text}</p>
    ))
}
    console.log("PLEASE FIND MY TAGS\n", setup.tags)
    return (
        <>
            <Container className="fluid mt-5">
                <Card>
                    <Card.Header className='card-title'><h2>{setup.title}</h2></Card.Header>
                    <Card.Body className="d-flex justify-content-start">
                        <img className="show-image" src={setup.img} alt="setup"/>
                        <Card.Text className="show-description">
                            <small><b>Description:</b><br/> {setup.description}</small><br />
                            {/* Make for loop to map tags to render on page */}
                            <small><b>Tags:</b><br/></small> 
                            {/* <small>{setup.tags.text}</small> */}
                            {/* <small><b>Tags:</b><br/> {tagsDisplay}</small><br /> */}
                            {/* <Button > */}
                                <small>{tagsArray}</small>
                            {/* </Button> */}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="show-footer">
                    <Link to={`/setups`}> 
                        <Button className="show-buttons" variant='dark'>
                            Back 
                        </Button>   
                    </Link>
                         {/* Trying to set a condtional where only the USER who is the OWNER of the setup can edit/delete the setup */}
                        {/* {
                            setup.owner && user && (user._id === setup.owner.id)  ?
                                <>
                                    <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                                        Edit Setup
                                    </Button>
                                    <Button onClick={() => removeTheSetup()} className="m-2" variant="danger">
                                        Delete Setup
                                    </Button>
                                </>
                                :
                                null
                        }
                        {
                            user ? null : null
                        } */}
                        <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                            Edit Setup
                        </Button>
                        <Button onClick={() => removeTheSetup()} className="m-2" variant="danger">
                            Delete Setup
                        </Button>
                    </Card.Footer>
                </Card>
                {/* {user._id === setup.owner &&  */}
                    <IndexTags 
                        user={user}
                        setupId={setup._id}
                        triggerRefresh={()=> {
                            setUpdated(prev => !prev)
                            }
                        }
                    />
                {/* } */}
            <EditSetupModal
                setup={setup}
                show={modalOpen}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                updateSetup={updateSetup}
                handleClose={() => setModalOpen(false)}
            />
            {/* This is where the comment box/form is displayed */}
            <PostComment 
                key={comments._id} comments={comments} setup={setup}
                user={user} msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
            {/* This is where the comments are displayed */}
            {comments.map(comment => (
                <Card key={comment._id}> 
                   <p>note:{comment.note}</p>
                   <p>author:{comment.author.email}</p>       
                    <Button onClick={() => removeTheComment(comment._id)} className="m-2" variant="danger">
                        Delete Comment
                    </Button>
                </Card>
            ))}
            </Container>
        </>
    )
}

export default ShowSetup