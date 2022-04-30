import React, { useState, useEffect } from 'react'
import { getAllTags } from '../../api/tag'
import { Link } from 'react-router-dom'
import { Spinner, Container, Card, Button } from 'react-bootstrap'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexTags = (props) => {

    const [tags, setTags] = useState(null)
    const {user, msgAlert } = props

    useEffect(() => {
        getAllTags()
            .then(res => {
                setTags(res.data.tags)
                // console.log("res.data", res.data);
                // console.log("IndexTag: tags: ", tags)
            })
            .then(() => {
                msgAlert({
                    heading: 'Success!',
                    message: "",
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'Oh No...',
                    message: "",
                    variant: 'danger',
                })
            })
    }, []) 
  
    if (!tags) {
        return <p>Loading ...</p>
    } else if (tags.length === 0) {
        return <p>No Tags yet, go add some</p>
    }

    let tagCards

    if (tags.length > 0) {
        tagCards = tags.map(tag => (
            <Card key={tag._id} style={{ width: '8%' }} className="m-2">
                <Card.Body className="card-body d-flex flex-column justify-content-end">
                <Button>
                    <Card.Text className="card-text">
                        {tag.text}
                    </Card.Text>
            </Button>
                </Card.Body>
            </Card>
        ))
    }

    return (
        <>
            <div style={cardContainerLayout}>
                {tagCards}
            </div>
        </>
    )
}


export default IndexTags