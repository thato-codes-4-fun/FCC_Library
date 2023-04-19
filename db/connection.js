let mongoose = require('mongoose');

const connect = async (mongo_uri) => {
  try{
    console.log('connecting to db...')
    let connect = await mongoose.connect(mongo_uri);
    return connect
  }catch(e){
    console.log('Failed to connect to db...')
    console.log(e)
    return e;
  }
}

module.exports =  connect 

