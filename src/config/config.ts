import dotenv from 'dotenv'
dotenv.config()

const config = {
  port: process.env.PORT,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_DATABASE,
  dbUri: process.env.CLEARDB_DATABASE_URL
}

export default config
