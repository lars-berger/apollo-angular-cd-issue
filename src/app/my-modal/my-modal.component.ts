import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { NEVER } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css'],
})
export class MyModalComponent {
  errorAlert: string = '';

  constructor(private apollo: Apollo) {}

  login() {
    const CreateBook: DocumentNode = gql`
      mutation CreateBook {
        addBook(title: "Fox in Socks", author: "Dr. Seuss") {
          title
          author
        }
      }
    `;

    this.apollo
      .mutate<any, any>({
        mutation: CreateBook,
      })
      .pipe(
        catchError((e) => {
          this.errorAlert = e;
          return NEVER;
        })
      )
      .subscribe();
  }
}
