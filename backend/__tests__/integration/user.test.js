import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('User Store', () => {
  // Executar o truncate antes de comecar cada um dos testes
  beforeEach(async () => {
    await truncate();
  });

  // User Store

  it('should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    // Criar o usuario duas vezes, para dar erro.
    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  // ---------------------------------------------------------------------------

  // YUP

  // Check when not send name, email, password

  it('Should not be able register when not send name', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'alanrocketseat.com.br',
        password: '123456',
      });

    expect(response.body.error).toBe('Validation fails');
  });

  it('Should not be able register when not send email', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Alan Costa',
        password: '123456',
      });

    expect(response.body.error).toBe('Validation fails');
  });

  it('Should not be able register when not send password', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Alan Costa',
        email: 'alanrocketseat.com.br',
      });

    expect(response.body.error).toBe('Validation fails');
  });

  // Check fields

  it('Check if field email not have format of email', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Alan Costa',
        email: 'alanrocketseat.com.br',
        password: '123456',
      });

    expect(response.body.error).toBe('Validation fails');
  });

  it('Check if field is less than 6 characters', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Alan Costa',
        email: 'alan@rocketseat.com.br',
        password: '12345',
      });

    expect(response.body.error).toBe('Validation fails');
  });
});

describe('User Update', () => {
  // User Update

  beforeEach(async () => {
    await truncate();
  });

  it('Update User', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const response = await request(app)
      .put('/users')
      .send({
        name: 'Alan',
        email: 'alan@rocketseat.com.br',
        oldPassword: user.password,
        password: '123456',
        confirmPassword: '123456',
      })
      .set('Authorization', `Bearer ${sessionData.token}`);

    expect(response.status).toBe(200);
  });

  it('Should not update with email already exist', async () => {
    const registeredUser = await factory.attrs('User', {
      email: 'alreadyregistered@email.com',
    });
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    await request(app)
      .post('/users')
      .send(registeredUser);

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const response = await request(app)
      .put('/users')
      .send({ email: registeredUser.email, name: 'Alan' })
      .set('Authorization', `Bearer ${sessionData.token}`);

    expect(response.status).toBe(400);
  });

  it('Should be not possible update an user with a wrong old password', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const response = await request(app)
      .put('/users')
      .send({
        oldPassword: '123456',
        password: '1234567',
        confirmPassword: '1234567',
      })
      .set('Authorization', `Bearer ${sessionData.token}`);

    expect(response.status).toBe(401);
  });

  it('Should be not possible update an user with password and confirmPassword, different', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const response = await request(app)
      .put('/users')
      .send({
        oldPassword: '123456',
        password: '12345678',
        confirmPassword: '1234567',
      })
      .set('Authorization', `Bearer ${sessionData.token}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation fails');
  });

  // YUP

  it('Should be not to update user only with oldPassword', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const response = await request(app)
      .put('/users')
      .send({
        oldPassword: '123456',
      })
      .set('Authorization', `Bearer ${sessionData.token}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation fails');
  });

  it('Should be not to update user only with oldPassword and password, required confirmPassword', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const response = await request(app)
      .put('/users')
      .send({
        oldPassword: '123456',
        password: '1234567',
      })
      .set('Authorization', `Bearer ${sessionData.token}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation fails');
  });
});
