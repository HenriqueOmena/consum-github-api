/* eslint-disable camelcase */
import React, { FormEvent, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories } from './styles';
import api from '../../services/api';

import logoImg from '../../assets/githublogo.svg';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const handleAddRepository = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const response = await api.get<Repository>(`repos/${newRepo}`);

    const repository = response.data;

    setRepositories([...repositories, repository]);
    console.log(response.data);
  };

  return (
    <>
      <img src={logoImg} alt="logo consume github api" />
      <Title>Dashboard</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          placeholder="Digite o nome do repositorio"
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit"> Pesquisar </button>
      </Form>
      <Repositories>
        {repositories.map((repository) => (
          <a href="teste" key={repository.full_name}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};
export default Dashboard;
