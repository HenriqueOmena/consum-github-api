import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

import GlobalaStyle from './styles/global';

const App: FC = () => (
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobalaStyle />
  </>
);

export default App;
