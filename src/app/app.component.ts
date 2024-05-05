import { CommonModule, DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit, Renderer2 } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { NgIconsModule } from "@ng-icons/core";
import { BehaviorSubject } from "rxjs";
import { CitySearchBarComponent } from "./components/city-search-bar/city-search-bar.component";
import { NavigationTabsComponent } from "./components/navigation-tabs/navigation-tabs.component";
import { WeatherService } from "./services/weather.service";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { OpenweatherIconComponent } from "./components/openweather-icon/openweather-icon.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgIconsModule,
    CitySearchBarComponent,
    NavigationTabsComponent,
    SpinnerComponent,
    OpenweatherIconComponent,
  ],
})
export class AppComponent implements OnInit {
  currentWeather$ = this.weather.currentWeather$;

  darkModeEnabled$ = new BehaviorSubject(false);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    private weather: WeatherService,
  ) {
    this.darkModeEnabled$.subscribe((darkModeEnabled) => {
      if (darkModeEnabled) {
        this.renderer.addClass(this.document.body, "dark");
      } else {
        this.renderer.removeClass(this.document.body, "dark");
      }
    });
  }

  ngOnInit(): void {
    const darkModePreference = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    darkModePreference.addEventListener("change", (e) =>
      this.darkModeEnabled$.next(e.matches),
    );

    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) && darkModePreference.matches)
    ) {
      this.darkModeEnabled$.next(true);
    } else {
      this.darkModeEnabled$.next(false);
    }
  }

  toggleDarkMode() {
    this.darkModeEnabled$.next(!this.darkModeEnabled$.value);
  }

  onCitySelected(selectedCity: City) {
    this.router.navigate(["today"], {
      queryParams: { lat: selectedCity.coord.lat, lon: selectedCity.coord.lon },
    });
  }
}
