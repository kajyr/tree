import { Person } from 'types';

import React, { FC } from 'react';

import { RingProgress, Text } from '@mantine/core';

const Alive: FC<{ list: Person[] }> = ({ list }) => {
  const tot = list.length;
  const alive = list.filter(p => !p.deceased).length;

  const pA = (alive / tot) * 100;

  return (
    <RingProgress
      label={
        <Text size="xs" align="center">
          In vita
        </Text>
      }
      sections={[{ color: 'lime', value: pA }]}
    />
  );
};

export default Alive;
