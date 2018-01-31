export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export function formattedDate (timestamp) {
  const postDate = new Date(timestamp);
  const MONTH = postDate.getMonth() + 1
  const DAY = postDate.getDate()
  const YEAR = postDate.getFullYear()
  return `${MONTH}/${DAY}/${YEAR}`
}
