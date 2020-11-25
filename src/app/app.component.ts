import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { NEVER } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  errorAlert = '';

  constructor(private apollo: Apollo) {}

  addBook() {
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
          console.log('this.errorAlert', this.errorAlert);
          return NEVER;
        })
      )
      .subscribe();
  }
}
