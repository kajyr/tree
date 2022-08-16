import { Api } from 'types';

import React, { FC } from 'react';
import { useQuery } from 'react-query';

import Loader from 'atoms/Loader';

import Page from 'templates/Page';

import Dashboard from 'pages/dashboard';

const App: FC = () => {
  const { isLoading, data } = useQuery<Api.BootstrapResponse>('bootstrap', () =>
    fetch('/api/bootstrap').then(res => res.json())
  );

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <>
      <Page>
        <Dashboard data={data} />
      </Page>
    </>
  );
};

export default App;
