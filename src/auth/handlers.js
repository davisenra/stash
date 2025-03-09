import bcrypt from 'bcrypt';
import userRepository from '../repositories/userRepository.js';

/**
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
async function login(req, res) {
  const { email, password } = req.body;
  const user = await userRepository.findByEmail(email);
  if (!user) {
    res.status(401).send({ result: { message: 'Invalid credentials' } });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    res.status(401).send({ result: { message: 'Invalid credentials' } });
    return;
  }

  req.session.set('user', { id: user.id });
  await req.session.save();

  res.status(204);
}

/**
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
async function logout(req, res) {
  req.session.delete();
  res.status(204);
}

export { login, logout };
