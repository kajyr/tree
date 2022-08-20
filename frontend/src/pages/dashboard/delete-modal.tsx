import { callApi, callJsonApi } from 'helpers/api';
import { name } from 'helpers/person';
import { Person, PersonFromMongo } from 'types';

import { FC, useState } from 'react';
import React from 'react';

import { ActionIcon, Button, Group, LoadingOverlay, Modal, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons';

const DeleteModal: FC<{ data: PersonFromMongo; onComplete: () => void }> = ({ data, onComplete }) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(person: Person) {
    setLoading(true);

    await callApi('/api/person', { body: JSON.stringify(person), method: 'DELETE' });
    setLoading(false);
    setOpened(false);
    onComplete();
  }

  return (
    <>
      <Modal
        size="xs"
        opened={opened}
        onClose={() => {
          setOpened(false), setLoading(false);
        }}
        title={`Delete ${name(data)}`}
        closeOnEscape={!loading}
        closeOnClickOutside={!loading}
        trapFocus={true}>
        <div style={{ position: 'relative' }}>
          <LoadingOverlay visible={loading} overlayBlur={2} />
          <Text>Do you really want to delete {name(data)}?</Text>
          <Group position="right" mt="md">
            <Button
              onClick={() => {
                submit(data);
              }}>
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setOpened(false), setLoading(false);
              }}>
              Cancel
            </Button>
          </Group>
        </div>
      </Modal>

      <ActionIcon color="blue" size="sm" onClick={() => setOpened(true)}>
        <IconTrash />
      </ActionIcon>
    </>
  );
};

export default DeleteModal;
