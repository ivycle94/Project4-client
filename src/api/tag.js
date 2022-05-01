import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllTags = (user) => {
    // console.log("IndexFunction for TAG -> User\n", user)
    // console.log("IndexFunction -> User\n", tag)
    return axios(`${apiUrl}/tags`)
}

// add patch
export const addTag = (user, setupId, tagId) => {
    console.log('user', user)
    console.log('this is setupId', setupId)
    return axios({
        url: `${apiUrl}/tags/${setupId}/${tagId}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        // data: { setup }
    })
}

// DELETE -> remove function
export const removeTag = (user, setupId, tagId) => {
    // console.log('user', user)
    // return axios({
    //     url: `${apiUrl}/tags/${setupId}/${tagId}`,
    //     method: 'DELETE',
    //     headers: {
    //         Authorization: `Token token=${user.token}`
    //     }
    // })
}