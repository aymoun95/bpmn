import dotenv from 'dotenv';

dotenv.config({ quiet: true });

interface Config {
  port: number;
  nodeEnv: string;
  socketPort: number;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  socketPort: Number(process.env.SOCKET_PORT) || 3001,
};

export default config;
