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

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* <Route path="/" exact component={} />           Esta ruta debe ser para el Home */}
          <Route component={ActivitiesForm} path="/create-activity" />
          <Route component={CategoriesForm} path="/create-category" />
          <Route component={NewsForm} path="/create-news" />
          <Route component={SlidesForm} path="/backoffice/create-slide" />
          <Route component={TestimonialForm} path="/create-testimonials" />
          <Route component={UserForm} path="/create-user" />
          <Route component={MembersForm} path="/create-member" />
          <Route component={ProjectsForm} path="/create-project" />
          <Route component={SchoolCampaign} path="/school-campaign" />
          <Route component={ToysCampaign} path="/toys-campaign" />
          <Route component={EditHomeForm} path="/backoffice/home" />
        </Switch>
      </BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img alt="logo" className="App-logo" src={logo} />
          <Counter />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <span>
            <span>Learn </span>
            <a
              className="App-link"
              href="https://reactjs.org/"
              rel="noopener noreferrer"
              target="_blank">
              React
            </a>
            <span>, </span>
            <a
              className="App-link"
              href="https://redux.js.org/"
              rel="noopener noreferrer"
              target="_blank">
              Redux
            </a>
            <span>, </span>
            <a
              className="App-link"
              href="https://redux-toolkit.js.org/"
              rel="noopener noreferrer"
              target="_blank">
              Redux Toolkit
            </a>
            ,<span> and </span>
            <a
              className="App-link"
              href="https://react-redux.js.org/"
              rel="noopener noreferrer"
              target="_blank">
              React Redux
            </a>
          </span>
        </header>
      </div>
    </>
  );
}

export default App;
