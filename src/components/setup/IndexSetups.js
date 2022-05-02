import React, { useState, useEffect } from 'react'
import { getAllSetups } from '../../api/setup'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { indexSetupsSuccess, indexSetupsFailure } from '../shared/AutoDismissAlert/messages'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap',
    alignItems: 'center'
}

const IndexSetups = (props) => {

    const [setups, setSetups] = useState(null)
    const { msgAlert } = props

    useEffect(() => {
        getAllSetups()
            .then(res => {
                setSetups(res.data.setups)
                // console.log("res.data", res.data);
                // console.log("IndexSetup: setups: ", setups)
            })
            .then(() => {
                msgAlert({
                    heading: 'Success!',
                    message: indexSetupsSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'Oh No...',
                    message: indexSetupsFailure,
                    variant: 'danger',
                })
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    // ERROR MESSAGE, but why? ^ [line 39 - temp fix] -> comment will get rid of the error.
    //  Line 39:8:  React Hook useEffect has a missing dependency: 'msgAlert'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
    
    if (!setups) {
        return <p>Loading ...</p>
    } else if (setups.length === 0) {
        return <p>No Setups yet, go add some</p>
    }

    let setupCards

    if (setups.length > 0) {
        setupCards = setups.map(setup => (
            <Card key={setup._id} style={{ width: '60%' }} className="m-2">
                <Card.Header className='header-name'>{setup.title}</Card.Header>
                <Card.Body className="card-body d-flex flex-column justify-content-end">

                        {/* <p className="header-name">{setup.title}</p> */}
                        <img src={setup.img} alt="setup"/>

                    <Card.Text className="card-text">
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