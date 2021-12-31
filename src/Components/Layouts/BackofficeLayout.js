import HeaderBackoffice from '../CommonComponents/HeaderBackoffice';
import { Switch } from 'react-router-dom';

const BackofficeLayout = ({ children }) => {
  return (
    <HeaderBackoffice>
      <Switch>{children}</Switch>
    </HeaderBackoffice>
  );
};
////MERGE TESTTTTTTT

export default BackofficeLayout;
