import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-navigation-tabs",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./navigation-tabs.component.html",
  styleUrl: "./navigation-tabs.component.scss",
})
export class NavigationTabsComponent {
  tabs = [
    {
      name: "Oggi",
      route: "today",
    },
    {
      name: "5 giorni",
      route: "forecast",
    },
  ];
}
