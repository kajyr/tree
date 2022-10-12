import { name } from 'common';
import { PersonFromMongo } from 'types';

import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import Initials from 'atoms/initials';

import { Badge, Button, Divider, Group, Navbar, Text, TextInput, UnstyledButton } from '@mantine/core';
import { ScrollArea } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons';

const Nav: FC<{ list: PersonFromMongo[] }> = ({ list }) => {
  const [search, setSearch] = useState('');

  return (
    <Navbar width={{ base: 300 }} p="xs">
      <Navbar.Section>
        <TextInput
          placeholder="Search"
          label="Focus on"
          size="xs"
          value={search}
          onChange={e => setSearch(e.currentTarget.value)}
        />
      </Navbar.Section>
      <Navbar.Section grow mt="md" component={ScrollArea}>
        {list
          .filter(p => p.name?.toLowerCase().includes(search) || p.surname?.toLowerCase().includes(search))
          .map(p => (
            <UnstyledButton key={p._id} component={Link} to={`/p/${p._id}`}>
              <Group mb="xs">
                <Initials person={p} />
                <Text>{name(p)}</Text>
              </Group>
            </UnstyledButton>
          ))}
      </Navbar.Section>
      <Navbar.Section>
        <Group position="left">
          <Badge>v{__VERSION__}</Badge>
          <Divider orientation="vertical" mx="sm" />
          <Button
            component="a"
            href="https://github.com/kajyr/tree"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            leftIcon={<IconBrandGithub />}
            styles={{
              leftIcon: {
                marginRight: 15
              }
            }}>
            Source Code
          </Button>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
};

export default Nav;
