import * as Yup from 'yup';

import { Op } from 'sequelize';
import { isBefore, parseISO, startOfDay, endOfDay } from 'date-fns';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async index(req, res) {
    // Para armazenar os agendamentos encontrados
    const where = {};

    // Numero da pagina que foi passado na query do insomnia, e esta como pagina default a 1
    const { page = 1 } = req.query;

    // Ver se existe alguma data na query date, se existir transformar em string com o parseISO
    if (req.query.date) {
      const searchDate = parseISO(req.query.date);

      // Buscar os agendamento que tem o mesmo dia passado na query
      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    const meetups = await Meetup.findAll({
      where,
      order: ['date'],
      limit: 10,
      offset: (page - 1) * 10, // Vai pular a quantidade de agendamento, 3-1 = 2 * 10 = 20. Pula 20 agendamentos
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: File, as: 'banner', attributes: ['id', 'path', 'url'] },
      ],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      banner_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    // Não cadastrar meetups com datas que já passaram.
    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Date is past' });
    }

    // Esse req.userId, esta global para todas as rotas pelo middleware, que tem o id do usuario logado
    // E esse user_id, vai ir pro banco de dados junto com o ...req.body no create
    const user_id = req.userId;

    const meetup = await Meetup.create({
      ...req.body,
      user_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
      banner_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { banner_id } = req.body;

    // Verificar se nao existe o arquivo do banner
    const isFile = await File.findByPk(req.body.banner_id);

    if (banner_id && !isFile) {
      return res.status(400).json({ error: 'File not found' });
    }

    // id do usuario logado
    const user_id = req.userId;

    // Pegando o id do meetup pelo parametro na url
    const meetup = await Meetup.findByPk(req.params.id);

    // Verificar se o meetup nao existe
    if (!meetup) {
      return res.status(401).json({ error: 'Meetup not found' });
    }

    // Somente o usuario que criou o Meetup pode editar o evento
    if (meetup.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    // Não cadastrar meetups com datas que já passaram.
    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Date is past' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't update past meetups" });
    }

    const { id } = await meetup.update(req.body);

    // Atualizar a imagem do meetup na hora de editar
    const updatedMeetup = await Meetup.findByPk(id, {
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    return res.json(updatedMeetup);
  }

  async delete(req, res) {
    // Id do usuario logado
    const user_id = req.userId;

    // Pegando o id do meetup pelo parametro na url
    const meetup = await Meetup.findByPk(req.params.id);

    // Verificar se o meetup nao existe
    if (!meetup) {
      return res.status(401).json({ error: 'Meetup not found' });
    }

    if (meetup.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't delete past meetups" });
    }

    if (isBefore(meetup.date, new Date())) {
      return res.status(400).json({ error: "Can't delete past meetups" });
    }

    meetup.destroy();

    return res.send();
  }
}

export default new MeetupController();
