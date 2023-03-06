export const isProd = process.env.NODE_ENV === 'production';
export const host = isProd
  ? 'https://wow-im.airtlab.com'
  : 'http://localhost:3000';