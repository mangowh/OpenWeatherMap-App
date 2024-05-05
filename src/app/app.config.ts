import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import {
  bootstrapDroplet,
  bootstrapMoon,
  bootstrapSun,
  bootstrapWind,
  bootstrapX,
  bootstrapChevronDown,
  bootstrapChevronUp,
} from "@ng-icons/bootstrap-icons";
import {
  provideIcons,
  provideNgIconsConfig,
  withExceptionLogger,
} from "@ng-icons/core";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { routes } from "./app.routes";
import { httpErrorsInterceptor } from "./interceptors/http-errors.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpErrorsInterceptor])),
    provideNgIconsConfig(
      {
        size: "1.5em",
      },
      withExceptionLogger(),
    ),
    provideIcons({
      bootstrapMoon,
      bootstrapSun,
      bootstrapDroplet,
      bootstrapWind,
      bootstrapX,
      bootstrapChevronDown,
      bootstrapChevronUp,
    }),
    importProvidersFrom(AutocompleteLibModule),
  ],
};
