import React, { useState, useEffect } from 'react';
import '../CardListStyles.css';
import Spinner from '../CommonComponents/LoaderSpinner';
import { getActivities } from '../../Services/ActivitiesServices';
import { Link } from 'react-router-dom';

const ActivitiesList = () => {
  const [activities, setActivities] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getActivities();

      setActivities(response);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Listado Actividades</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="list-container">
          {activities.length > 0 ? (
            activities.map((activity) => {
              return (
                <li key={activity.id} className="card-info">
                  <Link to={`/actividades/${activity.id}`}>
                    <h3>{activity.name}</h3>
                    <p>{activity.description}</p>
                  </Link>
                </li>
              );
            })
          ) : (
            <p>No hay actividades</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default ActivitiesList;
