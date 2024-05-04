import { ApplicationRef, Injectable, ViewContainerRef } from "@angular/core";
import { AlertComponent } from "../components/alert/alert.component";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private applicationRef: ApplicationRef) {}

  showAlert(message: string, title?: string) {
    const rootViewContainerRef =
      this.applicationRef.components[0].injector.get(ViewContainerRef);
    const componentRef = rootViewContainerRef.createComponent(AlertComponent);

    componentRef.instance.message = message;

    if (title) {
      componentRef.instance.title = title;
    }

    setTimeout(() => {
      componentRef.destroy();
    }, 5000);
  }
}
