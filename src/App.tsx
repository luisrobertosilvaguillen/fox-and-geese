import React from 'react';
import Layout from './hoc/Layout/Layout';

import './App.scss';

import GameRoom from '../src/components/GameRoom/GameRoom';

function App() {
  return (
    <div>
      <Layout>
        <GameRoom />
      </Layout>
    </div>
  );
}

export default App;
