const buckets = new Map();

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length) {
    return forwarded.split(",")[0].trim();
  }
  return req.ip || req.connection?.remoteAddress || "unknown";
}

function createRateLimiter({ windowMs, maxRequests }) {
  return (req, res, next) => {
    const now = Date.now();
    const key = `${getClientIp(req)}:${req.path}`;
    const record = buckets.get(key) || { hits: 0, resetAt: now + windowMs };

    if (now > record.resetAt) {
      record.hits = 0;
      record.resetAt = now + windowMs;
    }

    record.hits += 1;
    buckets.set(key, record);

    const remaining = Math.max(maxRequests - record.hits, 0);
    res.setHeader("X-RateLimit-Limit", String(maxRequests));
    res.setHeader("X-RateLimit-Remaining", String(remaining));
    res.setHeader("X-RateLimit-Reset", String(Math.ceil(record.resetAt / 1000)));

    if (record.hits > maxRequests) {
      res.status(429).json({
        error: "Too many requests. Please try again later.",
      });
      return;
    }

    next();
  };
}

const movieCreateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  maxRequests: 10,
});

module.exports = {
  movieCreateLimiter,
};
