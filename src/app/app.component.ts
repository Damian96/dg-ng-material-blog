import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dg-ng-material-blog';

  finishedLoading: boolean = false;

  ngOnInit() {
    setTimeout(() => {
      this.finishedLoading = true;
    }, 800)
  }
}
