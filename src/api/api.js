import * as request from './request'

const IP_HOST = 'https://api.ipify.org'
const PERSON_HOST = 'https://api.genderize.io'

export const apiGetIP = () => request.get(IP_HOST, { format: 'json' })
export const apiGetPersonInfo = () => request.get(`${PERSON_HOST}`, { name: 'astrid' })