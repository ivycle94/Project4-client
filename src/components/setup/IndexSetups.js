import React, { useState, useEffect } from 'react'
import { getAllSetups } from '../../api/setup'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// add message handling

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexSetups = (props) => {

    const [setups, setSetups] = useState(null)
    // const { msgAlert } = props

    useEffect(() => {
        getAllSetups()
            .then(res => {
                setSetups(res.data.setups)
                // console.log("res.data", res.data);
                // console.log("IndexSetup: setups: ", setups)
            })
            .then(() => {
                // msgAlert({
                //     heading: 'Spooky Setups have been retrieved!',
                //     message: indexSetupsSuccess,
                //     variant: 'success',
                // })
            })
            .catch(() => {
                // msgAlert({
                //     heading: 'Failed to retrieve Spooky Setups!',
                //     message: indexSetupsFailure,
                //     variant: 'danger',
                // })
            })
    }, [])
    
    if (!setups) {
        return <p>Loading ...</p>
    } else if (setups.length === 0) {
        return <p>No Setups yet, go add some</p>
    }

    let setupCards

    if (setups.length > 0) {
        setupCards = setups.map(setup => (
            <Card key={setup._id} style={{ width: '30%' }} className="m-2">
                {/* <Card.Header className='header-name'>{setup.name}</Card.Header> */}
                <Card.Body className="card-body d-flex flex-column justify-content-end">

                        <img src={setup.img} alt="setup"/>

                    <Card.Text className="card-text">
                        <p className="header-name">{setup.title}</p>
                        <Link to={`/setups/${setup._id}`}> 
                            View
                        </Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }

    return (
        <>
            <h3>All the Setups</h3>
            <div style={cardContainerLayout}>
                {setupCards}
            </div>
        </>
    )
}


export default IndexSetups