import crypto from 'crypto';

export default function generateRandomId(length = 8) {
  return crypto.randomBytes(length).toString('hex');
}
