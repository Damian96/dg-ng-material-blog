import { Component, Input } from '@angular/core';
import { BreadCrumb } from "./breadcrumbs.model";
import { BreadcrumbsService } from "./breadcrumbs.service";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {

  breadcrumbs: BreadCrumb[] = [];

  // @Input() currentRoute: string | undefined;

  constructor(private _breadcrumbService: BreadcrumbsService) {
    this._breadcrumbService.breadcrumbs$.subscribe((breadcrumbs: BreadCrumb[]) => {
      this.breadcrumbs = breadcrumbs;
    });
  }
}
