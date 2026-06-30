import db from "../database/db";

export interface Customer {
  id: number;
  name: string;
  status: "Waiting" | "Being Served" | "Completed";
  createdAt: string;
}

export const CustomerModel = {
  // Get all customers sorted by creation (FIFO order)
  getAll(): Customer[] {
    const stmt = db.prepare("SELECT * FROM customers ORDER BY id ASC");
    return stmt.all() as Customer[];
  },

  // Get a single customer by id
  getById(id: number): Customer | null {
    const stmt = db.prepare("SELECT * FROM customers WHERE id = ?");
    return (stmt.get(id) as Customer) || null;
  },

  // Get the customer who is currently "Being Served" (only one allowed at a time)
  getBeingServed(): Customer | null {
    const stmt = db.prepare("SELECT * FROM customers WHERE status = 'Being Served'");
    return (stmt.get() as Customer) || null;
  },

  // Create a new customer
  create(name: string): Customer {
    const status = "Waiting";
    const createdAt = new Date().toISOString();
    const stmt = db.prepare(
      "INSERT INTO customers (name, status, createdAt) VALUES (?, ?, ?)"
    );
    const info = stmt.run(name, status, createdAt);
    
    return {
      id: Number(info.lastInsertRowid),
      name,
      status,
      createdAt,
    };
  },

  // Update a customer's status
  updateStatus(id: number, status: "Waiting" | "Being Served" | "Completed"): boolean {
    const stmt = db.prepare("UPDATE customers SET status = ? WHERE id = ?");
    const info = stmt.run(status, id);
    return info.changes > 0;
  },

  // Permanently delete a customer
  delete(id: number): boolean {
    const stmt = db.prepare("DELETE FROM customers WHERE id = ?");
    const info = stmt.run(id);
    return info.changes > 0;
  },
};
