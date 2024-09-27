const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products:[
        {
            product:{type:mongoose.SchemaTypes.ObjectId,ref:'Product',require:'true'},
            quantity:{type:Number,require:'true'}
        }
    ],
    user:{
        name:{
            type:String,
            require:'true'
        },
        userId:{
            type:Schema.Types.ObjectId,
            require:'true',
            ref:'User'
        }
    }
});

module.exports=mongoose.model('Order',orderSchema);