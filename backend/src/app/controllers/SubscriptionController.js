import { Op } from 'sequelize';

import User from '../models/User';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import File from '../models/File';

import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

class SubscriptionController {
  // Crie uma rota para listar os meetups em que o usuário logado está inscrito.
  // Liste apenas meetups que ainda não passaram e ordene meetups mais próximos como primeiros da lista.
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date: {
              [Op.gt]: new Date(), // Se a data do meetup for maior que a data atual, entao vai pegar
            },
          },
          include: [
            { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
            { model: File, as: 'banner', attributes: ['id', 'path', 'url'] },
          ],
        },
      ],
      order: [['meetup', 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    // Pegar o id do meetup pelo parametro na rota
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [{ model: User, as: 'user' }],
    });

    // Pegar o id do usuario logado na tabela User, com id de autenticacao que esta em todas as rotas com o middleware
    const user = await User.findByPk(req.userId);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found.' });
    }

    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to you own meetups" });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't susbcribe to past meetups" });
    }

    // Verificar se o usuario ja se inscreveu no meetup
    const userAlreadySubscribed = await Subscription.findOne({
      where: {
        meetup_id: meetup.id,
        user_id: req.userId,
      },
    });

    if (userAlreadySubscribed) {
      return res
        .status(400)
        .json({ error: 'You are already subscribed to this meetup' });
    }

    // Onde tenha o usuario logado e exista preenchido o date na tabela meetups
    const sameDateSubscriptionExists = await Subscription.findOne({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: { date: meetup.date },
        },
      ],
    });

    if (sameDateSubscriptionExists) {
      return res.status(400).json({
        error: 'You are already subscribed for a meetup on the same date.',
      });
    }

    // meetup_id e user_id, da tabela subscription pegando do tabela meetup o id, e o userId do usuario logado.
    const subscription = await Subscription.create({
      meetup_id: meetup.id,
      user_id: req.userId,
    });

    // Enviar email para o Organizador
    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const user = req.userId;

    const meetup = await Meetup.findByPk(req.params.id);

    // Verificar se o meetup nao existe
    if (!meetup) {
      return res.status(401).json({ error: 'Meetup not found' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't delete past meetups" });
    }

    const subscription = await Subscription.findOne({
      where: {
        meetup_id: meetup.id,
        user_id: user,
      },
    });

    if (!subscription) {
      return res
        .status(400)
        .json({ error: 'You are not subscribed at this meetup' });
    }

    subscription.destroy();

    return res.send({ message: 'Deleted' });
  }
}

export default new SubscriptionController();
