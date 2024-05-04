import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, switchMap, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { GeolocationService } from "./geolocation.service";

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  private apiKey = environment.apiKey;

  private baseUrl = "https://api.openweathermap.org/data/2.5";

  constructor(
    private http: HttpClient,
    private geolocation: GeolocationService
  ) {}

  getWeatherData(lat: number, lon: number) {
    return this.http.get<WeatherResponse>(this.baseUrl + "/weather", {
      params: { lat, lon, appId: this.apiKey },
    });
  }

  getCurrentWeatherData() {
    return this.geolocation
      .getCurrentPosition()
      .pipe(
        switchMap(({ coords }) =>
          this.getWeatherData(coords.latitude, coords.longitude)
        )
      );
  }
}
