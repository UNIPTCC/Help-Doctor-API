const userService = require('../services/hospital.service');

module.exports = {
  method: 'DELETE',
  path: '/hospital/{id}',
  handler: async (request, reply) => {
    return userService.destroy(request.params.id);
  },
  options: {
    cors: {
      origin: ['*']
    }
  }
}