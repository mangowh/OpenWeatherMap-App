import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Notification, catchError, throwError } from "rxjs";
import { NotificationService } from "../services/notification.service";

export const httpErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.error("Unauthorized request:", err);

          notificationService.showAlert(
            "Errore: permessi non sufficienti",
            "Errore di autorizzazione",
          );
        } else {
          console.error("HTTP error:", err);

          notificationService.showAlert(
            "Errore: riprovare più tardi",
            "Errore HTTP",
          );
        }
      } else {
        console.error("An error occurred:", err);
      }

      return throwError(() => err);
    }),
  );
};
