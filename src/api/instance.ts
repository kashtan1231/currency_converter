import axios from 'axios'

export const actualUrl = (): any => {
  return 'https://bank.gov.ua/NBUStatService/v1/'
}

const defaultHeaders: any = {
  accept: 'application/json',
}

export const instanceApi = axios.create({
  baseURL: actualUrl(),
  headers: defaultHeaders,
})
