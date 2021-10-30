import './App.css';
import React from 'react';
import StartPage from './components/StartPage';
import Battle from './components/Battle';
import { Link, Switch, Route } from 'react-router-dom';
import Gallery from './components/Gallery';
import Statistics from './components/Statistics';


function App() {




  return (
    <div className="app">
      <header>
        <h1>Välkommen till Hamster Wars</h1>
        <nav>
          
          <Link to="/"> Start </Link>
          <Link to="/battle"> Tävla</Link>
          <Link to="/gallery"> Galleri </Link>
          <Link to="/stats"> Statistik </Link>
          <Link to="/history"> Historik </Link>
          {/* <Link to="/error"> Felaktig länk </Link></nav> */}
          
        </nav>
      </header>
      <main>
       
        <Switch>
          <Route path="/" exact> <StartPage /> </Route>
          <Route path="/battle" exact> <Battle /> </Route>
          <Route path="/gallery"> <Gallery /></Route>
          <Route path="/stats"> <Statistics/></Route>
{/*           <Route path="/results" render={(OverlayProps) => <ResultsOverlay winnerId={''} loserId={''} {...OverlayProps} />}/> 
 */}        </Switch>
        
        
      </main>
    </div>
  );
}

export default App;

