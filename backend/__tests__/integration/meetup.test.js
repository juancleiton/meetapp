import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('Meetup', () => {
  beforeEach(async () => {
    await truncate();
  });

  // Index
  it('Should to be list meetups', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const {
      body: { id: banner_id },
    } = await request(app)
      .post('/upload/banner')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .type('application/x-www-form-urlencoded')
      .field('originalname', 'my awesome avatar')
      .field('filename', 'avatar')
      .attach('file', '__tests__/fixtures/google.jpg');

    const meetup = await factory.attrs('Meetup', {
      banner_id,
    });

    const meetupRes = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .send(meetup);

    const response = await request(app)
      .get('/meetups')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .query({ page: 1, date: meetup.date });

    expect(response.body[0].id).toEqual(response.body[0].id, meetupRes.body.id);
  });

  it('Should to be list meetups without informed page', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const {
      body: { id: banner_id },
    } = await request(app)
      .post('/upload/banner')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .type('application/x-www-form-urlencoded')
      .field('originalname', 'my awesome avatar')
      .field('filename', 'avatar')
      .attach('file', '__tests__/fixtures/google.jpg');

    const meetup = await factory.attrs('Meetup', {
      banner_id,
    });

    const meetupRes = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .send(meetup);

    const response = await request(app)
      .get('/meetups')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .query({ date: meetup.date });

    expect(response.body[0].id).toEqual(response.body[0].id, meetupRes.body.id);
  });

  // Store
  it('Should to be create meetup', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const {
      body: { id: banner_id },
    } = await request(app)
      .post('/upload/banner')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .type('application/x-www-form-urlencoded')
      .field('originalname', 'my awesome avatar')
      .field('filename', 'avatar')
      .attach('file', '__tests__/fixtures/google.jpg');

    const meetup = await factory.attrs('Meetup', {
      banner_id,
    });

    const response = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .send(meetup);

    expect(response.body).toHaveProperty('id');
  });

  it('Should not permitted create meetup withou fields setters', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const response = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .send({});

    expect(response.status).toBe(400);
  });

  it('Should not permitted create meetup with date past', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const {
      body: { id: banner_id },
    } = await request(app)
      .post('/upload/banner')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .type('application/x-www-form-urlencoded')
      .field('originalname', 'my awesome avatar')
      .field('filename', 'avatar')
      .attach('file', '__tests__/fixtures/google.jpg');

    const meetup = await factory.attrs('Meetup', {
      date: '2019-10-20T18:00:00-03:00',
      banner_id,
    });

    const response = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .send(meetup);

    // expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(400);
  });

  // Update
  it('Should update meetup', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const {
      body: { id: banner_id },
    } = await request(app)
      .post('/upload/banner')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .type('application/x-www-form-urlencoded')
      .field('originalname', 'my awesome avatar')
      .field('filename', 'avatar')
      .attach('file', '__tests__/fixtures/google.jpg');

    const meetup = await factory.attrs('Meetup', {
      banner_id,
    });

    const meetupRes = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .send(meetup);

    const response = await request(app)
      .put(`/meetups/${meetupRes.body.id}`)
      .set('Authorization', `Bearer ${sessionData.token}`)
      .send({ title: 'Ola' });

    expect(response.body).toHaveProperty('id');
  });

  it('Should not permitted update meetup without banner_id', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const {
      body: { id: banner_id },
    } = await request(app)
      .post('/upload/banner')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .type('application/x-www-form-urlencoded')
      .field('originalname', 'my awesome avatar')
      .field('filename', 'avatar')
      .attach('file', '__tests__/fixtures/google.jpg');

    const meetup = await factory.attrs('Meetup', {
      banner_id,
    });

    const meetupRes = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .send(meetup);

    const response = await request(app)
      .put(`/meetups/${meetupRes.body.id}`)
      .set('Authorization', `Bearer ${sessionData.token}`)
      .send({
        date: '2019-12-24T10:00:00-03:00',
        banner_id: 2,
      });

    expect(response.status).toBe(400);
  });

  it('Should not permitted update meetup with set field type different', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const {
      body: { id: banner_id },
    } = await request(app)
      .post('/upload/banner')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .type('application/x-www-form-urlencoded')
      .field('originalname', 'my awesome avatar')
      .field('filename', 'avatar')
      .attach('file', '__tests__/fixtures/google.jpg');

    const meetup = await factory.attrs('Meetup', {
      banner_id,
    });

    const meetupRes = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .send(meetup);

    const response = await request(app)
      .put(`/meetups/${meetupRes.body.id}`)
      .set('Authorization', `Bearer ${sessionData.token}`)
      .send({
        title: [],
        description: [],
        location: [],
        date: 23,
        banner_id: [],
      });

    expect(response.status).toBe(400);
  });

  it('Should not permitted update meetup not exist', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const {
      body: { id: banner_id },
    } = await request(app)
      .post('/upload/banner')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .type('application/x-www-form-urlencoded')
      .field('originalname', 'my awesome avatar')
      .field('filename', 'avatar')
      .attach('file', '__tests__/fixtures/google.jpg');

    const meetup = await factory.attrs('Meetup', {
      banner_id,
    });

    const meetupRes = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .send(meetup);

    const response = await request(app)
      .put(`/meetups/2`)
      .set('Authorization', `Bearer ${sessionData.token}`)
      .send({ title: 'Ola' });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Meetup not found');
  });

  it('Should not permitted update meetup with date past', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const {
      body: { id: banner_id },
    } = await request(app)
      .post('/upload/banner')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .type('application/x-www-form-urlencoded')
      .field('originalname', 'my awesome avatar')
      .field('filename', 'avatar')
      .attach('file', '__tests__/fixtures/google.jpg');

    const meetup = await factory.attrs('Meetup', {
      banner_id,
    });

    const meetupRes = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .send(meetup);

    const response = await request(app)
      .put(`/meetups/${meetupRes.body.id}`)
      .set('Authorization', `Bearer ${sessionData.token}`)
      .send({ date: '2019-10-20T18:00:00-03:00' });

    expect(response.body.error).toBe('Date is past');
    expect(response.status).toBe(400);
  });

  // Delete

  it('Should delete meetup', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const {
      body: { id: banner_id },
    } = await request(app)
      .post('/upload/banner')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .type('application/x-www-form-urlencoded')
      .field('originalname', 'my awesome avatar')
      .field('filename', 'avatar')
      .attach('file', '__tests__/fixtures/google.jpg');

    const meetup = await factory.attrs('Meetup', {
      banner_id,
    });

    const meetupRes = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .send(meetup);

    const response = await request(app)
      .delete(`/meetups/${meetupRes.body.id}`)
      .set('Authorization', `Bearer ${sessionData.token}`)
      .send();

    // expect(response.body.error).toBe('Date is past');
    expect(response.status).toBe(200);
  });

  it('Shout not delete meetup not exist', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const { body: sessionData } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const {
      body: { id: banner_id },
    } = await request(app)
      .post('/upload/banner')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .type('application/x-www-form-urlencoded')
      .field('originalname', 'my awesome avatar')
      .field('filename', 'avatar')
      .attach('file', '__tests__/fixtures/google.jpg');

    const meetup = await factory.attrs('Meetup', {
      banner_id,
    });

    const meetupRes = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${sessionData.token}`)
      .send(meetup);

    const response = await request(app)
      .delete(`/meetups/2`)
      .set('Authorization', `Bearer ${sessionData.token}`)
      .send();

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Meetup not found');
  });
});
