import { usePersons } from 'helpers/api';
import { merge } from 'merge-anything';

import React, { FC } from 'react';

import SelectPerson from 'atoms/select-person';

import { ActionIcon, Button, Checkbox, Group, Menu, Radio, Space, TextInput, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconBabyCarriage, IconCertificate, IconConfetti, IconSquarePlus } from '@tabler/icons';

import { Person, PersonFromMongo } from '../../types';

function fixDates(values: Required<Person>): Required<Person> {
  const fixed = { ...values };

  if (fixed.birth.date) {
    fixed.birth = { ...fixed.birth, date: new Date(fixed.birth.date) };
  }
  if (fixed.death.date) {
    fixed.death = { ...fixed.birth, date: new Date(fixed.death.date) };
  }

  return fixed;
}

const PersonForm: FC<{ data: Person | PersonFromMongo; onChange: (p: Person) => void }> = ({ data, onChange }) => {
  // Note that position: relative is required
  const { data: d } = usePersons();
  const persons = d?.persons;

  const initialValues: Required<Person> = fixDates(
    merge(
      {
        birth: { date: '', place: '' },
        death: { date: '', place: '' },
        deceased: false,
        father: null,
        gender: null,
        mother: null,
        name: '',
        surname: ''
      },
      data
    )
  );

  console.log(initialValues);
  const form = useForm({
    initialValues
  });

  return (
    <form onSubmit={form.onSubmit(values => onChange(values))}>
      <Group mb="xs">
        <TextInput label="Name" {...form.getInputProps('name')} />
        <TextInput label="Surname" {...form.getInputProps('surname')} />
      </Group>
      <Radio.Group label="Gender" {...form.getInputProps('gender')} mb="xs">
        <Radio value="male" label="Male" />
        <Radio value="female" label="Female" />
      </Radio.Group>
      <Group mb="xs">
        <DatePicker label="Date of birth" clearable {...form.getInputProps('birth.date')} />
        <TextInput label="Place of birth" {...form.getInputProps('birth.place')} />
      </Group>
      <Checkbox label="Deceased" {...form.getInputProps('deceased')} mb="xs" checked={form.values.deceased} />
      {form.values.deceased && (
        <Group mb="xs">
          <DatePicker label="Date of death" clearable {...form.getInputProps('death.date')} />
          <TextInput label="Place of death" {...form.getInputProps('death.place')} />
        </Group>
      )}
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
      <Space h="md" />
      <Group position="apart">
        <Title order={3}>Events</Title>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon
              color="blue"
              size="sm"
              onClick={() => {
                console.log('add');
              }}>
              <IconSquarePlus />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Add a life event</Menu.Label>
            <Menu.Item icon={<IconBabyCarriage size={14} />}>Child</Menu.Item>
            <Menu.Item icon={<IconConfetti size={14} />}>Wedding</Menu.Item>
            <Menu.Item icon={<IconCertificate size={14} />}>Death</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
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
