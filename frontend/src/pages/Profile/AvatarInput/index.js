import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { Container } from './styles';
import api from '~/services/api';

export default function AvatarInput() {
  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  // Para o rocketseat/unform acessar a informacao do input
  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref]); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    // O campo file dentro do insomnia no MultipartForm
    data.append('file', e.target.files[0]);

    // Para se conectar com a rota de inserir foto do usuario, enviando data que eh onde ta a imagem
    const response = await api.post('upload/avatar', data);
    console.tron.log(response);

    // Aqui e a resposta que da la no insomnia
    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            preview || 'https://api.adorable.io/avatars/50/abott@adorable.png'
          }
          alt=""
        />

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
