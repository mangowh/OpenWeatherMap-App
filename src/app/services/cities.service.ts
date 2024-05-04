import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, of, tap } from "rxjs";

import it from "../../assets/it.json";

@Injectable({
  providedIn: "root",
})
export class CitiesService {
  /* private apiKey = "3d9bc19c0bmsheac536c192d5a12p1ddecdjsnf34e788fb7f8";
  private apiUrl = "https://wft-geo-db.p.rapidapi.com/v1/geo"; */

  constructor(private http: HttpClient) {}

  /* getCities(namePrefix?: string) {
    const params: HttpParams = new HttpParams();
    if (namePrefix) {
      params.set("namePrefix", namePrefix);
    }

    return this.http
      .get(this.apiUrl + "/places", {
        headers: {
          "X-RapidAPI-Key": this.apiKey,
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
        params,
        responseType: "json",
      })
      .pipe(map((res) => (res as PlacesResponse).data));
  } */

  getCities(namePrefix?: string) {
    return of(it).pipe(
      map((data) =>
        data.sort(function (a, b) {
          if (a.city < b.city) {
            return -1;
          }
          if (a.city > b.city) {
            return 1;
          }
          return 0;
        })
      ),
      map((data) =>
        namePrefix
          ? data.filter((item) =>
              item.city.toLowerCase().startsWith(namePrefix.toLowerCase())
            )
          : data
      )
    );
  }
}
