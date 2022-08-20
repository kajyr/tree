import React, { FC, ReactElement, ReactNode } from 'react';

import { AppShell, Header, Title } from '@mantine/core';

const Page: FC<{ children: ReactNode; navbar: ReactElement }> = ({ children, navbar }) => (
  <>
    <AppShell
      padding="md"
      navbar={navbar}
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
