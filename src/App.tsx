import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from '@emotion/styled';

import { useEffect, useState } from 'react';
import { PageLayout } from '@components/templates/PageLayout';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 2200px;
  width: 100vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-width: 1200px;
  width: 100%;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  background-color: #f0f0f0;
`;

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/test/api/hello/')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <AppContainer>
      <PageLayout>
        <Body>{message}</Body>
      </PageLayout>
    </AppContainer>
  );
}

export default App;
