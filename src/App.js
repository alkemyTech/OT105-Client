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
import BackofficeListActivities from './Components/Activities/BackofficeListActivities';
import NewsCreateEdit from './Components/News/NewsCreateEdit';
import MembersCreateEdit from './Components/Members/MembersCreateEdit';
import FormContact from './Components/Contact/FormContact';
import ScreenMembersList from './Components/Members/ScreenMembersList';
import EditHomeForm from './Components/Home/EditHomeForm';
import Seccion_Novedades from './Components/News/Seccion_Novedades';
import Activities from './Components/Activities/Activities';
import Contact from './Components/Contact/Contact';
import BackofficeDashboard from './Components/Backoffice/BackofficeDashboard';
import NewsDetail from './Components/News/Detail/NewsDetail';
import SlidesBackOffice from './Components/Slides/SlidesBackOffice';
import ActivityDetail from './Components/Activities/Detail/ActivityDetail';
import About from './Components/About/About';
import Organization from './Components/Organization/OrganizationInfo';
import Donations from './Components/Donations/Donations';
import Thanks from './Components/Donations/Thanks';
import Error404 from './Components/Error404/Error404';
import HomeScreen from './Components/Home';
import Footer from './Components/Footer/Footer';
import Backoffice_ListCategories from './Components/Categories/Backoffice_ListCategories';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact component={HomeScreen} path="/" />
          <Route component={ActivitiesForm} path="/create-activity" />
          <Route
            component={BackofficeListActivities}
            path="/backoffice/activities"
          />

          <Route
            component={Backoffice_ListCategories}
            path="/backoffice/categories"
          />
          <Route component={CategoriesForm} path="/create-category" />
          <Route component={FormContact} path="/form-contact" />
          <Route
            path="/create-category/:id"
            render={() => <CategoriesForm />}
          />
          <Route path="/create-category" render={() => <CategoriesForm />} />
          <Route component={Activities} path="/Actividades" />
          <Route component={Organization} path="/backoffice/organization" />
          <Route component={NewsForm} path="/create-news" />
          <Route component={NewsCreateEdit} path="/backoffice/news/create" />
          <Route component={NewsCreateEdit} path="/backoffice/news/:id" />
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
          <Route
            component={MembersCreateEdit}
            path="/backoffice/members/edit"
          />
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
