import { Injectable } from '@angular/core';
import { BreadCrumb } from "./breadcrumbs.model";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, filter, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

  private breadcrumbsSubject = new BehaviorSubject<BreadCrumb[]>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  constructor(private _router: Router) {
    this.breadcrumbsSubject.next([]);

    this._router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        const breadcrumbs = this.createBreadcrumbs(this._router.routerState.root);
        this.breadcrumbsSubject.next(breadcrumbs);
      });
  }

  getBreadcrumbs(): Observable<BreadCrumb[]> {
    return this.breadcrumbs$;
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadCrumb[] = []
  ): BreadCrumb[] {
    const routeURL: string = route.snapshot.url.map((segment) => segment.path).join('/');

    if (routeURL !== '') {
      url += `/${routeURL}`;
    }

    if (url !== '' && route.snapshot.data.hasOwnProperty('breadcrumb')) {
      breadcrumbs.push({ label: route.snapshot.data['breadcrumb'], link: url });
    }

    if (route.firstChild) {
      return this.createBreadcrumbs(route.firstChild, url, breadcrumbs);
    }

    return breadcrumbs;
  }


}
