const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

class User{
   constructor(username,email,cart,id){
      this.name = username ;
      this.email = email;
      this.cart = cart;
      this._id= id;
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
   addToCart(product){

      // if item exist in the cart quntity get increases
      const cartProductIndex = this.cart.items.findIndex(cp=>{
         return cp.productId.toString() === product._id.toString();
      });

      let newQuantity= 1;
      const updatedCartItem = [...this.cart.items];

      if(cartProductIndex >=0){
         newQuantity = this.cart.items[cartProductIndex].quantity + 1;
         updatedCartItem[cartProductIndex].quantity = newQuantity
      }
      else{
         updatedCartItem.push({productId: new mongodb.ObjectId(product._id),quantity: newQuantity})
      }
      const updatedCart = {
         items:updatedCartItem
      }
      const db = getDb();
      return db
      .collection('users')
      .updateOne(
         {_id: new mongodb.ObjectId(this._id)},
         {$set:{cart:updatedCart}}
      );

   }
   getCart(){
      const db = getDb();
      const productIds = this.cart.items.map(i=>{
         return i.productId;
      });
      return db
      .collection('products')
      //$in => this operator takes an array of ID's hence 
      //every id present in a array will accepted and get back a cursor which get back a reference 
      .find({_id: {$in: productIds}})
      .toArray()
      .then(products=>{
         //map() => javascript method which create new array from existing array
          return products.map(p=>{
            // ... is a spread operator which talking all the elements from existing array
            return {
               ...p,
               quantity:this.cart.items.find(i=>{
               return i.productId.toString() === p._id.toString()
            }).quantity
         }
          });
      })
      .then(items=>{
         return updatedCart[this.cart.items];
      })
      .catch(err=>{
         console.log("Error while cart loaded!!!")
      })
   }
   static findById(userId){
     const db = getDb();
     return db
     .collection('users')
     .findOne({_id:new mongodb.ObjectId(userId)})
     .then(user=>{
      console.log(user);
      return user;
     })
     .catch(err=>{
      console.log(err);
     })
   }
}


module.exports = User;
