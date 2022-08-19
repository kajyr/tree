import { callJsonApi } from 'helpers/api';
import { Person } from 'types';

import { FC, useState } from 'react';
import React from 'react';

import { Button, LoadingOverlay, Modal } from '@mantine/core';

import PersonForm from './form';

const AddModal: FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(person: Person) {
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

      <Button onClick={() => setOpened(true)} variant="outline">
        Add a new person
      </Button>
    </>
  );
};

export default AddModal;
