export interface Customer {
  id: number;
  name: string;
  status: "Waiting" | "Being Served" | "Completed";
  createdAt: string;
}
