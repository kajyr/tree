import { name } from 'common';
import { PersonFromMongo } from 'types';

import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import LifeDates from 'atoms/life-dates';

import { Button, Card, Group, Image, Text } from '@mantine/core';

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

      <LifeDates person={data} />

      <Button variant="subtle" color="blue" fullWidth mt="md" component={Link} to={`/p/${data._id}`}>
        More
      </Button>
    </Card>
  );
};

export default PersonCard;
