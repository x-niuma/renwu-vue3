import dayjs from 'dayjs'

export const formatDate = (val) => {
  return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
}
