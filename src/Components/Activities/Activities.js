import React from 'react';
import Title from '../Title/Title';
import ActivitiesList from './ActivitiesList';
import {
  deleteActivityById,
  getActivities,
  getActivityById,
  postActivity,
  putActivity,
} from '../../Services/ActivitiesServices';

function Activities() {
  return (
    <div>
      <Title titleText={'Actividades'} />
      <ActivitiesList />
    </div>
  );
}

export default Activities;
