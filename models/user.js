const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

class User{
   constructor(username,email){
      this.name = username ;
      this.email = email;
   }

   save(){
      const db = getDb();
      db.collection('users').insertOne(this);
      return User
      .then(result=>{
         console.log(User);
      })
      .catch(err=>{
         console.log(err);
      })
   }
   static findById(userId){
     const db = getDb();
     return db.collection('users')
     .find({_id:new mongodb.ObjectId(userId)})
     .next();
   }
}

module.exports = User;
