import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateToLocaleTimeString",
  standalone: true,
})
export class DateToLocaleTimeStringPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return new Date(value).toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}
