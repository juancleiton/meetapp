import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdSave } from 'react-icons/md';
import BannerInput from '~/components/BannerInput';
import DatePicker from '~/components/DatePicker';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, Button } from './styles';

export default function CreateMeetup() {
  async function handleSubmit(data) {
    try {
      const response = await api.post('meetups', data);

      toast.success('Meetup criado com sucesso');

      history.push(`/meetups/${response.data.id}`);
    } catch (err) {
      toast.error('Erro ao criar o meeteup');
    }
  }

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit}>
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
              Criar meetup
            </button>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}
