import { usePersons } from 'helpers/api';

import React, { FC } from 'react';

import Loader from 'atoms/Loader';

import Page from 'templates/Page';

import { Divider, Group, RingProgress, SimpleGrid, Text } from '@mantine/core';

import PersonCard from '../../organisms/card';
import AddModal from './add-modal';
import Nav from './nav';
import Alive from './stats/alive';
import GenderDistr from './stats/gender-distr';

const Dashboard: FC = () => {
  const { isLoading, data, refetch } = usePersons();

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <Page navbar={<Nav list={data.persons} />}>
      <Group position="right">
        <AddModal onComplete={refetch} />
      </Group>
      <Divider my="xs" label="Stats" />
      <SimpleGrid cols={3} spacing="sm">
        <GenderDistr list={data.persons} />
        <Alive list={data.persons} />
      </SimpleGrid>
      <Divider my="xs" label="Persons in the DB" />
      <SimpleGrid cols={4}>
        {data.persons.map(person => {
          return <PersonCard key={person._id} data={person} onUpdate={refetch} />;
        })}
      </SimpleGrid>
    </Page>
  );
};

export default Dashboard;
