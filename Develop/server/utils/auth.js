const jwt = require('jsonwebtoken');
const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    console.log("body", req.body.token);
    console.log("query", req.query.token);
    console.log("headers", req.headers.authorization);
    let token = req.body.token || req.query.token || req.headers.authorization;
    console.log ("token",token);
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });

      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },
  signToken: function ({username, usertype, _id }) {
    const payload = {username, usertype, _id  };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
