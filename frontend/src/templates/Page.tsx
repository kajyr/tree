import React, { FC, ReactNode } from 'react';

import { AppShell, Badge, Button, Divider, Group, Header, Navbar, TextInput, Title } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons';

const Page: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <AppShell
      padding="md"
      navbar={
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
      }
      header={
        <Header height={60} p="xs">
          <Title order={1}>Tree</Title>
        </Header>
      }
      styles={theme => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] }
      })}>
      {children}
    </AppShell>
  </>
);

export default Page;
