import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import {
  provideIcons,
  provideNgIconsConfig,
  withExceptionLogger,
} from "@ng-icons/core";
import { routes } from "./app.routes";
import * as HeroIcons from "@ng-icons/heroicons/outline";
import * as BootstrapIcons from "@ng-icons/bootstrap-icons";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideNgIconsConfig(
      {
        size: "1.5em",
      },
      withExceptionLogger()
    ),
    provideIcons(HeroIcons),
    provideIcons(BootstrapIcons),
  ],
};
