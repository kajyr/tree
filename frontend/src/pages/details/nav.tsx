import { fp2p, name } from 'helpers/person';
import { FullPerson } from 'types';

import React, { FC } from 'react';

import DeleteModal from 'organisms/modal-delete';

import EditModal from 'pages/dashboard/edit-modal';

import { Group, Image, Navbar, Text } from '@mantine/core';

import placeholderFemale from '../../organisms/card/placeholder-female.png';
import placeholderMale from '../../organisms/card/placeholder-male.png';

const Nav: FC<{ data: FullPerson; onUpdate: () => void }> = ({ data, onUpdate }) => (
  <Navbar width={{ base: 300 }} p="xs">
    <Navbar.Section>
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
    </Navbar.Section>
    <Navbar.Section grow mt="md">
      {data.father && <Text size="sm">Father: {name(data.father)}</Text>}
      {data.mother && <Text size="sm">Mother: {name(data.mother)}</Text>}
    </Navbar.Section>
    <Navbar.Section>footer</Navbar.Section>
  </Navbar>
);

export default Nav;
