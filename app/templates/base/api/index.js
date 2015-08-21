var requireDir = require('require-dir');
var npmPackage = require('../package.json');

module.exports = {
  swagger: '2.0',

  info: {
    version: npmPackage.version,
    title: npmPackage.name,
    description: npmPackage.description,
    termsOfService: null,
    contact: npmPackage.author,
    license: {name: npmPackage.license}
  },

  basePath: npmPackage.config.apiBasePath,
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],

  paths: {
    '/worlds': {
      get: {
        description: 'Returns all worlds.',
        operationId: 'findWorlds',
        parameters: [
          {
            name: 'color',
            in: 'query',
            description: 'color to filter by',
            required: false,
            type: 'string'
          },
          {
            name: 'limit',
            in: 'query',
            description: 'maximum number of results to return',
            required: false,
            type: 'integer',
            format: 'int32'
          }
        ],

        responses: {
          200: {
            description: 'world response',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/World'
              }
            }
          },
          default: {
            description: 'unexpected error',
            schema: {
              $ref: '#/definitions/Error'
            }
          }
        }
      },
    },

    '/worlds/{id}': {
      get: {
        description: 'Return a world by an id.',
        operationId: 'findWorldById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Id of world to return.',
            required: true,
            type: 'integer',
            format: 'int32'
          }
        ],

        responses: {
          200: {
            description: 'world response',
            schema: {
              $ref: '#/definitions/World',
            }
          },

          default: {
            description: 'unexpected error',
            schema: {
              $ref: '#/definitions/Error'
            }
          }
        }
      },
    }
  },

  definitions: requireDir('./definitions')
};
