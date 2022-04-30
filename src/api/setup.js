import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllSetups = () => {
    // console.log("IndexFunction for SETUP -> User\n", user)
    return axios(`${apiUrl}/setups`)
}

// show function
export const getOneSetup = (setupId) => {
    return axios(`${apiUrl}/setups/${setupId}`)
}

// POST -> create function
export const createSetup = (user, newSetup) => {
    console.log('user', user)
    console.log('this is newSetup that was created:\n', newSetup)
    return axios({
        url: `${apiUrl}/setups`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { setup: newSetup }
    })
}

// PATCH -> update function
export const updateSetup = (user, updatedSetup) => {
    console.log('user', user)
    console.log('this is updatedSetup', updatedSetup)
    return axios({
        url: `${apiUrl}/setups/${updatedSetup._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { setup: updatedSetup }
    })
}

// DELETE -> remove function
export const removeSetup = (user, setupId) => {
    console.log('user', user)
    return axios({
        url: `${apiUrl}/setups/${setupId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}