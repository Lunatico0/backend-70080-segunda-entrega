import { Router } from 'express';
import ProductManager from '../manager/product-manager.js';
const manager = new ProductManager('./src/data/products.json');
const router = Router();

router.get('/', async (req, res) => {
  const products = await manager.getProducts();

  res.render('home', {products});
});

router.get("/realTimeProducts", async (req, res) => {
  const products = await manager.getProducts();
  res.render("realTimeProducts", { products });
})

export default router;