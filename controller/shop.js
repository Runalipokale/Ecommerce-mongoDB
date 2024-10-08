const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');
const order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  // Use findById to get the product by ID
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.status(404).render('404', { pageTitle: 'Product not found', path: '/404' });
      }
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).render('500', { pageTitle: 'Error', path: '/500' });
    });
};


exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
  .populate('cart.items.productId')
  .then(user =>{
    const products = user.cart.items.map(item=>{
      return { product:item.productId , quantity:item.quantity}
    })
        res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:products || []
  });
  })
  .catch(err=> console.log(err))
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
  .then(product=>{
    if(!product){
      return res.redirect('/')
    }
    return req.user.addToCart(product);
  })
  .then(result=>{
     console.log(result);
     res.redirect('/cart');
  })
  .catch(err =>{
    console.log(err);
  })
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
  //receiving the cart item data i.e productId
  .populate('cart.items.productId')
  //finding the product with the received productId
  .then(user=>{
    //remove the product from cart array having this id
    user.cart.items = user.cart.items.filter(item=>
      //converting the product id to string if it is match to product id remove the product form array
      item.productId._id.toString() === prodId); 
      //save the updated user document
      return user.save()
    })
  .then(result=>
    res.redirect('/cart')
  )
  .catch(err => console.log(err))
};

//placing order 
exports.postOrder = (req,res,next)=>{
  req.user
  .populate('cart.items.productId')
  // .execPopulate()
  .then(user=>{
    const products = user.cart.items.map(i=>{
      return { 
        quantity:i.quantity, 
        product:{...i.productId._doc}
      };
    });
    const order = new Order({ //according to schema create the order object 
       user:{
         userId : req.user._id,
         username : req.user.username
       },
       products:products
    });
    return order.save();
  })
  .then(result=>{
     req.user.clearCart();
     res.redirect('/orders');
     console.log('Order placed!!') 
  })
  .catch(err=>{
    console.log("Error while placing the order",err);
  })
}

exports.getOrders = (req, res, next) => {
  // User.findById(req.user._id)
  // .populate('order.items.productId')
  // .then(Order=>{
  //   const orders = order.items.map(item=>{
  //     return{
  //       product:item.productId,
  //       quantity:item.quantity
  //     }
  //   })
  //   return orders;
  // })
  Order.find({"user.userId":req.user._id})
  .then(orders=>{
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders || []
    });
  })
  .catch(err => console.log(err))
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};



