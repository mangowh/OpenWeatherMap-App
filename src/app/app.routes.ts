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
import { GeolocationService } from "./services/geolocation.service";

const redirectToToday: CanActivateFn = (
  route,
  state,
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
          }),
      ),
    )
    .subscribe();

  return true;
};

const checkParams: CanActivateFn = (route, state): MaybeAsync<GuardResult> => {
  const router = inject(Router);

  if (route.queryParamMap.has("lat") && route.queryParamMap.has("lon")) {
    return true;
  }

  // retry
  router.navigate(["/"]);
  return false;
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
    canActivate: [checkParams],
    loadComponent: () =>
      import("./pages/today/today.component").then((c) => c.TodayComponent),
  },
  {
    path: "forecast",
    canActivate: [checkParams],
    loadComponent: () =>
      import("./pages/forecast/forecast.component").then(
        (c) => c.ForecastComponent,
      ),
  },
  { path: "**", pathMatch: "full", redirectTo: "" },
];
