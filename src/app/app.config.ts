import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, isDevMode } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideServiceWorker } from "@angular/service-worker";
import { provideNgIconsConfig } from "@ng-icons/core";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideNgIconsConfig({
      size: "1.5em",
    }),
    provideServiceWorker("ngsw-worker.js", {
      // enabled: !isDevMode(),
      registrationStrategy: "registerImmediately",
    }),
  ],
};
