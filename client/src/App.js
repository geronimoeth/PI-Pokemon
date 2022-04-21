import './App.css';
import React from 'react';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import PokemonCreate from './components/PokemonCreate';
import Details from './components/Details';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/home' component={Home} />
          <Route path='/createPokemon' component={PokemonCreate}/>
          <Route path='/home/:id' component={Details} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
