import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Meetup from '../src/app/models/Meetup';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Meetup', Meetup, {
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  location: faker.address.city(),
  date: faker.date.future(),
  banner_id: faker.random.number(),
});

export default factory;
