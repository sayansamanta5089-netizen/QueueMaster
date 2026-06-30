import { Router } from "express";
import { CustomerController } from "../controllers/customerController";
import { validateCustomer } from "../middleware/validationMiddleware";

const router = Router();

// Retrieve all queue customers
router.get("/", CustomerController.getCustomers);

// Add a customer to the queue with validation
router.post("/", validateCustomer, CustomerController.addCustomer);

// Mark a customer as being served
router.put("/:id/serve", CustomerController.serveCustomer);

// Mark a customer as completed
router.put("/:id/complete", CustomerController.completeCustomer);

// Remove a customer from the queue
router.delete("/:id", CustomerController.deleteCustomer);

export default router;
