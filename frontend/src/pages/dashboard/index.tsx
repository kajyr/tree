import { Api } from 'types';

import React, { FC } from 'react';

import { Button, Divider, Group } from '@mantine/core';

const Dashboard: FC<{ data: Api.BootstrapResponse }> = ({ data }) => {
  return (
    <>
      <Group position="right">
        <Button variant="outline">add new person</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
      </Group>
      <Divider my="xs" label="Persons in the DB" />
      <pre>
        <code>{JSON.stringify(data, undefined, 2)}</code>
      </pre>
    </>
  );
};

export default Dashboard;
