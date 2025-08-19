import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, of, shareReplay, timeout } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiHealthService {
  private cache$ = of(false);

  constructor(private http: HttpClient) {}

  isBackendAlive() {
    this.cache$ = this.http
      .get(`${environment.apiBaseUrl}${environment.healthPath}`, {
        responseType: 'text',
      })
      .pipe(
        timeout(2000),
        map(() => true),
        catchError(() => of(false)),
        shareReplay(1)
      );
    return this.cache$;
  }
}
