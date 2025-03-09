import pino from 'pino';

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
    level: 'debug',
  },
  production: {
    level: 'info',
  },
};

const envToLoad =
  process.env.NODE_ENV === 'production' ? envToLogger.production : envToLogger.development;

export const logger = pino({ ...envToLoad });
