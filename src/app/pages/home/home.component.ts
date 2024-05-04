import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from "rxjs";
import { CitiesService } from "../../services/cities.service";
import { WeatherService } from "../../services/weather.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  currentWeather$ = this.weather.getCurrentWeatherData();
  cities$ = this.citiesService.getCities();

  private searchText$ = new BehaviorSubject<string>("");

  searchList$ = this.searchText$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((search) => this.citiesService.getCities(search))
  );

  constructor(
    private weather: WeatherService,
    private citiesService: CitiesService
  ) {
    this.searchList$.subscribe();
  }

  search($event: KeyboardEvent) {
    this.searchText$.next(($event.target as HTMLInputElement).value);
  }
}
