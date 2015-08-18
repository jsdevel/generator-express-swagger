# Generator express-swagger

An Expressjs Swagger generator for Yeoman, based on the express command line tool.  This
is a fork of @petecoop's [generator](https://github.com/petecoop/generator-express)
with much of the front end technologies removed and Swagger added.

## Features

- Swagger support
- Basic file structure
- .editorconfig for consistent coding styles within text editors

## Getting started

- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator **globally**: `npm install -g generator-express-api`
- Run: `yo express-swagger`.
- Run: `gulp test` to run the tests.
- Run: `gulp serve` to start the server on `localhost:3000`.

## Options

- `--skip-install`

  Skips the automatic execution of `npm` after scaffolding has finished.
