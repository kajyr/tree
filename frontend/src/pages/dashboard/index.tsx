import { Api } from 'types';

import React, { FC } from 'react';

import { Divider, Group, RingProgress, SimpleGrid, Text } from '@mantine/core';

import PersonCard from '../../organisms/card';
import AddModal from './add-modal';
import GenderDistr from './stats/gender-distr';

const Dashboard: FC<{ data: Api.PersonsListResponse; update: () => void }> = ({ data, update }) => {
  return (
    <>
      <Group position="right">
        <AddModal onComplete={update} />
      </Group>
      <Divider my="xs" label="Stats" />
      <SimpleGrid cols={3} spacing="sm">
        <GenderDistr list={data.persons} />
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
          return <PersonCard key={person._id} data={person} onUpdate={update} />;
        })}
      </SimpleGrid>
    </>
  );
};

export default Dashboard;
