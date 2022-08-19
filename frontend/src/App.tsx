import { Api } from 'types';

import React, { FC } from 'react';
import { useQuery } from 'react-query';

import Loader from 'atoms/Loader';

import Page from 'templates/Page';

import Dashboard from 'pages/dashboard';

const App: FC = () => {
  const { isLoading, data, refetch } = useQuery<Api.PersonsListResponse>('bootstrap', () =>
    fetch('/api/persons').then(res => res.json())
  );

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <>
      <Page>
        <Dashboard data={data} update={refetch} />
      </Page>
    </>
  );
};

export default App;
