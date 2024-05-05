import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-openweather-icon",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./openweather-icon.component.html",
  styleUrl: "./openweather-icon.component.scss",
})
export class OpenweatherIconComponent {
  @Input({ required: true }) iconCode!: string;
  @Input() description?: string;
  @Input() size?: number;
}
