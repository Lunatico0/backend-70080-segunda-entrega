import { Router } from "express";
import ProductManager from '../manager/product-manager.js';
const manager = new ProductManager('./src/data/products.json');
const router = Router();

router.get("/", async (req, res) => {
  const limit = req.query.limit
  try {
    const products = await manager.getProducts();
    if (limit) {
      res.send(products.slice(0, limit));
    } else {
      res.send(products);
    }
  } catch (error) {
    console.log(error)
  }
});

router.get("/:pid", async (req, res) => {
  let id = req.params.pid;
  const producto = await manager.getProductsById(parseInt(id));

  if (!producto) {
    res.send("No se encuentra el producto deseado");
  } else {
    res.send({ producto });
  };
});

router.post("/", async (req, res) => {
  const newProduct = req.body;
  try {
    await manager.addProduct(newProduct);
    res.status(201).send({ message: "Producto agregado exitosamente", newProduct });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const newData = req.body;
  const updatedProduct = await manager.updateProduct(parseInt(id), newData);

  if (!updatedProduct) {
    res.status(404).send({ message: "Error al actualizar el producto" });
  } else {
    res.status(200).send(`Se ha actualizado el producto ${newData.title} correctamente`);
  }
});

router.delete("/:pid", async (req, res) => {
  const id = req.params.pid;
  const deletedProd = await manager.deleteProduct(parseInt(id));

  if (!deletedProd) {
    res.status(404).send({ message: "Error al eliminar el producto", error: "Producto no encontrado" });
  } else {
    res.status(200).send(`Se ha eliminado ${deletedProd.title} correctamente`);
  }
});

export default router;