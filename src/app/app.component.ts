import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { NEVER, of } from 'rxjs';

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

    // Using 'errorPolicy': 'all' in Apollo config.

    this.apollo
      .mutate<any, any>({
        mutation: CreateBook,
      })
      .subscribe((res) => {
        if (res.errors) {
          this.errorAlert = res.errors[0].message;
          console.log('this.errorAlert', this.errorAlert);
          return NEVER;
        }
      });

    // However, using RxJS of to create the same observable succeeds:

    // of({ errors: [{ message: 'Error from RxJS of' }] }).subscribe((res) => {
    //   if (res.errors) {
    //     this.errorAlert = res.errors[0].message;
    //     console.log('this.errorAlert', this.errorAlert);
    //     return NEVER;
    //   }
    // });
  }
}
