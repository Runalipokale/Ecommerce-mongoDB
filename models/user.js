const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    cart:{
        //this is how we store emberded data cart is a field in which we store items array
        //items array is consist of productId and quantity 
        //productId => it is a speacial type of schema provided by mongoose
        //ref => used to store foreign key 
        items:[
            {
                productId:
                {
                    type: Schema.Types.ObjectId,
                    ref:'Product',
                    require:true
                },
                quantity:
                {
                    type:Number, 
                 require:true
                }
            }
        ]
    },
    order:{
        items:[
            {
                productId:{
                    type: Schema.Types.ObjectId,
                    ref:'Product',
                    required:true
                },
                quantity:{
                    type:Number,
                    required:true
                }
            }
        ],
        _id: mongoose.Schema.Types.ObjectId
    }
})
userSchema.methods.addToCart = function(product){
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
         updatedCartItem.push({productId:product._id,quantity: newQuantity})
      }
      const updatedCart = {
         items:updatedCartItem
      }
      this.cart =  updatedCart;
      return this.save()
}


userSchema.methods.addOrder = function(productId){
    this.order.items = this.cart.items;
    return this.save();
}

userSchema.methods.clearCart = function(){
    this.cart = {items: []};
    return this.save();
}

module.exports = mongoose.model('User',userSchema);


//define model using mongoDb
// const mongodb = require('mongodb');
// const getDb = require('../utils/database').getDb;
// const ObjectId = new mongodb.ObjectId;

// class User{
//    constructor(username,email,cart,id){
//       this.name = username ;
//       this.email = email;
//       this.cart = cart;
//       this._id= id;
//    }

//    save(){
//       const db = getDb();
//       db.collection('users').insertOne(this);
//       return User
//       .then(result=>{
//          console.log(User);
//       })
//       .catch(err=>{
//          console.log(err);
//       })
      
//    }
//    addToCart(product){

//       // if item exist in the cart quntity get increases
//       const cartProductIndex = this.cart.items.findIndex(cp=>{
//          return cp.productId.toString() === product._id.toString();
//       });

//       let newQuantity= 1;
//       const updatedCartItem = [...this.cart.items];

//       if(cartProductIndex >=0){
//          newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//          updatedCartItem[cartProductIndex].quantity = newQuantity
//       }
//       else{
//          updatedCartItem.push({productId: new mongodb.ObjectId(product._id),quantity: newQuantity})
//       }
//       const updatedCart = {
//          items:updatedCartItem
//       }
//       const db = getDb();
//       return db
//       .collection('users')
//       .updateOne(
//          {_id: new mongodb.ObjectId(this._id)},
//          {$set:{cart:updatedCart}}
//       );

//    }
//       getCart() {
//          const db = getDb();
//          const productIds = this.cart.items.map(i => {
//            return new mongodb.ObjectId(i.productId);
//          });
     
//          return db
//            .collection('products')
//            // $in operator use for looking at particular field in the array 
//            .find({ _id: { $in: productIds } })
//            .toArray()
//            .then(products => {
//              if (!products) {
//                throw new Error('Products not found');
//              }
             
//              // map method create new array form existing array element 
//              const cartItems = products.map(p => {
//                const cartItem = this.cart.items.find(i => {
//                  return i.productId.toString() === p._id.toString();
//                });
     
//                if (!cartItem) {
//                  console.error('Cart item not found for product:', p);
//                  return null;
//                }
//                return {

//                   // ... is a spread operator which takes all the present properties of the object 
//                  ...p,
//                  quantity: cartItem.quantity
//                };
//              }).filter(item => item !== null); // Filter out null items
     
//              console.log('Mapped cart items:', cartItems); // Log cart items with quantities
//              return cartItems;
//            })
//            .catch(err => {
//              console.error("Error while loading cart:", err);
//              throw err; // Propagate the error
//            });
//        }

//    deleteItemFromCart(productId){
//       const updatedCartItems = this.cart.items.filter(item=>{
//          return item.productId.toString() !== productId.toString();
//       });

//       const db = getDb();
//       return db
//       .collection('users')
//       .updateOne(
//          {_id:new mongodb.ObjectId(this._id)},
//          {$set:{cart:{items:updatedCartItems}}}
//       )
//    }

//    addOrder(){
//      const db = getDb()
//      return this.getCart().then(products=>{
//         const order={
//          items:products,
//          user:{
//             _id:new mongodb.ObjectId(this._id),
//             name: this.name
//          }
//           }
//           return db.collection('orders').insertOne(order)
//    })
//      .then(result=>{
//        this.cart= {items:[]};
//        return db 
//        .collection('users')
//        .updateOne(
//          {_id:new mongodb.ObjectId(this._id)},
//          {$set:{cart:{items:[]}}}
//        );
//      })
//    }

//    getOrders(){
//       const db = getDb();
//       return db.collection('orders').find({'user._id':new mongodb.ObjectId(this._id)})
//       .toArray()
//    }

//    static findById(userId){
//      const db = getDb();
//      return db
//      .collection('users')
//      .findOne({_id:new mongodb.ObjectId(userId)})
//      .then(user=>{
//       console.log(user);
//       return user;
//      })
//      .catch(err=>{
//       console.log(err);
//      })
//    }
// }


// module.exports = User;
