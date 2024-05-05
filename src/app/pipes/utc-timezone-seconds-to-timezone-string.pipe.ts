import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "utcTimezoneSecondsToTimezoneString",
  standalone: true,
})
export class UtcTimezoneSecondsToTimezoneStringPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    return new Date(new Date().getTime() - value * 1000)
      .toLocaleString(navigator.language, {
        day: "2-digit",
        timeZoneName: "short",
      })
      .substring(4);
  }
}
