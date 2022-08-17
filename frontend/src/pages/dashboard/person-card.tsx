import { PersonFromMongo } from 'types';

import React, { FC } from 'react';

import { Badge, Button, Card, Group, Image, Text } from '@mantine/core';

const PersonCard: FC<{ data: PersonFromMongo }> = ({ data }) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
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
