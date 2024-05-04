import { Injectable } from "@angular/core";
import { from } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GeolocationService {
  getCurrentPosition(options?: PositionOptions) {
    return from(
      new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      })
    );
  }
}
