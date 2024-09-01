# OxioChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Scope Cuts

Several scope cuts were made due to the time constraint.

### HTTP Requests Error Management
I assumed there would be no API error for the purpose of this challenge.

### Automated Tests
I decided not to deal with automated tests at this time. I made sure to tests the features manually myself however.

Since this is a very small application I believe this to be reasonnable. Larger applications would quickly become unwieldy to test manually though.

### Styling And Responsiveness
Styling is minimal and no special consideration was made to ensure responsiveness.
Resizing the browser shown the website to display the elements mostly correctly, although somewhat cramped the smaller it got.

## Design decisions & Performance Considerations

I used RxJS' Observables a lot to atomate the various calulations and changes that need to happen automatically. I also tried to mostly use them with the `async` pipe in templates to leverage the automatic subscription/unsubscription provided by Angular.

When not possible or practical, I managed the subscriptions in the component and made sure to unsubscribe using the `ngOnDestroy` lifecycle hook.
The exception to this is with the HttpClient's requests observables, which I know to complete after the request is done.
