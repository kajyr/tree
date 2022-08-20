import React, { FC } from 'react';

import { Badge, Button, Divider, Group, Navbar, TextInput } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons';

const Nav: FC = () => (
  <Navbar width={{ base: 300 }} p="xs">
    <Navbar.Section>
      <TextInput placeholder="Search" label="Focus on" size="xs" />
    </Navbar.Section>
    <Navbar.Section grow mt="md">
      list of names
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

export default Nav;
