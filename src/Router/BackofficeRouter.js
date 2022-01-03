import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ActivitiesForm from '../Components/Activities/ActivitiesForm';
import CategoriesForm from '../Components/Categories/CategoriesForm';
import SlidesForm from '../Components/Slides/SlidesForm';
import TestimonialForm from '../Components/Testimonials/TestimonialsForm';
import UserForm from '../Components/Users/UsersForm';
import UsersListTable from '../Components/Users/UsersListTable';
import ProjectsForm from '../Components/Projects/ProjectsForm';
import BackofficeListActivities from '../Components/Activities/BackofficeListActivities';
import NewsCreateEdit from '../Components/News/NewsCreateEdit';
import MembersCreateEdit from '../Components/Members/MembersCreateEdit';
import ScreenMembersList from '../Components/Members/ScreenMembersList';
import BackofficeDashboard from '../Components/Backoffice/BackofficeDashboard';
import SlidesBackOffice from '../Components/Slides/SlidesBackOffice';
import ScreenOrganization from '../Components/Organization/ScreenOrganization';
import ScreenOrganizationEditForm from '../Components/Organization/ScreenOrganizationEditForm';
import Backoffice_ListCategories from '../Components/Categories/Backoffice_ListCategories';
import News from '../Components/News/News';
import BackofficeLayout from '../Components/Layouts/BackofficeLayout';

const BackofficeRouter = () => {
  let { path } = useRouteMatch();

  return (
    <BackofficeLayout>
      <Route exact component={BackofficeDashboard} path={`${path}`} />

      <Route
        path={`${path}/activities/edit/:id`}
        render={() => <ActivitiesForm />}
      />
      <Route component={ActivitiesForm} path={`${path}/activities/create`} />
      <Route component={BackofficeListActivities} path={`${path}/activities`} />

      <Route
        path={`${path}/categories/edit/:id`}
        render={() => <CategoriesForm />}
      />
      <Route component={CategoriesForm} path={`${path}/categories/create`} />
      <Route
        component={Backoffice_ListCategories}
        path={`${path}/categories`}
      />

      <Route component={MembersCreateEdit} path={`${path}/members/edit/:id`} />
      <Route component={MembersCreateEdit} path={`${path}/members/create`} />
      <Route exact component={ScreenMembersList} path={`${path}/members`} />

      <Route component={NewsCreateEdit} path={`${path}/news/edit/:id`} />
      <Route component={NewsCreateEdit} path={`${path}/news/create`} />
      <Route component={News} path={`${path}/news`} />

      <Route
        component={ScreenOrganizationEditForm}
        path={`${path}/organization/edit`}
      />
      <Route component={ScreenOrganization} path={`${path}/organization`} />

      <Route exact component={SlidesForm} path={`${path}/slides/edit/:id`} />
      <Route exact component={SlidesForm} path={`${path}/slides/create`} />
      <Route component={SlidesBackOffice} path={`${path}/slides`} />

      <Route component={TestimonialForm} path={`${path}/testimonials/create`} />
      <Route
        path="/create-testimonials"
        render={() => <TestimonialForm id={25} />}
      />

      <Route component={UserForm} path={`${path}/users/create`} />
      <Route component={UsersListTable} path={`${path}/users`} />

      <Route component={ProjectsForm} path={`${path}/projects/create`} />
    </BackofficeLayout>
  );
};

export default BackofficeRouter;
