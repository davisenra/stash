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

// TODO: change settings dynamically based on ENV

export const logger = pino({ ...envToLogger.development });
