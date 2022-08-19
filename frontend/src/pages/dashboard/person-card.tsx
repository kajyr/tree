import { PersonFromMongo } from 'types';

import React, { FC } from 'react';

import { Button, Card, Group, Image, Text } from '@mantine/core';

import placeholderMan from './placeholder-male.png';

const PersonCard: FC<{ data: PersonFromMongo }> = ({ data }) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={placeholderMan} height={160} alt="Placeholder photo" fit="contain" />
      </Card.Section>

      <Group mt="md" mb="xs">
        {data.name && <Text weight={500}>{data.name}</Text>}
        {data.surname && <Text weight={500}>{data.surname}</Text>}
      </Group>

      <Text size="sm" color="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around
        the fjords of Norway
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  );
};

export default PersonCard;
