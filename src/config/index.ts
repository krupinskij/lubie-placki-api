require('dotenv').config();

const config = {
    DATABASE_URI: process.env.DATABASE_URI,
    PORT: process.env.PORT,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    JWT_SECRET: process.env.JWT_SECRET
}

export default config;