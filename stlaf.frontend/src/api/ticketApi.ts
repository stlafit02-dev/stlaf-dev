import axios from "./axios";
import type { TicketDto, TicketQuery, PaginatedResult } from "../types/ticket";

export interface UpdateTicketDto {
  status: string;
  assignedTo: string | null;
}

export interface PublicTicketDto {
  ticketNumber: string;
  department: string;
  description: string;
  status: string;
  priority: string;
  dateSubmitted: string;
}

export const getTickets = async (
  query: TicketQuery,
): Promise<PaginatedResult<TicketDto>> => {
  const response = await axios.get("/Ticket", {
    params: query,
  });

  return response.data.data;
};

export const getPublicTickets = async (): Promise<PublicTicketDto[]> => {
  const response = await axios.get("/Ticket/public");

  return response.data.data;
};

export const getTicket = async (id: string): Promise<TicketDto> => {
  const response = await axios.get(`/Ticket/${id}`);

  return response.data.data;
};

export const createTicket = async (payload: unknown) => {
  const response = await axios.post("/Ticket", payload);

  return response.data.data;
};

export const updateTicket = async (
  id: string,
  payload: UpdateTicketDto,
): Promise<TicketDto> => {
  const response = await axios.put(`/Ticket/${id}`, payload);

  return response.data.data;
};

export const deleteTicket = async (id: string) => {
  await axios.delete(`/Ticket/${id}`);
};
