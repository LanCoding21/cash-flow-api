import { compare, hash } from 'bcrypt';
import PasswordHash from '../../Applications/security/PasswordHash';
import InvariantError from '../../Commons/exceptions/InvariantError';

export default class BcryptPasswordHash extends PasswordHash {
  saltOrRounds: number;

  constructor(saltOrRounds: number = 10) {
    super();
    this.saltOrRounds = saltOrRounds;
  }

  hash(password: string): Promise<string> {
    return hash(password, this.saltOrRounds);
  }

  async comparePassword(plain: string, encrypted: string): Promise<void> {
    const result = await compare(plain, encrypted);
    if (!result) throw new InvariantError('Password not match');
  }
}
