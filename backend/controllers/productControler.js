const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
const APIFeature = require("../utils/apiFeatures");

//Create new product  =>  /api/v1/product/new

exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get all products => /api/v1/products?keyword=apple

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const productCount = await Product.countDocuments();
  const resPerPage = 4;

  const apiFeature = new APIFeature(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;
  let filteredProductsCount = products.length;

  apiFeature.pagination(resPerPage)
  products = await apiFeature.query// .pagination(resPerPage); // pagination(resPerPage);
  //
  // const products = await apiFeature.query;

  res
    .status(200)
    .json({
      success: true,
      count: products.length,
      productCount,
      products: products,
      filteredProductsCount,
      resPerPage,
    });
});

// Get single product => /api/v1/product/:id

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product: product,
  });
});

// Update product => /api/v1/product/:id

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product => /api/v1/product/:id

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product are removed",
  });
});

// Reviews for the product

// Create new review => api/v1/review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rew) => rew.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rew) => {
      if (rew.user.toString() === req.user._id.toString()) {
        rew.comment = comment;
        rew.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.numOfReviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review are saved",
  });
});

// Get product reviews => api/v1/reviews

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete review => /api/v1/reviews

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(
    (reviews) => reviews._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      numOfReviews,
      ratings,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "review are removed",
  });
});
