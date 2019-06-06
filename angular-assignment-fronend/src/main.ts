import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MentorOnDemandModule } from './mentorondemand/mentorondemand.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(MentorOnDemandModule)
  .catch(err => console.error(err));
