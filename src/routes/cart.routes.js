import { Router } from "express";
import Cartmanager from "../manager/cart-manager.js";

const cartManager = new Cartmanager('./src/data/carts.json');

const router = Router();

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  
  try {
    const cart = await cartManager.getCartById(parseInt(cid));
    
    if (!cart) {
      
      return res.status(404).send({ message: "Carrito no encontrado" });
      
    } 
    return res.status(200).send({ message: "Carrito encontrado", cart });
    
  } catch (error) {
    
    return res.status(500).send({ message: "Error al buscar el carrito" });
  };
});

router.post("/", async (req, res) => {  
  try {
    const newCart = await cartManager.addCart();
    res.status(201).send({ message: "Carrito creado exitosamente", newCart });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
  
});

router.post("/:cid/products/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);

  try {
    const result = await cartManager.addProductToCart(cid, pid);
    console.log('result: ', result);

    if (!result) {

      return res.status(400).send({ message: "Error al agregar producto al carrito" });

    } else {

      return res.status(200).send({ message: "Producto agregado al carrito exitosamente", result });

    } 

  } catch (error) {
    console.log("Error al agregar producto al carrito: ", error);
    return res.status(500).send({ status: "error", error: error.message });

  };
});

export default router;