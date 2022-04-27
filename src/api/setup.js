import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllSetups = () => {
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