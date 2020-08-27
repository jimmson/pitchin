export default function handleError(err: any, res: any) {
  if (err.statusCode) {
    return res.status(err.statusCode).send(err.message);
  } else {
    console.error(err.stack);
    return res.status(500).send('Internal server error');
  }
}
