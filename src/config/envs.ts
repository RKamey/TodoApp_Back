
export const envs = {
  cloud_name: process.env.CLOUD_NAME,
  cloud_api_key: process.env.CLOUD_API_KEY,
  cloud_api_secret: process.env.CLOUD_API_SECRET,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  GROQ_MODEL: process.env.GROQ_MODEL || 'llama3-70b-8192',
  OWM_API_KEY: process.env.OWM_API_KEY,
  OWM_API_URL: 'https://api.openweathermap.org/data/3.0/onecall',
  BREVO_API_KEY: process.env.BREVO_API_KEY,
}
