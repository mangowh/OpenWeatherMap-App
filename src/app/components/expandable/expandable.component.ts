import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { NgIconsModule } from "@ng-icons/core";

@Component({
  selector: "app-expandable",
  standalone: true,
  imports: [CommonModule, NgIconsModule],
  templateUrl: "./expandable.component.html",
  styleUrl: "./expandable.component.scss",
})
export class ExpandableComponent {
  @Input() expanded = false;

  toggle() {
    this.expanded = !this.expanded;
  }
}
