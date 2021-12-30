import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SchoolCampaign from './Campaigns/School/SchoolCampaign';
import ToysCampaign from './Campaigns/Toys/ToysCampaign';
import FormContact from './Components/Contact/FormContact';
import Seccion_Novedades from './Components/News/Seccion_Novedades';
import Activities from './Components/Activities/Activities';
import Contact from './Components/Contact/Contact';
import NewsDetail from './Components/News/Detail/NewsDetail';
import ActivityDetail from './Components/Activities/Detail/ActivityDetail';
import About from './Components/About/About';
import Donations from './Components/Donations/Donations';
import Thanks from './Components/Donations/Thanks';
import Error404 from './Components/Error404/Error404';
import HomeScreen from './Components/Home';
import Footer from './Components/Footer/Footer';

import BackofficeRouter from './Router/BackofficeRouter';
import PublicRouter from './Router/PublicRouter';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route component={BackofficeRouter} path="/backoffice" />
          {/* <Route path="/" component={PublicRouter} /> */}

          <Route exact component={HomeScreen} path="/" />

          <Route component={FormContact} path="/form-contact" />

          <Route component={Activities} path="/Actividades" />

          <Route component={Seccion_Novedades} path="/Novedades" />

          <Route component={SchoolCampaign} path="/school-campaign" />
          <Route component={ToysCampaign} path="/toys-campaign" />

          <Route component={Contact} path="/contact" />

          <Route
            path="/news/:id"
            render={() => <NewsDetail newsTitle="Titulo de la noticia" />}
          />
          <Route component={About} path="/AboutUs" />
          <Route component={ActivityDetail} path="/activities/:id" />
          <Route
            path="/donations"
            render={() => (
              <Donations
                donationsSubtitle="¡Ayúdanos a crecer!"
                donationsTitle="Donaciones"
              />
            )}
          />
          <Route component={Thanks} path="/thanks" />
          <Route component={Error404} path="*" />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
