import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CacheService {
  constructor() {}

  private createCacheKey(key: string) {
    return new Date().toLocaleDateString() + "---" + key;
  }

  set(key: string, data: unknown) {
    localStorage.setItem(this.createCacheKey(key), JSON.stringify(data));
  }

  get<T>(key: string): T | null {
    const retrievedItem = localStorage.getItem(this.createCacheKey(key));

    if (!retrievedItem) {
      return null;
    }

    return JSON.parse(retrievedItem);
  }
}
