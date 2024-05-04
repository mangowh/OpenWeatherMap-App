import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideNgIconsConfig } from "@ng-icons/core";
import { routes } from "./app.routes";
import { cacheInterceptor } from "./interceptors/cache.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([cacheInterceptor])),
    provideNgIconsConfig({
      size: "1.5em",
    }),
  ],
};
