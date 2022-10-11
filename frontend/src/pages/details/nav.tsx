import { name } from 'helpers/person';
import { Api } from 'types';

import React, { FC } from 'react';

import LifeDates from 'atoms/life-dates';

import DeleteModal from 'organisms/modal-delete';

import EditModal from 'pages/dashboard/edit-modal';

import { Group, Image, Navbar, Text } from '@mantine/core';

import placeholderFemale from '../../organisms/card/placeholder-female.png';
import placeholderMale from '../../organisms/card/placeholder-male.png';

const Nav: FC<{ data: Api.DetailsResponse; onUpdate: () => void }> = ({ data, onUpdate }) => (
  <Navbar width={{ base: 300 }} p="xs">
    <Navbar.Section>
      <Image
        src={data.person.gender === 'female' ? placeholderFemale : placeholderMale}
        height={160}
        alt="Placeholder photo"
        fit="contain"
      />
      <Group mt="md" mb="xs" position="apart">
        <Text weight={500}>{name(data.person)}</Text>
        <Group>
          <EditModal data={data.person} onComplete={onUpdate} />
          <DeleteModal data={data.person} onComplete={onUpdate} />
        </Group>
      </Group>
    </Navbar.Section>
    <Navbar.Section grow mt="md">
      <LifeDates person={data.person} />
      {data.father && <Text size="sm">Father: {name(data.father)}</Text>}
      {data.mother && <Text size="sm">Mother: {name(data.mother)}</Text>}
    </Navbar.Section>
    <Navbar.Section>footer</Navbar.Section>
  </Navbar>
);

export default Nav;
