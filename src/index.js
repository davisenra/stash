import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyMultipart from '@fastify/multipart';
import fastifySecureSession from '@fastify/secure-session';
import fastifySensible from '@fastify/sensible';
import fastifyStatic from '@fastify/static';
import Fastify from 'fastify';
import { Buffer } from 'node:buffer';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { check, login, logout } from './auth/handlers.js';
import { logger } from './internal/logger.js';
import { authenticate } from './internal/middleware.js';
import { deleteWallpaper, listWallpapers, storeWallpaper } from './wallpaper/handlers.js';

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const server = Fastify({ loggerInstance: logger })
    .register(fastifyMultipart)
    .register(fastifyHelmet)
    .register(fastifyCors)
    .register(fastifySensible)
    .register(fastifySecureSession, {
      // TODO: receive 32 byte secret key from ENV
      key: Buffer.from('941eba2ac00b06c0cf10950a9c5e0e395297cea7548a2a4d2b708d91e452b90d', 'hex'),
      cookieName: 'stash-session',
      expiry: 7200,
      cookie: {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 7200, // 2 hours
      },
    })
    .register(fastifyStatic, {
      root: path.join(__dirname, '..', 'dist'),
      prefix: '/',
    })
    .register((app, _, done) => {
      app.addHook('onRequest', async (req, res) => {
        if (!req.session.get('user')) {
          res.status(403).send();
          return;
        }
      });
      app.register(fastifyStatic, {
        root: path.join(__dirname, '..', 'storage'),
        prefix: '/storage',
      });
      done();
    });

  server.register(
    (app, _, done) => {
      app
        .get('/healthcheck', (_, res) => res.send({ alive: true }))
        .post('/login', login)
        .post('/logout', { preHandler: authenticate }, logout)
        .get('/check', { preHandler: authenticate }, check)
        .get('/wallpapers', { preHandler: authenticate }, listWallpapers)
        .post('/wallpapers', { preHandler: authenticate }, storeWallpaper)
        .delete('/wallpapers/:id', { preHandler: authenticate }, deleteWallpaper);
      done();
    },
    { prefix: '/api' },
  );

  server.listen({ host: 'localhost', port: 3000 }, (err) => {
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
