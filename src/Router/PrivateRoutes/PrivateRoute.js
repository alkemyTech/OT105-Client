import { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';

const PrivateRoute = ({ props }) => {
  const token = localStorage.getItem('token');

  const history = useHistory();

  useEffect(() => {
    !token && history.push('/');
  }, []);

  return <Route {...props} />;
};

export default PrivateRoute;
