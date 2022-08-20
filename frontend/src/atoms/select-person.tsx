import { name } from 'helpers/person';
import { PersonFromMongo } from 'types';

import React, { FC } from 'react';

import { Select } from '@mantine/core';

const SelectPerson: FC<{
  id: string | undefined;
  label: string;
  list: PersonFromMongo[];
  filter?: (p: PersonFromMongo) => boolean;
}> = ({ label, id, list, filter, ...other }) => {
  let availables = list.filter(p => p._id !== id);

  if (filter) {
    availables = availables.filter(filter);
  }

  return (
    <Select
      label={label}
      placeholder="Select a person"
      data={availables.map(p => ({ label: name(p), value: p._id }))}
      {...other}
    />
  );
};

export default SelectPerson;
