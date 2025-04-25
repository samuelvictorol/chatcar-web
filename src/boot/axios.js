import { boot } from 'quasar/wrappers'
import axios from 'axios'

const axiosConfig = { baseURL: process.env.BACKEND_URL }
const api = axios.create(axiosConfig)
export default boot(({ app }) => {

  app.config.globalProperties.$axios = axios

  app.config.globalProperties.$api = api

})

export { api }