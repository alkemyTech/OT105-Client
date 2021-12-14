import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ActivitiesForm from './Components/Activities/ActivitiesForm';
import CategoriesForm from './Components/Categories/CategoriesForm';
import NewsForm from './Components/News/NewsForm';
import SlidesForm from './Components/Slides/SlidesForm';
import TestimonialForm from './Components/Testimonials/TestimonialsForm';
import UserForm from './Components/Users/UsersForm';
import UsersListTable from './Components/Users/UsersListTable';
import SchoolCampaign from './Campaigns/School/SchoolCampaign';
import ToysCampaign from './Campaigns/Toys/ToysCampaign';
import MembersForm from './Components/Members/MembersForm';
import ProjectsForm from './Components/Projects/ProjectsForm';
import FormContact from './Components/Contact/FormContact';
import ScreenMembersList from './Components/Members/ScreenMembersList';
import EditHomeForm from './Components/Home/EditHomeForm';
import Seccion_Novedades from './Components/News/Seccion_Novedades';
import Activities from './Components/Activities/Activities';
import Contact from './Components/Contact/Contact';
import BackofficeDashboard from './Components/Backoffice/BackofficeDashboard';
import NewsDetail from './Components/News/Detail/NewsDetail';
import SlidesBackOffice from './Components/Slides/SlidesBackOffice';

import About from './Components/About/About';
function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* <Route path="/" exact component={} />           Esta ruta debe ser para el Home */}
          <Route component={ActivitiesForm} path="/create-activity" />
          <Route component={FormContact} path="/form-contact" />
          <Route path="/create-category" render={() => <CategoriesForm />} />
          <Route component={Activities} path="/Actividades" />
          <Route component={NewsForm} path="/create-news" />
          <Route component={Seccion_Novedades} path="/Novedades" />
          <Route
            exact
            component={SlidesForm}
            path="/backoffice/slides/create"
          />
          <Route
            exact
            component={SlidesForm}
            path="/backoffice/slides/edit/:id"
          />

          <Route
            path="/create-testimonials"
            render={() => <TestimonialForm id={25} />}
          />
          <Route component={UsersListTable} path="/backoffice/users" />
          <Route
            path="/create-testimonials"
            render={() => <TestimonialForm id={25} />}
          />
          <Route component={SlidesBackOffice} path="/backoffice/Slides" />
          <Route component={TestimonialForm} path="/create-testimonials" />
          <Route component={UserForm} path="/create-user" />
          <Route component={MembersForm} path="/create-member" />
          <Route component={ProjectsForm} path="/create-project" />
          <Route component={SchoolCampaign} path="/school-campaign" />
          <Route component={ToysCampaign} path="/toys-campaign" />
          <Route
            exact
            component={ScreenMembersList}
            path="/backoffice/members"
          />
          <Route component={EditHomeForm} path="/backoffice/home" />
          <Route component={Contact} path="/contact" />
          <Route component={BackofficeDashboard} path="/backoffice" />
          <Route
            path="/news/:id"
            render={() => <NewsDetail newsTitle="Titulo de la noticia" />}
          />
          <Route component={About} path="/AboutUs" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
