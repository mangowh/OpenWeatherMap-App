import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  skipWhile,
  switchMap,
  tap,
} from "rxjs";
import { WeatherService } from "../../services/weather.service";
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
  selector: "app-city-search-bar",
  standalone: true,
  templateUrl: "./city-search-bar.component.html",
  styleUrl: "./city-search-bar.component.scss",
  imports: [CommonModule, FormsModule, AutocompleteLibModule, SpinnerComponent],
})
export class CitySearchBarComponent {
  @Output() citySelected = new EventEmitter<City>();

  loading$ = new BehaviorSubject(false);

  search$ = new BehaviorSubject("");
  data$ = this.search$.pipe(
    tap(() => this.loading$.next(true)),
    skipWhile((search) => search.length < 3),
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((search) => this.weather.find(search)),
    tap(() => this.loading$.next(false)),
  );

  constructor(private weather: WeatherService) {}

  onInputChanged($event: string) {
    this.search$.next($event ?? "");
  }
}
