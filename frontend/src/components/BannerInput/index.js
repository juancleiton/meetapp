import React, { useState, useEffect, useRef } from 'react';
import { MdAddAPhoto } from 'react-icons/md';
import { useField } from '@rocketseat/unform';
import { Container } from './styles';
import api from '~/services/api';

export default function BannerInput() {
  const { defaultValue, registerField } = useField('banner');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'banner_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref]); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('upload/banner', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="banner">
        <img src={preview} alt="" />

        <div className="icon-add">
          <MdAddAPhoto size={48} color="#999" />
        </div>

        {defaultValue && (
          <div className="overlay">
            <MdAddAPhoto size={48} color="#999" />
          </div>
        )}

        <input
          type="file"
          id="banner"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
