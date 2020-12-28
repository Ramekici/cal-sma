import React from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Users from './components/Users';
import Edit from './components/CreateEdit';
import './App.css';

function App() {

  let routes =
        (<Switch>
          <Route path='/create' component={Edit}/>
          <Route path='/edit/:id' component={Edit}/>
          <Route path='/users' component={Users}/>
          <Route path='/' component={Home}/>
          <Redirect to='/'/>
        </Switch>) ;

  return (
    <BrowserRouter>
      <Layout>
        {routes}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
