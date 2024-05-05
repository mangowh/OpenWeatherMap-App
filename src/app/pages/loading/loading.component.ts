import { Component } from "@angular/core";
import { SpinnerComponent } from "../../components/spinner/spinner.component";

@Component({
  selector: "app-loading",
  standalone: true,
  templateUrl: "./loading.component.html",
  styleUrl: "./loading.component.scss",
  imports: [SpinnerComponent],
})
export class LoadingComponent {}
