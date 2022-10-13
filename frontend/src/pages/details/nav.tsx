import { Events, name } from 'common';
import { date } from 'helpers/dates';
import { Api } from 'types';

import React, { FC } from 'react';

import LifeDates from 'atoms/life-dates';

import DeleteModal from 'organisms/modal-delete';

import EditModal from 'pages/dashboard/edit-modal';

import { Group, Image, Navbar, Text, Timeline } from '@mantine/core';

import placeholderFemale from '../../organisms/card/placeholder-female.png';
import placeholderMale from '../../organisms/card/placeholder-male.png';

const labelMap: Record<string, string> = {
  birth: 'Birth',
  child: 'Child',
  death: 'Death'
};

const Nav: FC<{ data: Api.DetailsResponse; onUpdate: () => void }> = ({ data, onUpdate }) => {
  //@ts-ignore
  const events: Events[] = [{ type: 'birth', ...data.person.birth }]
    .concat((data.person.events as Events[]) || [])
    .sort((a, b) => {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      if (!b.date) {
        return 1;
      }
      if (!a.date) {
        return -1;
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  return (
    <Navbar width={{ base: 300 }} p="xs">
      <Navbar.Section>
        <Image
          src={data.person.gender === 'female' ? placeholderFemale : placeholderMale}
          height={160}
          alt="Placeholder photo"
          fit="contain"
        />
        <Group mt="md" mb="xs" position="apart">
          <Text weight={500}>{name(data.person)}</Text>
          <Group>
            <EditModal data={data.person} onComplete={onUpdate} />
            <DeleteModal data={data.person} onComplete={onUpdate} />
          </Group>
        </Group>
      </Navbar.Section>
      <Navbar.Section mt="md">
        <LifeDates person={data.person} />
        {data.father && <Text size="sm">Father: {name(data.father)}</Text>}
        {data.mother && <Text size="sm">Mother: {name(data.mother)}</Text>}
      </Navbar.Section>
      <Navbar.Section grow mt="md">
        <Timeline bulletSize={18} lineWidth={2}>
          {events.map((event, i) => {
            const title = labelMap[event.type] || 'Unknown';
            return (
              <Timeline.Item title={title} key={`${title}-${i}`}>
                {'fullName' in event && event.fullName && (
                  <Text size="xs" color="dimmed">
                    {event.fullName}
                  </Text>
                )}
                {event.date && (
                  <Text size="xs" color="dimmed">
                    {date(event.date)}
                  </Text>
                )}
                {event.place && <Text mt={4}>{event.place}</Text>}
              </Timeline.Item>
            );
          })}

          {/*      <Timeline.Item title="Code review">
            <Text color="dimmed" size="sm">
              <Text variant="link" component="span" inherit>
               esempio per matrimonio
              </Text>{' '}
              left a code review on your pull request
            </Text>
            <Text size="xs" mt={4}>
              12 minutes ago
            </Text>
          </Timeline.Item>*/}
        </Timeline>
      </Navbar.Section>
      <Navbar.Section>footer</Navbar.Section>
    </Navbar>
  );
};

export default Nav;
