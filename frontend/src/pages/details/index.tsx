import { callApi, usePersons } from 'helpers/api';
import { Api } from 'types';

import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import Loader from 'atoms/Loader';

import Page from 'templates/Page';

import Nav from './nav';

const Details: FC = () => {
  const { id } = useParams();
  const { isLoading, data, refetch } = useQuery<Api.DetailsResponse>(['details', id], () =>
    callApi(`/api/person/${id}`).then(res => res.json())
  );

  if (isLoading || !data) {
    return <Loader />;
  }

  return <Page navbar={<Nav data={data} onUpdate={refetch} />}>dataaa</Page>;
};

export default Details;
