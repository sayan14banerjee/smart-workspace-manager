import dotenv from 'dotenv';
dotenv.config();

export default {
    port : process.env.port || 8000
}
