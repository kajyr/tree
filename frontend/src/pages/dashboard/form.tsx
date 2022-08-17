import React, { FC } from 'react';

import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { Person } from '../../types';

const PersonForm: FC<{ data: Person; onChange: (p: Person) => void }> = ({ data, onChange }) => {
  // Note that position: relative is required

  const initialValues: Required<Person> = { name: '', surname: '', ...data };

  const form = useForm({
    initialValues
  });

  return (
    <form onSubmit={form.onSubmit(values => onChange(values))}>
      <TextInput required label="Name" {...form.getInputProps('name')} />
      <TextInput required label="Surname" {...form.getInputProps('surname')} />
      <Group position="right" mt="md">
        <Button
          type="submit"
          onClick={() => {
            console.log('save');
          }}>
          Save
        </Button>
      </Group>
    </form>
  );
};

export default PersonForm;
