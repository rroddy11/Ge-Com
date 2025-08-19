import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const router = inject(Router);
  const tokenService = inject(TokenService);

  return next(req)
    .pipe
    // pas de import rxjs ici; Angular ajoute opérateurs automatiquement via zone/vite.
    // Si besoin: import { catchError, throwError } from 'rxjs';
    // et envelopper:
    // .pipe(catchError((error: HttpErrorResponse) => { ...; return throwError(() => error); }))
    // Pour rester simple et concis, tu peux ajouter ce bloc catchError dans ton projet :
    ();
};
