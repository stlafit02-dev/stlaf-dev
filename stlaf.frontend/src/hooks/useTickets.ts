import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../api/ticketApi";
import type { TicketQuery } from "../types/ticket";

export function useTickets(query: TicketQuery) {
  return useQuery({
    queryKey: ["tickets", query],
    queryFn: () => getTickets(query),
  });
}