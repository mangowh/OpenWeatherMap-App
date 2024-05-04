import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from "@angular/core";
import Chart from "chart.js/auto";

@Component({
  selector: "app-line-chart",
  standalone: true,
  imports: [],
  templateUrl: "./line-chart.component.html",
  styleUrl: "./line-chart.component.scss",
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild("canvas") canvas?: ElementRef<HTMLCanvasElement>;

  @Input() data: (List & { time: string })[] = [];

  ngAfterViewInit(): void {
    if (!this.canvas) throw new Error("Canvas element non found");

    new Chart(this.canvas?.nativeElement, {
      type: "line",
      options: {
        layout: {
          padding: 20,
        },
      },
      data: {
        labels: this.data.map((row) =>
          new Date(row.dt_txt).toLocaleTimeString(navigator.language, {
            hour: "2-digit",
            minute: "2-digit",
          }),
        ),
        datasets: [
          {
            label: "Temperatura",
            data: this.data.map((row) => row.main.temp),
            tension: 0.2,
          },
          {
            label: "Temperatura percepita",
            data: this.data.map((row) => row.main.feels_like),
            tension: 0.2,
          },
          {
            label: "Temperatura massima",
            data: this.data.map((row) => row.main.temp_max),
            tension: 0.2,
          },
          {
            label: "Temperatura minima",
            data: this.data.map((row) => row.main.temp_min),
            tension: 0.2,
          },
        ],
      },
    });
  }
}
