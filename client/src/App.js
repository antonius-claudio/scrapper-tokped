import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ByStore from './pages/ByStore';
import Shopee from './pages/Shopee';

const routes = [
  {
    exact: true,
    path: '/',
    component: Home
  },
  {
    exact: true,
    path: '/shopee',
    component: Shopee
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
