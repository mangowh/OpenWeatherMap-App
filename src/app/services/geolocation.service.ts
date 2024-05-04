import { Injectable } from "@angular/core";
import { BehaviorSubject, from, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GeolocationService {
  currentPosition$ = this.getCurrentPosition();

  private getCurrentPosition(options?: PositionOptions) {
    return from(
      new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      }),
    );
  }
}
