import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateToLocale",
  standalone: true,
})
export class DateToLocalePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return new Date(value).toLocaleDateString(navigator.language, {
      weekday: "short",
      day: "2-digit",
    });
  }
}
