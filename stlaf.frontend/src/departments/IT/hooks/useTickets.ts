import { useQuery } from "@tanstack/react-query";
import { getTickets, getPublicTickets } from "../api/ticketApi";
import type { TicketQuery } from "../types/ticket";

export function useTickets(query: TicketQuery) {
  return useQuery({
    queryKey: ["tickets", query],
    queryFn: () => getTickets(query),
  });
}
export function usePublicTickets() {
  return useQuery({
    queryKey: ["publicTickets"],
    queryFn: getPublicTickets,

    // auto refresh for other users
    refetchInterval: 3000,

    refetchOnWindowFocus: true,
  });
}
