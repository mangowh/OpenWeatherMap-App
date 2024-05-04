import { HttpClient } from "@angular/common/http";
import { Injectable, isDevMode } from "@angular/core";
import { of, switchMap, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { GeolocationService } from "./geolocation.service";
import { CacheService } from "./cache.service";

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  private apiKey = environment.apiKey;

  private baseUrl = "https://api.openweathermap.org/data/2.5";

  defaultLang = "it";

  constructor(
    private http: HttpClient,
    private cache: CacheService,
    private geolocation: GeolocationService
  ) {}

  getWeatherData(lat: number, lon: number, lang: string = this.defaultLang) {
    if (isDevMode()) {
      const found = this.cache.get<WeatherResponse>("weather");
      if (found) {
        return of(found);
      }
    }

    return this.http
      .get<WeatherResponse>(this.baseUrl + "/weather", {
        params: { lat, lon, units: ["metric"], lang, appId: this.apiKey },
        responseType: "json",
      })
      .pipe(tap((res) => this.cache.set("weather", res)));
  }

  getForecast(lat: number, lon: number, lang: string = this.defaultLang) {
    if (isDevMode()) {
      const found = this.cache.get<ForecastResponse>("forecast");
      if (found) {
        return of(found);
      }
    }

    return this.http
      .get<ForecastResponse>(this.baseUrl + "/forecast", {
        params: { lat, lon, lang, appId: this.apiKey },
        responseType: "json",
      })
      .pipe(tap((res) => this.cache.set("forecast", res)));
  }

  getCurrentWeatherData() {
    return this.geolocation.currentPosition$.pipe(
      switchMap(({ coords }) =>
        this.getWeatherData(coords.latitude, coords.longitude)
      )
    );
  }

  getCurrentFiveDaysForecast() {
    return this.geolocation.currentPosition$.pipe(
      switchMap(({ coords }) =>
        this.getForecast(coords.latitude, coords.longitude)
      )
    );
  }

  find(q: string) {
    return this.http.get<FindResponse>(this.baseUrl + "/find", {
      params: { q, appId: this.apiKey },
      responseType: "json",
    });
  }
}
