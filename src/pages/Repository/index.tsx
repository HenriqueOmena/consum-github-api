import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronsLeft, FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/githublogo.svg';
import { Header, Issues, RepositoryInfo } from './style';

interface Repository {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<Repository>();

  return (
    <div>
      <Header>
        <img src={logoImg} alt="logo consume github api" />
        <Link to="/dashboard">
          <FiChevronsLeft size={16} />
          Voltar
        </Link>
      </Header>

      <RepositoryInfo>
        <header>
          <img
            src="https://avatars3.githubusercontent.com/u/35804326?s=460&u=458d2ff5326896d4dc02d2ffdbd76cdca025a248&v=4"
            alt="Henrique OMena"
          />
          <div>
            <strong>Henrique Omena</strong>
            <p>desc of rep</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>001</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>001</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>001</strong>
            <span>Issues Abertas</span>
          </li>
        </ul>
      </RepositoryInfo>

      <Issues>
        <Link to="asddsa">
          <div>
            <strong>asdasd</strong>
            <p>xzcxczxczxc</p>
          </div>

          <FiChevronRight size={20} />
        </Link>
      </Issues>
      <Issues>
        <Link to="asddsa">
          <div>
            <strong>asdasd</strong>
            <p>xzcxczxczxc</p>
          </div>

          <FiChevronRight size={20} />
        </Link>
      </Issues>
    </div>
  );
};

export default Repository;
