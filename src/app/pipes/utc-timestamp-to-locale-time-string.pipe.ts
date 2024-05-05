import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "utcTimestampToLocaleTimeString",
  standalone: true,
})
export class UtcTimestampToLocaleTimeStringPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    return new Date(value * 1000).toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}
