import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllSetups = () => {
    return axios(`${apiUrl}/setups`)
}

