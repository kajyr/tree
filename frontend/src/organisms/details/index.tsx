import { fp2p, name } from 'helpers/person';
import { FullPerson, PersonFromMongo } from 'types';

import React, { FC } from 'react';

import { Group, Image, Text } from '@mantine/core';

import EditModal from '../../pages/dashboard/edit-modal';
import placeholderFemale from '../card/placeholder-female.png';
import placeholderMale from '../card/placeholder-male.png';
import DeleteModal from '../modal-delete';

const Details: FC<{ data: FullPerson; onUpdate: () => void }> = ({ data, onUpdate }) => {
  return (
    <>
      <Image
        src={data.gender === 'female' ? placeholderFemale : placeholderMale}
        height={160}
        alt="Placeholder photo"
        fit="contain"
      />

      <Group mt="md" mb="xs" position="apart">
        <Text weight={500}>{name(data)}</Text>
        <Group>
          <EditModal data={fp2p(data)} onComplete={onUpdate} />
          <DeleteModal data={fp2p(data)} onComplete={onUpdate} />
        </Group>
      </Group>

      {data.father && <Text size="sm">Father: {name(data.father)}</Text>}
      {data.mother && <Text size="sm">Mother: {name(data.mother)}</Text>}

      <Text size="sm" color="dimmed">
        Nato a .. il .. <br />
      </Text>
    </>
  );
};

export default Details;
