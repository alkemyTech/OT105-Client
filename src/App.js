import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import LoginForm from './Components/Auth/LoginForm/LoginForm';
import BackofficeRouter from './Router/BackofficeRouter';
import PublicRouter from './Router/PublicRouter';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route component={BackofficeRouter} path="/backoffice" />
          <Route component={LoginForm} path="/login" />
          <Route component={PublicRouter} path="/" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
