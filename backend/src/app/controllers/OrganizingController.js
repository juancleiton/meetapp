import Meetup from '../models/Meetup';
import File from '../models/File';

class OrganizingController {
  //  Crie uma rota para listar os meetups que são organizados pelo usuário logado.(FEITO)
  async index(req, res) {
    const meetups = await Meetup.findAll({ where: { user_id: req.userId } });

    return res.json(meetups);
  }

  async show(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    return res.json(meetup);
  }
}

export default new OrganizingController();
