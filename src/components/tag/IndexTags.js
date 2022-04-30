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
    const { msgAlert } = props
    // console.log("IndexTags props ->\n",props)
    // console.log("IndexTags tags ->\n",tags)

    useEffect(() => {
        getAllTags()
            .then(res => {
                setTags(res.data.tags)
                // console.log("res.data", res.data);
                // console.log("IndexTag: tags: ", tags)
            })
            .catch((error) => {
                console.log(error)
            })
    }, []) 
    console.log("IndexTags tags after useEffect ->\n",tags)
    const addTag = (e) => {
        console.log("This is e.target ->\n", e.target)
        console.log("This is e.target.id ->\n", e.target.id)
        console.log("This is e.target.innerText\n", e.target.innerText)
        console.log("This tags._id\n", tags._id)
        console.log("This is tags[0]._id\n", tags[0]._id)
        // if (e.target.innerText ===)
    }
  
    if (!tags) {
        return <p>Loading ...</p>
    } else if (tags.length === 0) {
        return <p>No Tags yet, go add some</p>
    }

    let tagButtons

    if (tags.length > 0) {
        tagButtons = tags.map((tag, index) => (
            <div  className="m-2">
                <Button id={tag._id} onClick={addTag}>
                        {tag.text}
                </Button>
            </div>
        ))
    }

 

    return (
        <>
            <div style={cardContainerLayout}>
                {tagButtons}
            </div>
        </>
    )
}


export default IndexTags