angular.module('FinalApp')
    .factory('postResource', function($resource) {
        return Post = $resource('https://jsonplaceholder.typicode.com/posts/:id', { id: '@id' }, { update: { method: 'PUT' } });

        // update,  - metodo de resource implementado con el servicio http, usando POST, PUT or PATCH

    })