import { Switch, Route, useRouteMatch } from 'react-router-dom';
import SchoolCampaign from '../Campaigns/School/SchoolCampaign';
import ToysCampaign from '../Campaigns/Toys/ToysCampaign';
import FormContact from '../Components/Contact/FormContact';
import Seccion_Novedades from '../Components/News/Seccion_Novedades';
import Activities from '../Components/Activities/Activities';
import Contact from '../Components/Contact/Contact';
import NewsDetail from '../Components/News/Detail/NewsDetail';
import ActivityDetail from '../Components/Activities/Detail/ActivityDetail';
import About from '../Components/About/About';
import Donations from '../Components/Donations/Donations';
import Thanks from '../Components/Donations/Thanks';
import Error404 from '../Components/Error404/Error404';
import HomeScreen from '../Components/Home';

const PublicRouter = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact component={HomeScreen} path={`${path}`} />
      <Route component={FormContact} path={`${path}form-contact`} />
      <Route component={Activities} path={`${path}actividades`} />
      <Route component={Seccion_Novedades} path={`${path}novedades`} />
      <Route component={SchoolCampaign} path={`${path}school-campaign`} />
      <Route component={ToysCampaign} path={`${path}toys-campaign`} />
      <Route component={Contact} path={`${path}contact`} />
      <Route
        path={`${path}news/:id`}
        render={() => <NewsDetail newsTitle="Titulo de la noticia" />}
      />
      <Route component={About} path={`${path}aboutus`} />
      <Route component={ActivityDetail} path={`${path}activities/:id`} />
      <Route
        path={`${path}donations`}
        render={() => (
          <Donations
            donationsSubtitle="¡Ayúdanos a crecer!"
            donationsTitle="Donaciones"
          />
        )}
      />
      <Route component={Thanks} path={`${path}thanks`} />
      <Route component={Error404} path="*" />
    </Switch>
  );
};

export default PublicRouter;
