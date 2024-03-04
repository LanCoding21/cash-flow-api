import AuthToken from '../../../Domains/auth/entities/AuthToken';
import prismaMock from '../../database/prisma/singleton';
import AuthRepositoryPrisma from '../AuthRepositoryPrisma';

describe('AuthRepositoryPrisma', () => {
  const authRepositoryPrisma = new AuthRepositoryPrisma(prismaMock);

  describe('addToken', () => {
    it('should add token to database', async () => {
      const token = 'Token';
      const prismaSpy = jest.spyOn(prismaMock.authentication, 'findFirst');
      prismaMock.authentication.findFirst.mockResolvedValue({ id: 1, token });

      await authRepositoryPrisma.addToken(token);
      const addedToken = await prismaMock.authentication.findFirst({
        where: { token },
      });

      expect(addedToken?.id).toBe(1);
      expect(addedToken?.token).toBe(token);
      expect(prismaSpy).toHaveBeenCalledWith({ where: { token } });
    });
  });

  describe('checkAvailabilityToken', () => {
    it('should throw NotFoundError when token is not found', async () => {
      const token = 'Not found token';
      prismaMock.authentication.findFirst.mockResolvedValue(null);

      await expect(
        authRepositoryPrisma.checkAvailabilityToken(token),
      ).rejects.toThrow('Refresh token not found');
    });

    it('should not throw not found error if token exist', async () => {
      const token = 'TOKEN';
      const prismaSpy = jest.spyOn(prismaMock.authentication, 'findFirst');
      prismaMock.authentication.findFirst.mockResolvedValue({ id: 1, token });

      await expect(
        authRepositoryPrisma.checkAvailabilityToken(token),
      ).resolves.not.toThrow('Refresh token not found');
      expect(prismaSpy).toHaveBeenCalledWith({ where: { token } });
    });
  });

  describe('deleteToken', () => {
    it('should delete token from database', async () => {
      const token = 'token';
      const prismaSpy = jest.spyOn(prismaMock.authentication, 'delete');
      prismaMock.authentication.findFirst.mockResolvedValue(null);

      await authRepositoryPrisma.deleteToken(token);
      const currToken = await prismaMock.authentication.findFirst({
        where: { token },
      });

      expect(currToken).toBe(null);
      expect(prismaSpy).toHaveBeenCalledWith({ where: { token } });
    });
  });

  describe('deleteTokenById', () => {
    it('should delete token from database', async () => {
      const id = 1;
      const prismaSpy = jest.spyOn(prismaMock.authentication, 'delete');

      prismaMock.authentication.findFirst.mockResolvedValue(null);

      await authRepositoryPrisma.deleteTokenById(id);
      const currToken = await prismaMock.authentication.findFirst({
        where: { id },
      });

      expect(currToken).toBe(null);
      expect(prismaSpy).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('getToken', () => {
    it('should return AuthToken entities', async () => {
      const token = 'token';
      const id = 1;
      const expectedToken = new AuthToken({ id, token });
      const prismaSpy = jest.spyOn(prismaMock.authentication, 'findFirst');

      prismaMock.authentication.findFirst.mockResolvedValue({ id, token });

      const currToken = await authRepositoryPrisma.getToken(token);

      expect(currToken).toEqual(expectedToken);
      expect(prismaSpy).toHaveBeenCalledWith({ where: { token } });
    });
  });
});
