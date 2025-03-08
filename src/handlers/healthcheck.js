export async function healthcheck(req, res) {
  res.send({
    time: new Date().getTime(),
    status: true,
  });
}
