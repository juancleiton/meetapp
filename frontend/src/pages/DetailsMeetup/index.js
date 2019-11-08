import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

import Loader from 'react-loader-spinner';

import {
  MdEdit,
  MdDeleteForever,
  MdDateRange,
  MdLocationOn,
} from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

export default function DetailsMeetup({ match }) {
  const { id } = match.params;

  const [loading, setLoading] = useState(true);
  const [meetup, setMeetup] = useState(null);

  useEffect(() => {
    async function loadMeetup() {
      try {
        const response = await api.get(`organizing/${id}`);
        console.tron.log(response);
        setMeetup({
          ...response.data,
          formattedDate: format(
            parseISO(response.data.date),
            "dd 'de' MMMM', às' HH'h'",
            { locale: pt }
          ),
        });

        setLoading(false);
      } catch (err) {
        toast.error('Meetup not found');
        history.push('/');
      }
    }

    loadMeetup();

    // setTimeout(loadMeetup, 1000); // PARA ATRASAR
  }, [id]);

  function handleEdit() {
    history.push(`/meetups/${id}/edit`);
  }

  async function handleCancel() {
    try {
      await api.delete(`/meetups/${id}`);

      toast.success('Meetup foi cancelado');

      history.push('/');
    } catch (err) {
      toast.error('Erro ao cancelar o meetup');
    }
  }

  return (
    <Container>
      {loading ? (
        <div className="loading">
          <Loader type="TailSpin" color="#FFF" width={60} height={60} />
        </div>
      ) : (
        <Content>
          <header>
            <h1>{meetup && meetup.title}</h1>

            {meetup && !meetup.past && (
              <nav>
                <button type="button" className="edit" onClick={handleEdit}>
                  <MdEdit size={16} color="#FFF" />
                  Editar
                </button>

                <button type="button" className="cancel" onClick={handleCancel}>
                  <MdDeleteForever size={20} color="#FFF" />
                  Cancelar
                </button>
              </nav>
            )}
          </header>

          <main>
            <div className="banner">
              <img
                src={meetup && meetup.banner.url}
                alt={meetup && meetup.title}
              />
            </div>

            <div className="description">
              <p>{meetup && meetup.description}</p>

              <div className="info">
                <p>
                  <MdDateRange size={18} color="#999" />
                  {meetup && meetup.formattedDate}
                </p>

                <p>
                  <MdLocationOn size={18} color="#999" />
                  {meetup && meetup.location}
                </p>
              </div>
            </div>
          </main>
        </Content>
      )}
    </Container>
  );
}

DetailsMeetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
