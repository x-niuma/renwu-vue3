export const isProd = process.env.NODE_ENV === 'production';
export const host = isProd
  ? 'http://task.airtlab.com'
  : 'http://task.airtlab.com';