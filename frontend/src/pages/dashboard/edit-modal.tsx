import { name } from 'common';
import { callJsonApi } from 'helpers/api';
import { Person, PersonWithoutId } from 'types';

import { FC, useState } from 'react';
import React from 'react';

import { ActionIcon, LoadingOverlay, Modal } from '@mantine/core';
import { IconPencil } from '@tabler/icons';

import PersonForm from '../../molecules/person-form';

const EditModal: FC<{ data: Person; onComplete: () => void }> = ({ data, onComplete }) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(person: PersonWithoutId) {
    setLoading(true);

    await callJsonApi('/api/person', { body: JSON.stringify(person), method: 'PUT' });
    setLoading(false);
    setOpened(false);
    onComplete();
  }

  return (
    <>
      <Modal
        size="lg"
        opened={opened}
        onClose={() => {
          setOpened(false), setLoading(false);
        }}
        title={`Edit ${name(data)}`}
        closeOnEscape={!loading}
        closeOnClickOutside={!loading}
        trapFocus={true}>
        <div style={{ position: 'relative' }}>
          <LoadingOverlay visible={loading} overlayBlur={2} />
          <PersonForm data={data} onChange={submit} />
        </div>
      </Modal>

      <ActionIcon color="blue" size="sm" onClick={() => setOpened(true)}>
        <IconPencil />
      </ActionIcon>
    </>
  );
};

export default EditModal;
