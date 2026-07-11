import { registerAs } from '@nestjs/config';

export default registerAs('hash', () => ({
  rounds: process.env.SALT_ROUNDS,
}));
