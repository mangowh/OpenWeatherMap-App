import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgIconsModule } from "@ng-icons/core";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from "rxjs";
import { CitySearchBarComponent } from "../../components/city-search-bar/city-search-bar.component";
import { CitiesService } from "../../services/cities.service";
import { WeatherService } from "../../services/weather.service";

@Component({
  selector: "app-home",
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  imports: [CommonModule, FormsModule, NgIconsModule, CitySearchBarComponent],
})
export class HomeComponent {
  currentDate = new Date();

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

  searchedForecast$ = this.searchText$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((search) => this.citiesService.getCities(search)),
    map((res) => res[0]),
    switchMap((city) =>
      this.weather.getForecast(parseFloat(city.lat), parseFloat(city.lng))
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

  selectedForecast$ = combineLatest([
    this.currentForecast$,
    this.searchedForecast$,
  ]).pipe(map(([current, searched]) => (searched ? searched : current)));

  currentForecastGroupedByDays$ = this.selectedForecast$.pipe(
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

  constructor(
    private weather: WeatherService,
    private citiesService: CitiesService
  ) {}
}
