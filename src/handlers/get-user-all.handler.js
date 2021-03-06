/**
 * Rota repsonsável pela criação de usuários
 * https://imasters.com.br/devsecops/encriptando-senhas-com-o-bcrypt
 */
const userService = require('../services/user.service')
const hospitalService = require('../services/hospital.service')

module.exports = {
  method: 'GET',
  path: '/user',
  handler: async (request) => {

    if(request.query.type) {
      return userService.getAllRole(request.query.type);
    }

    const {scope, user} = request.auth.credentials
    if (scope.includes('user.all')) return userService.getAll()
    //  Pega o usuario
    const currentUser = await userService.find(user.id, true)
    //  Pega o hospital o qual ele é responsavel
    if (currentUser.responsable_hospital) {
      const hospitals = await hospitalService.findById(currentUser.responsable_hospital)
      return hospitals
    }
    return []
  },
  config: {
    auth: {
      strategy: 'helpdoctor',
      scope: ['user.list']
    },
    cors: {
      origin: ['*']
    }
  }
}
