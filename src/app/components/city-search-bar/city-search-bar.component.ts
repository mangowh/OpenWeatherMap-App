import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { CitiesService } from "../../services/cities.service";

@Component({
  selector: "app-city-search-bar",
  standalone: true,
  imports: [CommonModule, FormsModule, AutocompleteLibModule],
  templateUrl: "./city-search-bar.component.html",
  styleUrl: "./city-search-bar.component.scss",
})
export class CitySearchBarComponent {
  inputValue = signal("");

  @Output() citySelected = new EventEmitter<{ city: string }>();

  cities$ = this.citiesService.getCities();

  constructor(private citiesService: CitiesService) {}
}
