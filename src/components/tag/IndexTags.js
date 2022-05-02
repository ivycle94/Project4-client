import React, { useState, useEffect } from 'react'
import { getAllTags, addTag, removeTag } from '../../api/tag'
// import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'


const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexTags = (props) => {

    const [tags, setTags] = useState(null)
    const { setupId, tagId, user, triggerRefresh, msgAlert } = props
    // console.log("IndexTags props ->\n",props)
    const navigate = useNavigate()
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
    // using e = event didnt work, so had to chnage e to tId
    // const addATag = (e) => {
    const addATag = (tagId) => {
        console.log("ADD FUNC-> This is e.target ->\n", tagId)
        // console.log("ADD FUNC-> This is props ->\n", props)
    //     // console.log("This is e.target.id ->\n", e.target._id)
    //     // console.log("This is e.target.innerText\n", e.target.innerText)
    //     // this works but need to use id istead of inner text
    //     // addTag(user, setupId, e.target.innerText)
        addTag(user, setupId, tagId)
            .then(() => {
                triggerRefresh()
            })
            .catch(() => {
                msgAlert({
                    heading: 'Failed to add tag',
                    message: "",
                    variant: 'danger',
                })
            })
        }
    // --- DELETE TAG FUNCTION? -----------------------------//
    // console.log("this is setupId in removeTheTag\n", setupId)
    const removeATag = (tagId) => {
        console.log("REMOVE FUNC->This is e.target ->\n", tagId)
        // console.log("REMOVE FUNC->This is props ->\n", props)
        // console.log("This is e.target.id ->\n", e.target._id)
        // console.log("This is e.target.innerText\n", e.target.innerText)
        removeTag(user, setupId, tagId)
            .then(() => {
                triggerRefresh()
                // navigate(`/setups`) 
            })
            .catch(() => {
                msgAlert({
                    heading: 'Failed remove tag',
                    message: "",
                    variant: 'danger',
                })
            })
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
                <Button id={tag._id} onClick={()=>{addATag(tag._id)}}>
                {/* <Button id={tag._id}> */}
                {/* // this works but need to use id istead of inner text */}
                       {/* <div key={tag._id}> {tag._id}</div> */}
                       <span key={tag._id}> {tag.text} </span>
                </Button>
                <Button id={tag._id} onClick={()=>{removeATag(tag._id)}}>
                    <span key={tag._id}>x</span>
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