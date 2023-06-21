import dayjs from 'dayjs'

export const formatDate = (val) => {
  return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
}

export const fromNow = (val) => {
  return dayjs(val).fromNow().replace(/\s/g, '')
}