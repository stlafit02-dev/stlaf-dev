import axios from "./axios";
import type { TicketDashboardDto } from "../types/dashboard";

export const getDashboard = async (): Promise<TicketDashboardDto> => {
  const response = await axios.get("/Ticket/dashboard");
  return response.data.data;
};