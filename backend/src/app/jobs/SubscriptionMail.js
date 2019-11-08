import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    await Mail.sendEmail({
      to: `${meetup.user.name} <${meetup.user.email}>`, // La no SubscriptionController.js, no const meetup, tem o include:[User], ai ele ta pegando do meetup o User o nome
      subject: `[${meetup.title}] - Nova inscrição`,
      template: 'subscription',
      context: {
        organizer: meetup.user.name,
        meetup: meetup.title,
        user: user.name,
        email: user.email,
        date: format(
          parseISO(meetup.date),
          "'Dia' dd 'de' MMMM', ás' HH:mm'h'",
          { locale: pt }
        ),
      },
    });
  }
}

export default new SubscriptionMail();
