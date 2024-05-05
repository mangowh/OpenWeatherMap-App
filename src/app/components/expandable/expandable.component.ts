import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NgIconsModule } from "@ng-icons/core";

@Component({
  selector: "app-expandable",
  standalone: true,
  imports: [CommonModule, NgIconsModule],
  templateUrl: "./expandable.component.html",
  styleUrl: "./expandable.component.scss",
})
export class ExpandableComponent {
  expanded = false;

  toggle() {
    this.expanded = !this.expanded;
  }
}
