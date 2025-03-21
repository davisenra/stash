import bcrypt from 'bcrypt';
import { logger } from '../internal/logger.js';
import userRepository from '../user/repository.js';

/**
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
async function login(req, res) {
  const { email, password } = req.body;

  const user = await userRepository.findByEmail(email);
  if (!user) {
    res.status(401).send({ error: { message: 'Invalid credentials' } });
    return;
  }

  logger.info(await bcrypt.hash('Matrix11!', 10));

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(401).send({ error: { message: 'Invalid credentials' } });
    return;
  }

  logger.info(`Starting session for user ${user.id}`);
  req.session.regenerate();
  req.session.set('user', { id: user.id });

  res.status(204).send();
}

/**
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
async function logout(req, res) {
  const userId = req.session.user.id;

  logger.info(`Ending session for user ${userId}`);
  req.session.regenerate();
  res.status(204).send();
}

/**
 * @param {import("fastify").FastifyRequest} _
 * @param {import("fastify").FastifyReply} res
 */
async function check(_, res) {
  res.status(204).send();
}

export { check, login, logout };
