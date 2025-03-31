import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './utils/store';
import Body from './components/Body';
import Head from './components/Head';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Head />
        <Routes>
          <Route path="/" element={<Body />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
