import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyMultipart from '@fastify/multipart';
import fastifySensible from '@fastify/sensible';
import Fastify from 'fastify';
import process from 'node:process';
import { healthcheck } from './handlers/healthcheck.js';
import { listWallpapers, storeWallpaper } from './handlers/wallpaper.js';
import { logger } from './logger.js';

async function main() {
  const server = Fastify({ loggerInstance: logger })
    .register(fastifyMultipart)
    .register(fastifyHelmet)
    .register(fastifyCors)
    .register(fastifySensible);

  server.get('/healthcheck', healthcheck);
  server.get('/v1/wallpapers', listWallpapers);
  server.post('/v1/wallpapers', storeWallpaper);

  server.listen({ port: 3000 }, (err) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
  });

  const shutdown = async (signal) => {
    server.log.info(`Received ${signal}. Shutting down gracefully...`);

    try {
      await server.close();
      logger.info('Server closed.');
      process.exit(0);
    } catch (err) {
      logger.error(`Error during shutdown: ${err}`);
      process.exit(1);
    }
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

await main();
