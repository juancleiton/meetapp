import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('User Session', () => {
  beforeEach(async () => {
    await truncate();
  });

  // User Session
  it('should be able to create a session', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    expect(response.status).toBe(200);
  });

  it('should not to be possible create session with a unexistent user', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'alan@rocketseat.com.br',
        password: user.password,
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('User not found');
  });

  it('should not to be possible create session with a wrong password', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '1234567',
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Password does not match');
  });

  it('should not to be create a session without email and password', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({});

    expect(response.status).toBe(400);
  });
});
