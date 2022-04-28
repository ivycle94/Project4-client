import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { getOneSetup, updateSetup, removeSetup } from '../../api/setup'
import { useParams } from 'react-router-dom'
import { Spinner, Container, Card } from 'react-bootstrap'
// import favorite creation
// import msg handling later
// import edit modal later

const ShowSetup = (props) => {

    const [setup, setSetup] = useState(null)
    // const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    // const { user, msgAlert } = props
    const { id } = useParams()
    // let { id } = useParams()
    // const navigate = useNavigate()

    console.log('id in showSetup', id)

    // empty dependency array in useEffect to act like component did mount
    useEffect(() => {
        getOneSetup(id)
            .then(res => setSetup(res.data.setup))
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
        removeSetup(user, setup.id)
            .then(() => {
                msgAlert({
                    // heading: 'The setup has been removed!',
                    // message: removeSetupSuccess,
                    // variant: 'success',
                })
            })
            .then(() => { navigate(`/setups`) })
            .catch(() => {
                // msgAlert({
                //     heading: 'Setup deletion failed.',
                //     message: removeSetupFailure,
                //     variant: 'danger',
                // })
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
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="show-footer">
                        {/* <a href="javascript:history.back()"><Button className="show-buttons" variant='dark'>Back</Button></a>
                        {
                            place.owner && user && (user._id === place.owner._id)
                                ?
                                <>
                                    <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                                        Edit Place
                                    </Button>
                                </>

                                :

                                null

                        }

                        {
                            user
                                ?
                                <>
                                    <Link to={`/visit/${id}`}>
                                        <Button className='btn btn-dark'>Visited!</Button>
                                    </Link>
                                </>

                                :

                                <>
                                    <Link to={`/sign-in`}>
                                        <Button className='show-buttons btn btn-dark'>Visited!</Button>
                                    </Link>
                                </>
                        } */}
                    </Card.Footer>
                </Card>
            </Container>
        </>
    )
}

export default ShowSetup