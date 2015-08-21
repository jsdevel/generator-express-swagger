# <%= slugify(appname) %>
> <%= options.description %>

This API server is Swagger 2.0 compliant, so you can point a Swagger UI instance at the API server's endpoint to view documentation.

## Actions
* Starting the server - `npm start`
* Running tests/linting - `npm t`
* Running tests on file change - `gulp watch:test`
* Linting source on file change - `gulp watch:lint`
* Reloading the server on file change - `gulp watch:serve`

## CORS

This api server allows all CORS requests in development node.  CORS is turned off in production by default.

## Listening Port

By default the server listens on port 3000.  You can change this by setting the `PORT`
environment variable.

## License

<%= options.license %>
