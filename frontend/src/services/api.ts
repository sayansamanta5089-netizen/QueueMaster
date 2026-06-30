import axios from "axios";
import { Customer } from "../types";

// Base API route for customer resource
const API_BASE = "/api/customers";

export const api = {
  // Fetch all customers from the queue
  async getCustomers(): Promise<Customer[]> {
    const response = await axios.get<Customer[]>(API_BASE);
    return response.data;
  },

  // Create/add a new customer to the queue
  async addCustomer(name: string): Promise<Customer> {
    const response = await axios.post<Customer>(API_BASE, { name });
    return response.data;
  },

  // Move customer from "Waiting" to "Being Served"
  async serveCustomer(id: number): Promise<Customer> {
    const response = await axios.put<Customer>(`${API_BASE}/${id}/serve`);
    return response.data;
  },

  // Move customer from "Being Served" to "Completed"
  async completeCustomer(id: number): Promise<Customer> {
    const response = await axios.put<Customer>(`${API_BASE}/${id}/complete`);
    return response.data;
  },

  // Delete/remove customer permanently from the queue
  async deleteCustomer(id: number): Promise<{ id: number; message: string }> {
    const response = await axios.delete<{ id: number; message: string }>(`${API_BASE}/${id}`);
    return response.data;
  },
};
