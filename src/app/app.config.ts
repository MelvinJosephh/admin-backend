import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { firebaseConfig } from '../firebase.config';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import {ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { provideStorage, getStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      FormsModule,
      ToastrModule.forRoot(),
      AngularFireModule.initializeApp(firebaseConfig),
      BrowserAnimationsModule,
      MatDialogModule,
      
    ),
    provideRouter(routes),
    provideHttpClient(),
    provideStorage(() => getStorage()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()), provideAnimationsAsync()
  ]
};
