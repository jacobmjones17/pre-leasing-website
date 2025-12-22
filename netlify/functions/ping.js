exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ok: true,
      message: 'ping from Netlify function',
      time: new Date().toISOString(),
    }),
  };
};
