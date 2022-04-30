import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllTags = (user) => {
    console.log("IndexFunction -> User\n", user)
    // console.log("IndexFunction -> User\n", tag)
    return axios(`${apiUrl}/tags`)
}

// DELETE -> remove function
export const removeTag = (user, setupId) => {
    // console.log('user', user)
    // return axios({
    //     url: `${apiUrl}/tags/${setupId}/${tagId}`,
    //     method: 'DELETE',
    //     headers: {
    //         Authorization: `Token token=${user.token}`
    //     }
    // })
}