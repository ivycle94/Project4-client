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

