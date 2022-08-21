import { g2c, initials } from 'helpers/person';
import { Person } from 'types';

import React, { FC } from 'react';

import { Avatar } from '@mantine/core';

const Initials: FC<{ person: Person }> = ({ person }) => {
  return (
    <Avatar size={40} color={g2c(person.gender)}>
      {initials(person)}
    </Avatar>
  );
};

export default Initials;
