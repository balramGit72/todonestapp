import * as jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || 'jwt';

const createJwtToken = (payload: any = {}) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
};

const verifyToken = (token: any) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    // Token verification failed
    return null;
  }
};

export { createJwtToken, verifyToken };
