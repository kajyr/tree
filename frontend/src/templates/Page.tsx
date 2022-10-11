import React, { FC, ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { AppShell, Header, Text, Title } from '@mantine/core';

const Page: FC<{ children: ReactNode; navbar: ReactElement }> = ({ children, navbar }) => (
  <>
    <AppShell
      padding="md"
      navbar={navbar}
      header={
        <Header height={60} p="xs">
          <Title order={1}>
            <Text component={Link} to="/">
              Tree
            </Text>
          </Title>
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
