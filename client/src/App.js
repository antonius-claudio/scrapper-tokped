import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ByStore from './pages/ByStore';

const routes = [
  {
    exact: true,
    path: '/',
    component: Home
  },
  {
    path: '/store',
    component: ByStore
  }
];

const AppRouter = () => (
  <Switch>
    {
      routes.map(route => (
        <Route key={route} {...route} />
      ))
    }
  </Switch>
)

function App() {
  return (
    <Router>
      <div className='MainContainer'>
        <AppRouter />
      </div>
    </Router>
  );
}

export default App;
