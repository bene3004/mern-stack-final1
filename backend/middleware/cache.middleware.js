import NodeCache from 'node-cache';

const cacheMiddleware = new NodeCache({ stdTTL: 60 }); // TTL = 60 secs

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  const cachedData = cacheMiddleware.get(key);

  if (cachedData) {
    return res.json(cachedData);
  }

  res.sendResponse = res.json;
  res.json = (body) => {
    cacheMiddleware.set(key, body);
    res.sendResponse(body);
  };

  next();
};

export default cacheMiddleware;