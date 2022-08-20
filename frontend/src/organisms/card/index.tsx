import { name } from 'helpers/person';
import { PersonFromMongo } from 'types';

import React, { FC } from 'react';

import DetailsModal from 'organisms/details/modal';

import { Card, Group, Image, Text } from '@mantine/core';

import EditModal from '../../pages/dashboard/edit-modal';
import placeholderFemale from './placeholder-female.png';
import placeholderMale from './placeholder-male.png';

const PersonCard: FC<{ data: PersonFromMongo; onUpdate: () => void }> = ({ data, onUpdate }) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={data.gender === 'female' ? placeholderFemale : placeholderMale}
          height={160}
          alt="Placeholder photo"
          fit="contain"
        />
      </Card.Section>

      <Group mt="md" mb="xs" position="apart">
        <Text weight={500}>{name(data)}</Text>
        <EditModal data={data} onComplete={onUpdate} />
      </Group>

      <Text size="sm" color="dimmed">
        Nato a .. il .. <br />
      </Text>

      <DetailsModal id={data._id} onUpdate={onUpdate} />
    </Card>
  );
};

export default PersonCard;
