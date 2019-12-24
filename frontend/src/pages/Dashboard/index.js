import React, { useEffect, useState } from 'react';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

import api from '~/services/api';

import { Container, Content, MeetupList, Meetup } from './styles';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('organizing');

      const data = response.data.map(meetup => {
        return {
          ...meetup,
          formattedDate: format(
            parseISO(meetup.date),
            "dd 'de' MMMM', às' HH'h'mm",
            { locale: pt }
          ),
        };
      });

      setMeetups(data);
      setLoading(false);
    }

    loadMeetups();
  }, []);

  return (
    <Container>
      {loading ? (
        <div className="loading">
          <Loader type="TailSpin" color="#FFF" width={60} height={60} />
        </div>
      ) : (
        <Content>
          <header>
            <h1>Meus Meetups</h1>
            <Link to="meetups/create">
              <MdAddCircleOutline color="#fff" size={18} />
              Novo meetup
            </Link>
          </header>

          <MeetupList>
            {!meetups.length && <div className="empty">Nao existe meetups</div>}

            {meetups.map(meetup => (
              <Meetup
                to={`/meetups/${meetup.id}`}
                key={meetup.id}
                past={meetup.past ? 1 : 0}
              >
                <p>{meetup.title}</p>

                <aside>
                  <p>{meetup.formattedDate}</p>
                  <MdChevronRight color="#fff" size={36} />
                </aside>
              </Meetup>
            ))}
          </MeetupList>
        </Content>
      )}
    </Container>
  );
}
