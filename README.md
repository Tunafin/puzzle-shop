# PuzzleShop

## Deploy

這邊會用到angular-cli-ghpages， 先安裝這個庫。

``` sh
npm i -g angular-cli-ghpages
```

接下來會有兩個分支，請擇一執行:

A. 部屬到GitHub Pages

``` sh
ng build --base-href /專案名稱/
npx ngh --dir=dist/專案名稱
```

B. 部屬到GitHub Pages，使用custom domain

``` sh
ng build
npx ngh --dir=dist/專案名稱 --cname=自定義域
```

---

以下由Angular生成的文件:

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.5.

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
