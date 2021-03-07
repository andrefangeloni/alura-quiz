import db from '../../db.json';

const api = (req, res) => {
  if (res.method === 'OPTIONS') {
    res.status(200).end();

    return;
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  );

  res.json(db);
};

export default api;
