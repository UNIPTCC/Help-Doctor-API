const User = require('../models/users')
const Hospital = require('../models/hospital')
const Address = require('../models/address')

const getAll = async (names = "",address = "") => {
  
  var obj = {
  	include: [
 		{
 			model: Address,
        	as: 'address_info',
        	required: false,
        	attributes: ['id','formatedaddress']
 		}
  	]
  }

  if(names != "") {
  	obj.where = global.sequelize.where(global.sequelize.col("name"), {
        ilike: '%'+names+'%'
    });
  }

  if(address != "") {
  	obj.include[0].required = true;
  	obj.include[0].where = global.sequelize.where(global.sequelize.col("formatedaddress"), {
        ilike: '%'+address+'%'
    });
  }

  return await Hospital.findAll(obj);
}

const register = async (h) => {
  const hospital = new Hospital();
  return hospital.update(h).then(()=>{
      return hospital;
    });
}

const destroy = async (id) => {
  
  return await Hospital.destroy({
    where: {id: id}
  })
}

const update = async (id,h) => {
  
  const hospital = await Hospital.findOne({
    where: {id: id}
  })

  return hospital.update(h).then(()=>{
      return hospital;
    });
}

module.exports = {
  getAll,
  register,
  update,
  destroy
}
