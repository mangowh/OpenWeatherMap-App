import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  skip,
  switchMap,
  tap,
} from "rxjs";
import { CitiesService } from "../../services/cities.service";
import { WeatherService } from "../../services/weather.service";
import { NgIconsModule } from "@ng-icons/core";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, FormsModule, NgIconsModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  currentDate = new Date();

  cities$ = this.citiesService.getCities();

  currentWeather$ = this.weather.getCurrentWeatherData();
  currentForecast$ = this.weather.getCurrentFiveDaysForecast();

  searchText$ = new BehaviorSubject<string>("");

  searchedWeather$ = this.searchText$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((search) => this.citiesService.getCities(search)),
    map((res) => res[0]),
    switchMap((city) =>
      this.weather.getWeatherData(parseFloat(city.lat), parseFloat(city.lng))
    )
  );

  selectedWeather$ = combineLatest([
    this.currentWeather$,
    this.searchedWeather$,
  ]).pipe(
    map(([currentWeather, searchedWeather]) =>
      searchedWeather ? searchedWeather : currentWeather
    )
  );

  currentForecastGroupedByDays$ = this.currentForecast$.pipe(
    map((currentForecast) => {
      const list = currentForecast.list;

      return list.reduce(
        (groups, item) => {
          const [date, time] = item.dt_txt.split(" ");

          if (!groups[date]) {
            groups[date] = [];
          }

          groups[date].push({ ...item, time });

          return groups;
        },
        {} as { [key: string]: (List & { time: string })[] }
      );
    }),
    map((res) => Object.entries(res))
  );

  inputValue = signal("");

  constructor(
    private weather: WeatherService,
    private citiesService: CitiesService
  ) {}
}
