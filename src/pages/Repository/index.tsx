import React from 'react';
import { useRouteMatch } from 'react-router-dom';

interface Repository {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<Repository>();

  return (
    <div>
      Repository:
      {params.repository}
    </div>
  );
};

export default Repository;
