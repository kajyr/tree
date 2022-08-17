import { Api } from 'types';

import React, { FC } from 'react';

import { Button, Divider, Group, RingProgress, SimpleGrid, Text } from '@mantine/core';

import AddModal from './add-modal';
import PersonCard from './person-card';

const Dashboard: FC<{ data: Api.PersonsListResponse }> = ({ data }) => {
  return (
    <>
      <Group position="right">
        <AddModal />
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
      </Group>
      <Divider my="xs" label="Stats" />
      <SimpleGrid cols={3} spacing="sm">
        <RingProgress
          label={
            <Text size="xs" align="center">
              Sesso
            </Text>
          }
          sections={[
            { color: 'cyan', value: 40 },
            { color: 'orange', value: 15 },
            { color: 'grape', value: 15 }
          ]}
        />
        <RingProgress
          label={
            <Text size="xs" align="center">
              Vivi/Deceduti
            </Text>
          }
          sections={[
            { color: 'cyan', value: 40 },
            { color: 'orange', value: 15 },
            { color: 'grape', value: 15 }
          ]}
        />
      </SimpleGrid>
      <Divider my="xs" label="Persons in the DB" />
      <SimpleGrid cols={3}>
        {data.persons.map(person => {
          return <PersonCard key={person._id} data={person} />;
        })}
      </SimpleGrid>
      <Divider my="xs" label="Debug" />
      <pre>
        <code>{JSON.stringify(data, undefined, 2)}</code>
      </pre>
    </>
  );
};

export default Dashboard;
