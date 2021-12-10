import React from 'react';
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
import SchoolCampaign from './Campaigns/School/SchoolCampaign';
import ToysCampaign from './Campaigns/Toys/ToysCampaign';
import MembersForm from './Components/Members/MembersForm';
import ProjectsForm from './Components/Projects/ProjectsForm';
import EditHomeForm from './Components/Home/EditHomeForm';
import Activities from './Components/Activities/Activities';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* <Route path="/" exact component={} />           Esta ruta debe ser para el Home */}
          <Route component={ActivitiesForm} path="/create-activity" />

          <Route path="/create-category" render={() => <CategoriesForm />} />

          <Route component={Activities} path="/Actividades" />
          

          <Route component={NewsForm} path="/create-news" />
          <Route component={SlidesForm} path="/backoffice/create-slide" />
          <Route
            path="/create-testimonials"
            render={() => <TestimonialForm id={25} />}
          />
          <Route component={UserForm} path="/create-user" />
          <Route component={MembersForm} path="/create-member" />
          <Route component={ProjectsForm} path="/create-project" />
          <Route component={SchoolCampaign} path="/school-campaign" />
          <Route component={ToysCampaign} path="/toys-campaign" />
          <Route component={EditHomeForm} path="/backoffice/home" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
