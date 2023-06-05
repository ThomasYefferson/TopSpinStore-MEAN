# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.4.

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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Additional Dependencies
This project includes @ng-bootstrap and ngx-bootstrap for working with modal declarations and other additional tools. @ng-bootstrap was included bypassing the dependency tree check, even though the @ng-boostrap docs say that @ng-boostrap 14.x.x can be used on angular-cli 15, some dependencies don't allow a clean install due to differences with their versioning.

* @ng-bootstrap: ^14.0.1 --> npm i -D @ng-bootstrap/ng-bootstrap --legacy-peer-deps
* ngx-bootstrap: ^10.2.0 --> ng add ngx-bootstrap
