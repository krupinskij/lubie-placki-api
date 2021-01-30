require('dotenv').config();

const config = {
    DATABASE_URI: process.env.DATABASE_URI,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET
}

export default config;