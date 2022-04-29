import apiUrl from '../apiConfig'
import axios from 'axios'

// POST -> create function
export const postComment = (user, setupId, newComment) => {
    console.log('THIS IS THE NEW COMMENT:\n', newComment)
    console.log('THIS IS SETUP ID API:\n', setupId)
    console.log('THIS IS USER:\n', user)
    return axios({
        url: `${apiUrl}/comments/${setupId._id}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        // data: {comment: { 
        //         note: newComment.note,
        //         author: newComment.author
        //     }
        // }
        data: { comment: newComment }

    })
}

// PATCH -> update function
export const updateSetup = (user, setupId, comId) => {
//     console.log('user', user)
//     console.log('this is updated comment', updatedComment)
//     return axios({
//         url: `${apiUrl}/comments/${setupId}/${comId}`,
//         method: 'PATCH',
//         headers: {
//             Authorization: `Token token=${user.token}`
//         },
//         data: { comment: updatedComment }
//     })
}


// DELETE -> remove function
export const removeComment = (user, setupId, comId) => {
    console.log('user', user)
    return axios({
        url: `${apiUrl}/comments/${setupId}/${comId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}