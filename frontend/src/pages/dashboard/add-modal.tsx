import { callJsonApi } from 'helpers/api';
import { PersonWithoutId } from 'types';

import { FC, useState } from 'react';
import React from 'react';

import PersonForm from 'molecules/person-form';

import { ActionIcon, LoadingOverlay, Modal } from '@mantine/core';
import { IconUserPlus } from '@tabler/icons';

const AddModal: FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(person: PersonWithoutId) {
    setLoading(true);

    await callJsonApi('/api/person', { body: JSON.stringify(person), method: 'POST' });
    setLoading(false);
    setOpened(false);
    onComplete();
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false), setLoading(false);
        }}
        title="Add a new person"
        closeOnEscape={!loading}
        closeOnClickOutside={!loading}
        trapFocus={true}>
        <div style={{ position: 'relative' }}>
          <LoadingOverlay visible={loading} overlayBlur={2} />
          <PersonForm data={{}} onChange={submit} />
        </div>
      </Modal>

      <ActionIcon color="blue" size="sm" onClick={() => setOpened(true)}>
        <IconUserPlus />
      </ActionIcon>
    </>
  );
};

export default AddModal;
