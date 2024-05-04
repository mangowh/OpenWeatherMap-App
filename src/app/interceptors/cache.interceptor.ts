import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { of, tap } from "rxjs";
import { CacheService } from "../services/cache.service";

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cache = inject(CacheService);

  // Only cache GET requests
  if (req.method !== "GET") {
    return next(req);
  }

  const cachedResponse = cache.get<HttpResponse<unknown>>(req.url);
  if (cachedResponse) {
    console.debug("Cached " + req.url);

    // Serve from cache
    return of(cachedResponse);
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        // Cache the new response
        cache.set(req.url, JSON.stringify(event.clone()));
      }
    })
  );
};
