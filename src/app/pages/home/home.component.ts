import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgIconsModule } from "@ng-icons/core";
import { BehaviorSubject, combineLatest, map, of, switchMap } from "rxjs";
import { CitySearchBarComponent } from "../../components/city-search-bar/city-search-bar.component";
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

  searchedCity$ = new BehaviorSubject<City | null>(null);

  searchedWeather$ = this.searchedCity$.pipe(
    switchMap((city) =>
      city
        ? this.weather.getWeatherData(city!.coord.lat, city!.coord.lon)
        : of(null)
    )
  );

  searchedForecast$ = this.searchedCity$.pipe(
    switchMap((city) =>
      city
        ? this.weather.getForecast(city!.coord.lat, city!.coord.lon)
        : of(null)
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

  constructor(private weather: WeatherService) {}
}
