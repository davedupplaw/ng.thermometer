import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-thermometer-app';
  value: number;

  ngOnInit(): void {
    setInterval( () => {
      this.value = Math.random() * 8;
    }, 2000 );
  }
}
