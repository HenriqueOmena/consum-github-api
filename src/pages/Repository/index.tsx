/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronsLeft, FiChevronRight } from 'react-icons/fi';
import { TablePagination } from '@material-ui/core';
import logoImg from '../../assets/githublogo.svg';
import { Header, Issues, RepositoryInfo } from './style';
import api from '../../services/api';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const handleChangePage = (
    _event: unknown,
    newPage: React.SetStateAction<number>,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

    const getData = async () => {
      const [rep, iss] = await Promise.all([
        api.get(`repos/${params.repository}`),
        api.get(
          `repos/${params.repository}/issues?per_page=${rowsPerPage}&page=${page}`,
        ),
      ]);
      setRepository(rep.data);
      setIssues(iss.data);
    };
    getData();
  }, [params.repository, rowsPerPage, page]);

  return (
    <div>
      <Header>
        <Link to="/">
          <img src={logoImg} alt="logo consume github api" />
        </Link>
        <Link to="/">
          <FiChevronsLeft size={16} />
          Voltar
        </Link>
      </Header>
      {repository && (
        <RepositoryInfo>
          <header>
            <img src={repository.owner.avatar_url} alt={repository.full_name} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues Abertas</span>
            </li>
          </ul>
          <TablePagination
            component="div"
            count={repository.open_issues_count}
            page={page}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage="Results per Page"
            onChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPageOptions={[2, 5, 10, 20, 50, 100]}
            style={{
              display: 'flex',
              alignItems: 'left',
              paddingLeft: 0,
            }}
          />
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map((issue) => (
          <a href={issue.html_url} key={issue.id} target="blank">
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </div>
  );
};

export default Repository;
