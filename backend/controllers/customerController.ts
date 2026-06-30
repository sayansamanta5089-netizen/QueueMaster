import { Request, Response, NextFunction } from "express";
import { CustomerModel } from "../models/customerModel";

export const CustomerController = {
  // GET /api/customers
  getCustomers(req: Request, res: Response, next: NextFunction): void {
    try {
      const customers = CustomerModel.getAll();
      res.status(200).json(customers);
    } catch (error) {
      next(error);
    }
  },

  // POST /api/customers
  addCustomer(req: Request, res: Response, next: NextFunction): void {
    try {
      const { name } = req.body;
      const newCustomer = CustomerModel.create(name);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/customers/:id/serve
  serveCustomer(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid customer ID." });
        return;
      }

      const customer = CustomerModel.getById(id);
      if (!customer) {
        res.status(404).json({ error: "Customer not found." });
        return;
      }

      if (customer.status !== "Waiting") {
        res.status(400).json({
          error: `Only 'Waiting' customers can be served. Current status: ${customer.status}`,
        });
        return;
      }

      // Business Rule: Only one customer can be in "Being Served" status at a time
      const currentlyServed = CustomerModel.getBeingServed();
      if (currentlyServed) {
        res.status(400).json({
          error: `Another customer (${currentlyServed.name}) is currently being served. Please complete their session before serving a new customer.`,
        });
        return;
      }

      CustomerModel.updateStatus(id, "Being Served");
      const updatedCustomer = CustomerModel.getById(id);
      res.status(200).json(updatedCustomer);
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/customers/:id/complete
  completeCustomer(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid customer ID." });
        return;
      }

      const customer = CustomerModel.getById(id);
      if (!customer) {
        res.status(404).json({ error: "Customer not found." });
        return;
      }

      if (customer.status !== "Being Served") {
        res.status(400).json({
          error: `Only 'Being Served' customers can be marked as completed. Current status: ${customer.status}`,
        });
        return;
      }

      CustomerModel.updateStatus(id, "Completed");
      const updatedCustomer = CustomerModel.getById(id);
      res.status(200).json(updatedCustomer);
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/customers/:id
  deleteCustomer(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid customer ID." });
        return;
      }

      const customer = CustomerModel.getById(id);
      if (!customer) {
        res.status(404).json({ error: "Customer not found." });
        return;
      }

      CustomerModel.delete(id);
      res.status(200).json({
        message: "Customer successfully removed from queue.",
        id,
      });
    } catch (error) {
      next(error);
    }
  },
};
