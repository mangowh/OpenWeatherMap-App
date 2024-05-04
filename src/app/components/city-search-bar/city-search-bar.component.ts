import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { WeatherService } from "../../services/weather.service";
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  skipUntil,
  skipWhile,
  switchMap,
} from "rxjs";

@Component({
  selector: "app-city-search-bar",
  standalone: true,
  imports: [CommonModule, FormsModule, AutocompleteLibModule],
  templateUrl: "./city-search-bar.component.html",
  styleUrl: "./city-search-bar.component.scss",
})
export class CitySearchBarComponent {
  @Output() citySelected = new EventEmitter<City>();

  search$ = new BehaviorSubject("");
  data$ = this.search$.pipe(
    skipWhile((search) => search.length < 3),
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((search) => this.weather.find(search)),
  );

  constructor(private weather: WeatherService) {}

  onInputChanged($event: string) {
    this.search$.next($event ?? "");
  }
}
