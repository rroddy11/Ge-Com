// app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withComponentInputBinding,
} from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { NavigationService } from './core/services/navigation.service';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import {
  TranslateModule,
  TranslateService,
  TranslateLoader,
} from '@ngx-translate/core';
import { Observable } from 'rxjs';

// 🔑 Loader HTTP correct pour ngx-translate
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return {
    getTranslation: (lang: string): Observable<Record<string, any>> => {
      return http.get<Record<string, any>>(`assets/i18n/${lang}.json`);
    },
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withComponentInputBinding()
    ),
    provideHttpClient(),
    provideClientHydration(withEventReplay()),
    NavigationService,
    provideCharts(withDefaultRegisterables()),

    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
        defaultLanguage: 'fr',
      })
    ),
    TranslateService,
  ],
};
