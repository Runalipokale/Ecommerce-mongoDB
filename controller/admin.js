const Product = require('../models/product');

//using mongooes
exports.getProducts = (req, res, next) => {
  Product.find()
  // select() => this method is used to select and unselect 
  //the data field the data which is pass in the method is extracted from the database 
  // and the data which you want to excluded is indicated by(-) sign
  // .select('title price -_id')
  
  //populate => this is a method which tell mongoose populate certain field with all the details
  // .populate('userId','name')
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title:title, 
    price:price, 
    description:description, 
    imageUrl:imageUrl,
    userId: req.user
  });

  product.save()
      .then(result => {
          console.log('Product created:', result);
          res.redirect('/products');
      })
      .catch(err => {
          console.error('Error creating product:', err);
          next(err); // Pass the error to the next middleware
      });
};

exports.getEditProduct = (req,res,next)=>{
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(product=>{
    if(!product){
      return res.redirect('/');
    }
  res.render('admin/edit-product',{
    pageTitle:'Edit Product',
    path:'/admin/edit-product',
    editing: editMode,
    product: product
  });
  })
  .catch(err=>console.log(err));
}

exports.postEditProduct = (req,res,next)=>{
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
  .then(product=>{
    product.title = updatedTitle,
    product.price = updatedPrice,
    product.imageUrl = updatedImageUrl,
    product.description = updatedDesc
    product.save()
  })
   .then(result=>{
    console.log("Product updated!!");
    res.redirect("/admin/products");
  })
  .catch(err =>console.log(err));
}

exports.postDeleteProduct=(req,res,next)=>{
  const prodId = req.body.productId;
  //instead deleteOne we can user findByIdAndRemove method offers by mongooes
  Product.findById(prodId).deleteOne()
 .then(()=>{
   console.log('Product deleted!!');
   res.redirect('/products')
 })
 .catch()
}


// using mongoDb
// exports.getProducts = (req, res, next) => {
//   Product.fetchAll()
//     .then(products => {
//       res.render('admin/products', {
//         prods: products,
//         pageTitle: 'Admin Products',
//         path: '/admin/products'
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// exports.getAddProduct = (req, res, next) => {
//   res.render('admin/edit-product', {
//     pageTitle: 'Add Product',
//     path: '/add-product',
//     editing: false
//   });
// };

// exports.postAddProduct = (req, res, next) => {
//   const title = req.body.title;
//   const imageUrl = req.body.imageUrl;
//   const price = req.body.price;
//   const description = req.body.description;
//   const product = new Product(title, price, description, imageUrl,null,req.user._id);

//   product.save()
//       .then(result => {
//           console.log('Product created:', result);
//           res.redirect('/products');
//       })
//       .catch(err => {
//           console.error('Error creating product:', err);
//           next(err); // Pass the error to the next middleware
//       });
// };

// exports.getEditProduct = (req,res,next)=>{
//   const editMode = req.query.edit;
//   if(!editMode){
//     return res.redirect('/');
//   }
//   const prodId = req.params.productId;
//   Product.findById(prodId)
//   .then(product=>{
//     if(!product){
//       return res.redirect('/');
//     }
//   res.render('admin/edit-product',{
//     pageTitle:'Edit Product',
//     path:'/admin/edit-product',
//     editing: editMode,
//     product: product
//   });
//   })
//   .catch(err=>console.log(err));
// }

// exports.postEditProduct = (req,res,next)=>{
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;
//   const product = new Product(
//     updatedTitle,updatedPrice,updatedDesc,updatedImageUrl, prodId
//   );
//   product
//   .save()
//    .then(result=>{
//     console.log("Product updated!!");
//     res.redirect("/admin/products");
//   })
//   .catch(err =>console.log(err));
// }

// exports.postDeleteProduct=(req,res,next)=>{
//   const prodId = req.body.productId;
//   Product.deleteById(prodId)
//  .then(()=>{
//    console.log('Product deleted!!');
//    res.redirect('/admin/products')
//  })
//  .catch()
// }