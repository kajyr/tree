import { callApi, callJsonApi } from 'helpers/api';
import { name } from 'helpers/person';
import { Api, Person, PersonFromMongo } from 'types';

import { FC, useState } from 'react';
import React from 'react';
import { useQuery } from 'react-query';

import { Button, LoadingOverlay, Modal } from '@mantine/core';

import Details from './';

const ModalContent: FC<{ id: string; onUpdate: () => void; onClose: () => void }> = ({ onClose, id, onUpdate }) => {
  const { isLoading, data } = useQuery<Api.DetailsResponse>(['details', id], () =>
    callApi(`/api/person/${id}`).then(res => res.json())
  );

  return (
    <Modal opened={true} onClose={onClose} title="Details" size="xl">
      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        {data && <Details onUpdate={onUpdate} data={data} />}
      </div>
    </Modal>
  );
};

const DetailsModal: FC<{ id: string; onUpdate: () => void }> = ({ id, onUpdate }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      {opened && <ModalContent id={id} onUpdate={onUpdate} onClose={() => setOpened(false)} />}
      <Button variant="subtle" color="blue" fullWidth mt="md" onClick={() => setOpened(true)}>
        More
      </Button>
    </>
  );
};

export default DetailsModal;
