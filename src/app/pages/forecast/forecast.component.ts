import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, map, skipWhile, switchMap } from "rxjs";
import { WeatherService } from "../../services/weather.service";
import { ExpandableComponent } from "../../components/expandable/expandable.component";
import { DateToLocaleDateStringPipe } from "../../pipes/date-to-locale-date-string.pipe";
import { OpenweatherIconComponent } from "../../components/openweather-icon/openweather-icon.component";
import { DateToLocaleTimeStringPipe } from "../../pipes/date-to-locale-time-string.pipe";
import { LineChartComponent } from "../../components/line-chart/line-chart.component";
import { CommonModule } from "@angular/common";
import { SpinnerComponent } from "../../components/spinner/spinner.component";

@Component({
    selector: "app-forecast",
    standalone: true,
    templateUrl: "./forecast.component.html",
    styleUrl: "./forecast.component.scss",
    imports: [
        CommonModule,
        ExpandableComponent,
        DateToLocaleDateStringPipe,
        OpenweatherIconComponent,
        DateToLocaleTimeStringPipe,
        LineChartComponent,
        SpinnerComponent
    ]
})
export class ForecastComponent {
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
    map((res) => {
      const entries = Object.entries(res);
      entries.shift();
      return entries;
    }),
  );

  constructor(
    private route: ActivatedRoute,
    private weather: WeatherService,
  ) {}
}
