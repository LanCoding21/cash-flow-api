// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
import initServer from './Infrastructures/http/server';

dotenv.config();

initServer();
