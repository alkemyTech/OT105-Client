import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Footer from './Components/Footer/Footer';

import BackofficeRouter from './Router/BackofficeRouter';
import PublicRouter from './Router/PublicRouter';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route component={BackofficeRouter} path="/backoffice" />
          <Route component={PublicRouter} path="/" />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
