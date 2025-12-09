import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';


// configure here the logRocket 

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
