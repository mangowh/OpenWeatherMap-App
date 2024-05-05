import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgIconsModule } from "@ng-icons/core";
import { Observable, map, skipWhile, switchMap } from "rxjs";
import { CitySearchBarComponent } from "../../components/city-search-bar/city-search-bar.component";
import { ExpandableComponent } from "../../components/expandable/expandable.component";
import { LineChartComponent } from "../../components/line-chart/line-chart.component";
import { OpenweatherIconComponent } from "../../components/openweather-icon/openweather-icon.component";
import { DateToLocaleDateStringPipe } from "../../pipes/date-to-locale-date-string.pipe";
import { DateToLocaleTimeStringPipe } from "../../pipes/date-to-locale-time-string.pipe";
import { UtcTimestampToLocaleTimeStringPipe } from "../../pipes/utc-timestamp-to-locale-time-string.pipe";
import { UtcTimezoneSecondsToTimezoneStringPipe } from "../../pipes/utc-timezone-seconds-to-timezone-string.pipe";
import { WeatherService } from "../../services/weather.service";

@Component({
  selector: "app-today",
  standalone: true,
  templateUrl: "./today.component.html",
  styleUrl: "./today.component.scss",
  imports: [
    CommonModule,
    FormsModule,
    NgIconsModule,
    CitySearchBarComponent,
    LineChartComponent,
    ExpandableComponent,
    DateToLocaleDateStringPipe,
    DateToLocaleTimeStringPipe,
    OpenweatherIconComponent,
    UtcTimestampToLocaleTimeStringPipe,
    UtcTimezoneSecondsToTimezoneStringPipe,
  ],
})
export class TodayComponent {
  coords$: Observable<{ lat: number; lon: number } | null> =
    this.route.queryParamMap.pipe(
      map((params) => {
        const latString = params.get("lat");
        const lonString = params.get("lon");

        if (!latString || !lonString) {
          return null;
        }

        return {
          lat: parseFloat(latString),
          lon: parseFloat(lonString),
        };
      }),
    );

  weather$ = this.coords$.pipe(
    skipWhile((coords) => !coords),
    switchMap((coords) => this.weather.getWeather(coords!.lat, coords!.lon)),
  );

  forecast$ = this.coords$.pipe(
    skipWhile((coords) => !coords),
    switchMap((coords) => this.weather.getForecast(coords!.lat, coords!.lon)),
  );

  forecastGroupedByDays$ = this.forecast$.pipe(
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
        {} as { [key: string]: (List & { time: string })[] },
      );
    }),
    map((res) => Object.entries(res)),
  );

  todayForecast$ = this.forecastGroupedByDays$.pipe(
    map((forecast) => forecast[0][1]),
  );

  constructor(
    private route: ActivatedRoute,
    private weather: WeatherService,
  ) {}
}
