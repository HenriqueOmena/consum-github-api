import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories } from './styles';

import logoImg from '../../assets/githublogo.svg';

const Repository: React.FC = () => (
  <Repositories>
    <a href="teste">
      <img
        src="https://avatars3.githubusercontent.com/u/35804326?s=460&u=458d2ff5326896d4dc02d2ffdbd76cdca025a248&v=4"
        alt="Henrique Omena"
      />
      <div>
        <strong>title rep</strong>
        <p> descript goes here</p>
      </div>

      <FiChevronRight size={20} />
    </a>
  </Repositories>
);

const Dashboard: React.FC = () => (
  <>
    <img src={logoImg} alt="logo consume github api" />
    <Title>Dashboard</Title>

    <Form>
      <input placeholder="Digite o nome do repositorio" />
      <button type="submit"> Pesquisar </button>
    </Form>
    <Repository />
    <Repository />
    <Repository />
  </>
);
export default Dashboard;
