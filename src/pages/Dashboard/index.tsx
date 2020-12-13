/* eslint-disable camelcase */
import React, { FormEvent, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Title, Form, Repositories, Error } from './styles';
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
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const handleAddRepository = async (
    event: FormEvent<HTMLFormElement>,
    // eslint-disable-next-line consistent-return
  ): Promise<void> => {
    event.preventDefault();

    const newRepoIsEmpty = !newRepo;

    if (newRepoIsEmpty)
      return setInputError('Digiter o autor/nome do Repositorio');

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (error) {
      setInputError('Repositorio não existe');
    }
  };

  return (
    <>
      <img src={logoImg} alt="logo consume github api" />
      <Title>Dashboard</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          placeholder="Digite o nome do repositorio"
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit"> Pesquisar </button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <Link
            to={`/repository/${repository.full_name}`}
            key={repository.full_name}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};
export default Dashboard;
