import { registerAs } from '@nestjs/config';
import { config } from 'dotenv';

config();

export default registerAs('config', () => ({
  port: parseInt(process.env.NEST_JS_PORT, 10),
  nodenv: process.env.NODE_ENV,
}));
