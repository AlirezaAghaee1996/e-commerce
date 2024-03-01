import  express  from "express";
import { addProduct, getAllProduct, getProduct, removeProduct, updateProduct } from "../controllers/productCn.js";
import { addProductMw } from "../middleware/addProductMw.js";

/**
 * @swagger 
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *          - name
 *          - images
 *          - price
 *          - shopkeeperId
 *          - categoryId
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of a product
 *         name:
 *           type: string
 *           description: The name of the product
 *         images:
 *           type: array
 *           description: array of base64 images string
 *         price:
 *           type: number
 *           format: double
 *           description: The price of the product
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: When the product was created
 *         updatedAt:
 *           format: date-time
 *           readOnly: true
 *           description: When the product was updated
 *         discountPrice:
 *           type: number
 *         shopkeeperId:
 *           type: string
 *           description: Shopkeeper's ID who own this product.
 *         categoryId:
 *           type: array
 *         quantity:
 *           type: number
 *         rating:
 *           type: array
 *           description: array of object  with userId and value(1 to 5)
 *         startDiscountDate:
 *           type: date
 *         endDiscountDate:
 *           type: date
 *         slug:
 *           type: string 
 *       example:
 *         id: 65abc1ed2ebbf52845d5e2bc
 *         name: women hoodie
 *         images: []
 *         price: 150
 *         shopkeeperId: 65abb47b28ea1a1aabad3a60
 *         categoryId: [65abc19975efcbc5daa4f06c]
 */

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API for products
 * /api/v1/product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200 (OK):
 *         description: An array of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                  $ref: '#/components/schemas/Product'
 *       500:
 *          description: Server error
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     parameters:
 *      - name: token
 *        in: headers
 *        required: true
 *        type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: some server error
 * /api/v1/product/{productId}:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     parameters:
 *      - name : productId
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200 (OK):
 *         description: An array of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                  $ref: '#/components/schemas/Product'
 *       500:
 *          description: Server error
 *   delete:
 *     summary: Create a new product
 *     tags: [Product]
 *     parameters:
 *      - name: token
 *        in: headers
 *        required: true
 *        type: string
 *      - name : productId
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: some server error
 *   patch:
 *     summary: update product
 *     tags: [Product]
 *     parameters:
 *      - name: token
 *        in: headers
 *        required: true
 *        type: string
 *      - name : productId
 *        in: path
 *        required: true
 *        type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: some server error
 *      
 * 
 */

const productRouter=express.Router()
productRouter.route('/').get(getAllProduct).post(addProductMw,addProduct)
productRouter.route('/:productId').get(getProduct).patch(addProductMw,updateProduct).delete(addProductMw,removeProduct)
export default productRouter

