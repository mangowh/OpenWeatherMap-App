import { CommonModule, DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit, Renderer2 } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  imports: [CommonModule, RouterModule, FormsModule],
})
export class AppComponent implements OnInit {
  darkModeEnabled$ = new BehaviorSubject(false);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
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
      "(prefers-color-scheme: dark)"
    );

    darkModePreference.addEventListener("change", (e) =>
      this.darkModeEnabled$.next(e.matches)
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
}
