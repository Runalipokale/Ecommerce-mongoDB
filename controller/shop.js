const Product = require('../models/product');
const User = require('../models/user');

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
  Product.find()
  .then(products =>{
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
  .filter(prodId)
  .then(result=>res.redirect('/cart'))
  .catch(err => console.log(err))
};

//placing order 
exports.postOrder = (req,res,next)=>{
  let fetchedCart;
  req.user
  .addOrder() // this give access to the cart
    .then(result=>{
      res.redirect('/orders');
    })
    .catch(err => console.log(err))
  }

exports.getOrders = (req, res, next) => {
  req.user
  .getOrders()
  .then(orders=>{
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
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



