import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { parseISO } from 'date-fns';
import { MdSave } from 'react-icons/md';
import BannerInput from '~/components/BannerInput';
import DatePicker from '~/components/DatePicker';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, Button } from './styles';

export default function EditMeetup({ match }) {
  const { id } = match.params;

  const [meetup, setMeetup] = useState(null);

  useEffect(() => {
    async function loadMeetup() {
      try {
        const response = await api.get(`organizing/${id}`);
        console.tron.log(response);
        setMeetup({
          ...response.data,
          date: parseISO(response.data.date),
        });
      } catch (err) {
        toast.error('Meetup not found');
        history.push('/');
      }
    }

    loadMeetup();

    // setTimeout(loadMeetup, 1000); // PARA ATRASAR
  }, [id]);

  async function handleSubmit(data) {
    try {
      await api.put(`meetups/${id}`, data);

      toast.success('Meetup foi alterado com sucesso');

      history.push(`/meetups/${id}`);
    } catch (err) {
      toast.error('Erro ao editar o meetup');
    }
  }

  return (
    <Container>
      <Content>
        <Form initialData={meetup} onSubmit={handleSubmit}>
          <BannerInput name="banner_id" />

          <Input name="title" placeholder="Título do Meetup" />
          <Input
            name="description"
            placeholder="Descrição completa"
            multiline
          />
          <DatePicker name="date" placeholder="Data do meetup" />
          <Input name="location" placeholder="Localização" />

          <Button>
            <button type="submit">
              <MdSave color="fff" size={18} margin-right={10} />
              Atualizar meetup
            </button>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

EditMeetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
