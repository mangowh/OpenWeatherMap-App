import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  skip,
  switchMap,
} from "rxjs";
import { CitiesService } from "../../services/cities.service";
import { WeatherService } from "../../services/weather.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  currentWeather$ = this.weather.getCurrentWeatherData();
  cities$ = this.citiesService.getCities();

  inputValue = signal("");

  private searchText$ = new BehaviorSubject<string>("");

  data$ = this.searchText$.pipe(
    skip(1),
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((search) => this.citiesService.getCities(search)),
    map((res) => res[0]),
    switchMap((city) =>
      this.weather.getWeatherData(parseFloat(city.lat), parseFloat(city.lng))
    )
  );

  constructor(
    private weather: WeatherService,
    private citiesService: CitiesService
  ) {}

  search() {
    this.searchText$.next(this.inputValue());
  }
}
