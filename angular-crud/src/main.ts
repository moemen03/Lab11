import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import LogRocket from 'logrocket';

LogRocket.init('xergyu/testforlab');
LogRocket.identify('THE_USER_ID_IN_YOUR_APP', {
  name: 'James Morrison',
  email: 'jamesmorrison@example.com',

  // Add your own custom user variables here, ie:
  subscriptionType: 'pro'
});

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
