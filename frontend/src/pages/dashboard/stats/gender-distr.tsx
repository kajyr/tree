import { Person } from 'types';

import React, { FC } from 'react';

import { RingProgress, Text } from '@mantine/core';

const GenderDistr: FC<{ list: Person[] }> = ({ list }) => {
  const tot = list.length;
  const males = list.filter(p => p.gender === 'male').length;
  const females = list.filter(p => p.gender === 'female').length;

  const pM = (males / tot) * 100;
  const pF = (females / tot) * 100;

  return (
    <RingProgress
      label={
        <Text size="xs" align="center">
          Gender
        </Text>
      }
      sections={[
        { color: 'blue', value: pM },
        { color: 'pink', value: pF }
      ]}
    />
  );
};

export default GenderDistr;
