import { inject } from "@angular/core";
import {
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  Routes,
} from "@angular/router";
import { tap } from "rxjs";
import { LoadingComponent } from "./pages/loading/loading.component";
import { TodayComponent } from "./pages/today/today.component";
import { GeolocationService } from "./services/geolocation.service";

const redirectToToday: CanActivateFn = (
  route,
  state
): MaybeAsync<GuardResult> => {
  const router = inject(Router);
  const geoloc = inject(GeolocationService);

  const sub = geoloc.currentPosition$
    .pipe(
      tap(({ coords }) =>
        router
          .navigate(["today"], {
            queryParams: { lat: coords.latitude, lon: coords.longitude },
          })
          .then(() => {
            sub.unsubscribe();
          })
      )
    )
    .subscribe();

  return true;
};

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    canActivate: [redirectToToday],
    component: LoadingComponent,
  },
  {
    path: "today",
    component: TodayComponent,
  },
  { path: "**", pathMatch: "full", redirectTo: "" },
];
