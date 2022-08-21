import { lifeDates } from 'helpers/dates';
import { BasePerson } from 'types';

import React, { FC } from 'react';

import { Text } from '@mantine/core';

const LifeDates: FC<{ person: BasePerson }> = ({ person }) => {
  return (
    <Text size="sm" color="dimmed">
      {lifeDates(person.birth?.date, person.death?.date)}
    </Text>
  );
};

export default LifeDates;
