import { usePersons } from 'helpers/api';

import React, { FC } from 'react';

import SelectPerson from 'atoms/select-person';

import { Button, Group, Radio, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { Person, PersonFromMongo } from '../../types';

const PersonForm: FC<{ data: Person | PersonFromMongo; onChange: (p: Person) => void }> = ({ data, onChange }) => {
  // Note that position: relative is required
  const { data: d } = usePersons();
  const persons = d?.persons;

  const initialValues: Required<Person> = { father: null, gender: null, mother: null, name: '', surname: '', ...data };

  const form = useForm({
    initialValues
  });

  return (
    <form onSubmit={form.onSubmit(values => onChange(values))}>
      <TextInput required label="Name" {...form.getInputProps('name')} />
      <TextInput required label="Surname" {...form.getInputProps('surname')} />
      <Radio.Group label="Gender" {...form.getInputProps('gender')}>
        <Radio value="male" label="Male" />
        <Radio value="female" label="Female" />
      </Radio.Group>
      <SelectPerson
        label="Father"
        id={(data as PersonFromMongo)._id}
        list={persons || []}
        filter={p => p.gender !== 'female'}
        {...form.getInputProps('father')}
      />
      <SelectPerson
        label="Mother"
        id={(data as PersonFromMongo)._id}
        list={persons || []}
        filter={p => p.gender !== 'male'}
        {...form.getInputProps('mother')}
      />
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
