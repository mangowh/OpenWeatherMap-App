import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CitiesService {
  private apiKey = "db9eec8b09mshe7258ed786ab616p1d3a7fjsnf8f6483bc443";
  private apiUrl = "https://wft-geo-db.p.rapidapi.com/v1/geo/places";

  constructor(private http: HttpClient) {}

  getCities(namePrefix?: string) {
    const params: HttpParams = new HttpParams();
    if (namePrefix) {
      params.set("namePrefix", namePrefix);
    }

    return this.http
      .get<PlacesResponse>(this.apiUrl, {
        headers: { "X-RapidAPI-Key": this.apiKey },
        params,
      })
      .pipe(
        map((res) => {
          console.log(res);
          return res.data;
        })
      );
  }
}
