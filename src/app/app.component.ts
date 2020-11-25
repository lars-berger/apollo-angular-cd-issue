import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { NEVER, of } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <p>
      Error alert (Apollo):
      {{ apolloErrorAlert }}
    </p>

    <p>
      Error alert (RxJS):
      {{ rxjsErrorAlert }}
    </p>

    <button (click)="addBook()">Add book</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  apolloErrorAlert = '';
  rxjsErrorAlert = '';

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

    // Using 'errorPolicy': 'all' in Apollo config.

    this.apollo
      .mutate<any, any>({
        mutation: CreateBook,
      })
      .subscribe((res) => {
        if (res.errors) {
          this.apolloErrorAlert = res.errors[0].message;
          console.log('this.errorAlert', this.apolloErrorAlert);
        }
      });

    // However, using RxJS of to create the same observable succeeds:

    of({ errors: [{ message: 'Failed to add book' }] }).subscribe((res) => {
      if (res.errors) {
        this.apolloErrorAlert = res.errors[0].message;
        console.log('this.errorAlert', this.apolloErrorAlert);
      }
    });
  }
}
