import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import {
  provideIcons,
  provideNgIconsConfig,
  withExceptionLogger,
} from "@ng-icons/core";
import { routes } from "./app.routes";
import * as BootstrapIcons from "@ng-icons/bootstrap-icons";
import { AutocompleteLibModule } from "angular-ng-autocomplete";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideNgIconsConfig(
      {
        size: "1.5em",
      },
      withExceptionLogger(),
    ),
    provideIcons(BootstrapIcons), // TODO optimize
    importProvidersFrom(AutocompleteLibModule),
  ],
};
