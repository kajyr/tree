import { Events, deceased } from 'common';
import { usePersons } from 'helpers/api';
import { merge } from 'merge-anything';

import React, { FC } from 'react';

import SelectPerson from 'atoms/select-person';

import { ActionIcon, Button, Group, Menu, Radio, Space, TextInput, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconBabyCarriage, IconCertificate, IconConfetti, IconSquarePlus, IconX } from '@tabler/icons';

import { Person, PersonWithoutId } from '../../types';

function fixDates(values: Required<PersonWithoutId>): Required<PersonWithoutId> {
  const fixed = { ...values };

  if (fixed.birth.date) {
    fixed.birth = { ...fixed.birth, date: new Date(fixed.birth.date) };
  }

  fixed.events = fixed.events.map((e: Events) => ({
    ...e,
    date: typeof e.date === 'string' ? new Date(e.date) : e.date
  }));

  return fixed;
}

const PersonForm: FC<{ data: PersonWithoutId; onChange: (p: PersonWithoutId) => void }> = ({ data, onChange }) => {
  // Note that position: relative is required
  const { data: d } = usePersons();
  const persons = d?.persons;

  const initialValues: Required<PersonWithoutId> = fixDates(
    merge(
      {
        birth: { date: '', place: '' },
        events: [],
        father: null,
        gender: null,
        mother: null,
        name: '',
        surname: ''
      },
      data
    )
  );

  const form = useForm({
    initialValues
  });

  console.log(form.values);

  const canAddDeath = !deceased(form.values);

  return (
    <form
      onSubmit={form.onSubmit(values => {
        onChange(values);
      })}>
      <Group mb="xs" position="apart" grow>
        <TextInput label="Name" {...form.getInputProps('name')} />
        <TextInput label="Surname" {...form.getInputProps('surname')} />
      </Group>
      <Radio.Group label="Gender" {...form.getInputProps('gender')} mb="xs">
        <Radio value="male" label="Male" />
        <Radio value="female" label="Female" />
      </Radio.Group>
      <Group mb="xs" position="apart" grow>
        <DatePicker label="Date of birth" clearable {...form.getInputProps('birth.date')} />
        <TextInput label="Place of birth" {...form.getInputProps('birth.place')} />
      </Group>
      <SelectPerson
        label="Father"
        id={(data as Person)._id}
        list={persons || []}
        filter={p => p.gender !== 'female'}
        {...form.getInputProps('father')}
      />
      <SelectPerson
        label="Mother"
        id={(data as Person)._id}
        list={persons || []}
        filter={p => p.gender !== 'male'}
        {...form.getInputProps('mother')}
      />
      <Space h="md" />
      <Group position="apart">
        <Title order={3}>Events</Title>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon color="blue" size="sm">
              <IconSquarePlus />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Add a life event</Menu.Label>
            <Menu.Item
              icon={<IconBabyCarriage size={14} />}
              onClick={() => {
                form.insertListItem('events', { type: 'child' });
              }}>
              Child
            </Menu.Item>
            <Menu.Item
              icon={<IconConfetti size={14} />}
              onClick={() => {
                form.insertListItem('events', { type: 'wedding' });
              }}>
              Wedding
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                form.insertListItem('events', { type: 'death' });
              }}
              disabled={!canAddDeath}
              icon={<IconCertificate size={14} />}>
              Death
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      {form.values.events.map((event, index) => {
        const key = `${event.type}-${index}`;
        let eventJsx, title;

        if (event.type === 'death') {
          title = 'Death';
          eventJsx = (
            <Group position="apart" grow>
              <DatePicker label="Date of death" clearable {...form.getInputProps(`events.${index}.date`)} />
              <TextInput label="Place of death" {...form.getInputProps(`events.${index}.place`)} />
            </Group>
          );
        } else if (event.type === 'child') {
          title = 'Child';
          eventJsx = (
            <>
              <SelectPerson
                label="Name"
                list={persons || []}
                filter={() => {
                  // remove father, mother, spouses
                  // remove anyone older
                  return true;
                }}
                {...form.getInputProps(`events.${index}.child`)}
              />
            </>
          );
        } else {
          eventJsx = (
            <pre>
              <code>{JSON.stringify(event, undefined, 2)}</code>
            </pre>
          );
        }

        return (
          <div key={key}>
            <Group mb="xs" position="apart">
              <Title order={4}>{title}</Title>
              <ActionIcon onClick={() => form.removeListItem('events', index)}>
                <IconX size={18} />
              </ActionIcon>
            </Group>
            {eventJsx}
          </div>
        );
      })}
      <Group position="right" mt="md">
        <Button type="submit">Save</Button>
      </Group>
    </form>
  );
};

export default PersonForm;
