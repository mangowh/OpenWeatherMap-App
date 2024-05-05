import { Injectable } from "@angular/core";
import { catchError, from, throwError } from "rxjs";
import { NotificationService } from "./notification.service";

@Injectable({
  providedIn: "root",
})
export class GeolocationService {
  currentPosition$ = this.getCurrentPosition();

  constructor(private notification: NotificationService) {}

  private getCurrentPosition(
    options: PositionOptions = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 43200000, // 12h
    },
  ) {
    return from(
      new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      }),
    ).pipe(
      catchError((err) => {
        this.notification.showAlert(
          "Errore: impossibile recuperare posizione attuale",
          "Errore GPS",
        );

        return throwError(() => err);
      }),
    );
  }
}
