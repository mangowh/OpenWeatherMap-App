import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { NgIconsModule } from "@ng-icons/core";

@Component({
  selector: "app-alert",
  standalone: true,
  imports: [CommonModule, NgIconsModule],
  templateUrl: "./alert.component.html",
  styleUrl: "./alert.component.scss",
})
export class AlertComponent {
  hidden = false;

  @Input() title?: string;
  @Input({ required: true }) message!: string;
}
