import { HttpClient } from "@angular/common/http";
import { Injectable, isDevMode } from "@angular/core";
import { catchError, of, switchMap, tap, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { GeolocationService } from "./geolocation.service";
import { CacheService } from "./cache.service";

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  private apiKey = environment.apiKey;

  private baseUrl = "https://api.openweathermap.org/data/2.5";

  defaultLang = navigator.language.split("-")[0] ?? "it";

  currentWeather$ = this.geolocation.currentPosition$.pipe(
    switchMap(({ coords }) =>
      this.getWeather(coords.latitude, coords.longitude),
    ),
  );

  currentForecast$ = this.geolocation.currentPosition$.pipe(
    switchMap(({ coords }) =>
      this.getForecast(coords.latitude, coords.longitude),
    ),
  );

  constructor(
    private http: HttpClient,
    private cache: CacheService,
    private geolocation: GeolocationService,
  ) {}

  getWeather(lat: number, lon: number, lang: string = this.defaultLang) {
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
      .pipe(
        tap((res) => this.cache.set("weather", res)),
        catchError((err) => throwError(() => err)),
      );
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
        params: { lat, lon, units: ["metric"], lang, appId: this.apiKey },
        responseType: "json",
      })
      .pipe(
        tap((res) => this.cache.set("forecast", res)),
        catchError((err) => throwError(() => err)),
      );
  }

  find(q: string) {
    if (q.length < 3) return of(null);

    return this.http
      .get<FindResponse>(this.baseUrl + "/find", {
        params: { q, appId: this.apiKey },
        responseType: "json",
      })
      .pipe(catchError((err) => throwError(() => err)));
  }
}
