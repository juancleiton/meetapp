import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import MeetupController from './app/controllers/MeetupController';
import SubscriptionController from './app/controllers/SubscriptionController';
import OrganizingController from './app/controllers/OrganizingController';

import AvatarController from './app/controllers/AvatarController';
import BannerController from './app/controllers/BannerController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/meetups', MeetupController.index);
routes.post('/meetups', MeetupController.store);
routes.put('/meetups/:id', MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

routes.post('/meetups/:id/subscriptions', SubscriptionController.store);
routes.delete('/meetups/:id/subscriptions', SubscriptionController.delete);

routes.get('/subscriptions', SubscriptionController.index);

routes.get('/organizing', OrganizingController.index);
routes.get('/organizing/:id', OrganizingController.show);

routes.post('/upload/avatar', upload.single('file'), AvatarController.store);
routes.post('/upload/banner', upload.single('file'), BannerController.store);

export default routes;
