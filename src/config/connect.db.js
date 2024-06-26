import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../../.env') });


console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_DIALECT:', process.env.DB_DIALECT);

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT 
    }
);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("DATABASE CONNECTED...");
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        console.error('DB_HOST:', process.env.DB_HOST);
        console.error('DB_PORT:', process.env.DB_PORT);
    }
}

testConnection();

export default sequelize;
