
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authenticateInterceptor } from './interceptors/authenticate.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }), provideAnimationsAsync(), provideAnimationsAsync(),
    importProvidersFrom(NgxSpinnerModule.forRoot()),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(withInterceptors([authenticateInterceptor])),
  ]
};