const mongoose = require('mongoose')

const Schema  = mongoose.Schema;

const productSchema = new Schema();
// code using mongoDb 
// const mongodb = require('mongodb');
// const getDb =require('../utils/database').getDb;

// class Product{
//     constructor(title,price,description,imageUrl,id,userId){
//       this.title=title;
//       this.price=price;
//       this.description=description;
//       this.imageUrl=imageUrl;
//       this._id = id ? new mongodb.ObjectId(id) : null;
//       this.userId = userId;
//     }

//     save(){
//        const  db = getDb();
//        let dbOp;
//        if(this._id){
//         //update the product
//         dbOp = db.collection('products')
//         .updateOne({_id:this._id},{$set:this}); //$set method use to set this values found in the object to the database value 
//        }
//        else{
//         dbOp = db.collection('products').insertOne(this);
//        }
//        return db.collection('products')
//        .insertOne(this)
//        .then(result=>{
//         console.log(result) 
//        })
//        .catch(err=>{
//         console.log(err);
//        })
//       }
    
//     static fetchAll(){
//       const  db = getDb();
//       return db.collection('products')
//       .find()
//       .toArray()
//       .then(products=>{
//         console.log(products);
//         return products;
//       })
//       .catch(err=>{
//         console.log(err);
//       })
//       }
//     static findById(prodId){
//       const db = getDb();
//       return db
//       .collection('products')
//       .find({_id: new mongodb.ObjectId(prodId)})
//       .next()
//       .then(product=>{
//         console.log(product);
//         return product; 
//       })
//       .catch(err=>{
//         console.log(err);
//       })
//     }

//     static deleteById(prodId){
//        const db = getDb();
//        return db
//        .collection('products')
//        .deleteOne({_id: new mongodb.ObjectId(prodId)})
//        .then(product=>{
//            console.log("Product deleted!!");
//            return product;
//        })
//        .catch(err=>{
//          console.log(err);
//        })
//     }
//   }

// module.exports = Product;
   