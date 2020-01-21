import React from 'react';
import { Switch } from 'react-router-dom';

import CreateMeetup from '../pages/CreateMeetup';
import Dashboard from '../pages/Dashboard';
import DetailsMeetup from '../pages/DetailsMeetup';
import EditMeetup from '../pages/EditMeetup';
import Profile from '../pages/Profile';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" exact component={SignUp} />

      <Route path="/dashboard" exact component={Dashboard} isPrivate />
      <Route path="/profile" exact component={Profile} isPrivate />

      <Route path="/meetups/create" exact component={CreateMeetup} isPrivate />
      <Route path="/meetups/:id" exact component={DetailsMeetup} isPrivate />
      <Route path="/meetups/:id/edit" exact component={EditMeetup} isPrivate />
    </Switch>
  );
}
