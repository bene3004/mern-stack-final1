import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 }); // TTL = 60 secs

const cache1 = (req, res, next) => {
  const key = req.originalUrl;
  const cachedData = cache1.get(key);

  if (cachedData) {
    return res.json(cachedData);
  }

  res.sendResponse = res.json;
  res.json = (body) => {
    cache1.set(key, body);
    res.sendResponse(body);
  };

  next();
};

export default cache1;