import Router from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middelware.js";
import { addProduct, removeProduct, getAllProducts, getProduct,addToCart, removeFromCart, getUserCart, getProductByCategory, searchProduct } from "../controllers/product.controller.js";
import {
  brandValidator,
  nameValidator,
  stockValidator,
  descriptionValidator,
  priceValidator,
  categoryValidator
} from "../utils/validators/product.validator.js";

const router = Router();


router.post(
  "/add-product",
  verifyJWT,
  upload.single('image'),
  nameValidator(),
  descriptionValidator(),
  stockValidator(),
  brandValidator(),
  priceValidator(),
  categoryValidator(),
  addProduct

);

router.post(
    "/remove-product/:productId",
    verifyJWT,
    removeProduct
)


router.get("/", verifyJWT ,getAllProducts);

router.get("/category",  getProductByCategory)

router.get("/:productId", getProduct);

router.post("/:productId/add-to-cart", verifyJWT , addToCart)

router.post("/:productId/remove-from-cart", verifyJWT , removeFromCart)

router.get("/:userId/:cartId", verifyJWT, getUserCart)

router.post("/search", searchProduct)


export default router;
