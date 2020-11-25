import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyModalComponent } from './my-modal/my-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'apollo-cd-issue';

  constructor(private matDialog: MatDialog) {}

  openDialog() {
    this.matDialog.open(MyModalComponent, {
      width: '700px',
    });
  }
}
