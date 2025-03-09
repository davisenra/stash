/**
 * Authentication hook to protect routes.
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
export async function authenticate(req, res) {
  const user = req.session.get('user');
  if (!user) {
    res.status(401).send({ result: { message: 'Unauthorized' } });
    return;
  }

  req.session.touch();
}
