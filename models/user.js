const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;
const ObjectId = new mongodb.ObjectId;

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
      getCart() {
         const db = getDb();
         const productIds = this.cart.items.map(i => {
           return new mongodb.ObjectId(i.productId);
         });
     
         return db
           .collection('products')
           // $in operator use for looking at particular field in the array 
           .find({ _id: { $in: productIds } })
           .toArray()
           .then(products => {
             if (!products) {
               throw new Error('Products not found');
             }
             
             // map method create new array form existing array element 
             const cartItems = products.map(p => {
               const cartItem = this.cart.items.find(i => {
                 return i.productId.toString() === p._id.toString();
               });
     
               if (!cartItem) {
                 console.error('Cart item not found for product:', p);
                 return null;
               }
               return {

                  // ... is a spread operator which takes all the present properties of the object 
                 ...p,
                 quantity: cartItem.quantity
               };
             }).filter(item => item !== null); // Filter out null items
     
             console.log('Mapped cart items:', cartItems); // Log cart items with quantities
             return cartItems;
           })
           .catch(err => {
             console.error("Error while loading cart:", err);
             throw err; // Propagate the error
           });
       }

   deleteItemFromCart(productId){
      const updatedCartItems = this.cart.items.filter(item=>{
         return item.productId.toString() !== productId.toString();
      });

      const db = getDb();
      return db
      .collection('users')
      .updateOne(
         {_id:new mongodb.ObjectId(this._id)},
         {$set:{cart:{items:updatedCartItems}}}
      )
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
