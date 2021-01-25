require('dotenv').config();

const config = {
    DATABASE_URI: process.env.DATABASE_URI,
    PORT: process.env.PORT
}

export default config;