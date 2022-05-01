import React, { useState, useEffect } from 'react'
import { getAllTags, addTag } from '../../api/tag'
// import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'


const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexTags = (props) => {

    const [tags, setTags] = useState(null)
    const { setupId, user, triggerRefresh } = props
    console.log("IndexTags props ->\n",props)
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
    // console.log("IndexTags tags after useEffect ->\n",tags)

    const addATag = (e) => {
        console.log("This is e.target ->\n", e.target)
        console.log("This is e.target.id ->\n", e.target._id)
        console.log("This is e.target.innerText\n", e.target.innerText)
        // console.log("This tags._id\n", tags._id)
        // console.log("This is tags[0]._id\n", tags[0]._id)
        // if (e.target.id ===)
        // this works but need to use id istead of inner text
        addTag(user, setupId, e.target.innerText)
        // addTag(user, setupId, e.target._id)
            .then(()=> {
                triggerRefresh()
            })
            .catch(console.error)
    }
  
    if (!tags) {
        return <p>Loading ...</p>
    } else if (tags.length === 0) {
        return <p>No Tags yet, go add some</p>
    }

    let tagButtons

    if (tags.length > 0) {
        tagButtons = tags.map((tag) => (
            <div  className="m-2">
                <Button id={tag._id} onClick={addATag}>
                {/* // this works but need to use id istead of inner text */}
                       <div key={tag._id}> {tag._id}</div>
                       {/* <div key="{tag}"> {tag.text}</div> */}
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