import Axios from 'axios'

const baseURL = Axios.create({baseURL: "https://dummyjson.com"})


export default baseURL