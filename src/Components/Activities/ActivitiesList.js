import React, { useState, useEffect } from 'react';
import '../CardListStyles.css';
import { getActivities } from '../../Services/ActivitieService';
const ActivitiesList = () => {
  const [activities, setActivities] = useState([{}]);

  useEffect(() => {
    getActivities().then((resp) => {
      setActivities(resp);
    });
  }, []);

  return (
    <div>
      <h1>Listado Actividades</h1>
      <ul className="list-container">
        {activities.length > 0 ? (
          activities.map((activity) => {
            return (
              <li key={activity.id} className="card-info">
                <h3>{activity.name}</h3>
                <p>{activity.description}</p>
              </li>
            );
          })
        ) : (
          <p>No hay actividades</p>
        )}
      </ul>
    </div>
  );
};

export default ActivitiesList;
