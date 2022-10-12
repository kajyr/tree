import { BasePerson, deceased } from 'common';
import { lifeDates } from 'helpers/dates';

import React, { FC } from 'react';

import { Text } from '@mantine/core';

const LifeDates: FC<{ person: BasePerson }> = ({ person }) => {
  const death = deceased(person);
  return (
    <Text size="sm" color="dimmed">
      {lifeDates(person.birth?.date, death?.date)}
    </Text>
  );
};

export default LifeDates;
