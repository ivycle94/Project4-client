import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getOneSetup, updateSetup, removeSetup } from '../../api/setup'
import { removeComment } from '../../api/comment'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button } from 'react-bootstrap'
import EditSetupModal from './EditSetupModal'
import PostComment from '../comment/PostComment'
// import CommentForm from '../shared/CommentForm'
// import favorite creation
// import msg handling later

const ShowSetup = (props) => {

    const [setup, setSetup] = useState(null)
    /////////////////////////////////////////////
    // trying to add comments

    const [comments, setComments] = useState([])
    // const [commBox, setcommBox] = useState(false)
    
    /////////////////////////////////////////////
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const { user, msgAlert } = props
    const { id } = useParams()
    const navigate = useNavigate()

    // console.log('id in showSetup', id)
    console.log('props in show page\n', props)
    console.log('props in show page\n', props)
    

    // empty dependency array in useEffect to act like component did mount
    useEffect(() => {
        getOneSetup(id)
            .then(res => {
                setSetup(res.data.setup)
                setComments(res.data.setup.comments)
                // setComments([...comment, 'New Item'])
                }
            )
            .then(() => {
                // msgAlert({
                //     heading: 'The setup has been retrieved!',
                //     message: showSetupSuccess,
                //     variant: 'success',
                // })
            })
            .catch(() => {
                // msgAlert({
                //     heading: 'Failed to find the setup',
                //     message: showSetupFailure,
                //     variant: 'danger',
                // })
            })
    }, [updated])

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

    const trashCode = () => {
    /////////////////////////////////////////////
    //============================================//
    // COMMENTS -> WORK IN PROGRESS         
    //============================================//

    //--- COMMENT CHANGE FUNCTION? -----------------------------//
    // const commentChange = (e) => {
        
    //     // e === event
    //     e.persist()

    //     setComment(prevComment => {

    //         const name = e.target.name
    //         let value = e.target.value
    //         console.log('etarget type', e.target.type)

    //         const updatedValue = { [name]: value }

    //         console.log('prevComment', prevComment)
    //         console.log('updatedValue', updatedValue)

    //         return { ...prevComment, ...updatedValue }
    //     })
    // }
    //--- COMMENT DISPLAY FUNCTION? -----------------------------//
    // function showComments(){
    //     if (setup.comments.length >= 1){
    //         return ( <p>{setup.comment.note}</p> )
    //     }
    // }
    //--- MAPPING THROUGH COMMENTS -----------------------------//
    // let commCards

    // if (setup.comments.length > 0) {
    //     commCards = setup.comments.map(comment => (
    //         <Card  style={{ width: '30%' }} className="m-2">
    //             <Card.Header className='header-name'>Comments:</Card.Header>
    //             <Card.Body className="card-body d-flex flex-column justify-content-end">

    //                     <p>{comment.note}</p>
    //             </Card.Body>
    //         </Card>
    //     ))
    // }
    /////////////////////////////////////////////
}

// --- DELETE COMMENT FUNCTION? -----------------------------//
const removeTheComment = (comment) => {

    // console.log("removeTheComment id", setup.comment.id)
    // console.log("removeTheComment _id", setup.comment._id)
    console.log("removeTheComment setup", setup)
    // ========== ATTEMPT #1?
    // removeComment(user, setup.comment._id)
    //     .then(() => {
    //         msgAlert({
    //             heading: 'The comment has been removed!',
    //             message: "",
    //             variant: 'success',
    //         })
    //     })
    //     .then(() => { navigate(`/setups`) })
    //     .catch(() => {
    //         msgAlert({
    //             heading: 'Comment deletion failed.',
    //             message: "",
    //             variant: 'danger',
    //         })
    //     })
    // ========== ATTEMPT #2?
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
    return (
        <>
            <Container className="fluid mt-5">
                <Card>
                    <Card.Header className='card-title'><h2>{setup.title}</h2></Card.Header>
                    <Card.Body className="d-flex justify-content-start">
                        <img className="show-image" src={setup.img} alt="setup"/>
                        <Card.Text className="show-description">
                            <small><b>Description:</b><br/> {setup.description}</small><br />
                            {/* <small><b>Tags:</b><br/> {setup.tags.text}</small><br /> */}
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
                        {/* ///////////////////////////////////////////// */}
                        {/* <Button onClick={() => setcommBox(true)} className="m-2" variant="danger">
                            Comment
                        </Button> */}
                        {/* ///////////////////////////////////////////// */}
                    </Card.Footer>
                </Card>
            </Container>
            <EditSetupModal
                setup={setup}
                show={modalOpen}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                updateSetup={updateSetup}
                handleClose={() => setModalOpen(false)}
            />
            {/* ///////////////////////////////////////////// */}
            <PostComment 
                key={comments._id} comments={comments} setup={setup}
                user={user} msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />

            {comments.map(comment => (
                <Card key={comment._id}> 
                   <p>note:{comment.note}</p>
                   <p>author:{comment.author.email}</p>       
                    <Button onClick={() => removeTheComment(comment._id)} className="m-2" variant="danger">
                        Delete Comment
                    </Button>
                </Card>
            ))}

            {/* ///////////////////////////////////////////// */}
        </>
    )
}

export default ShowSetup