export interface TicketDashboardDto {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  onHoldTickets: number;
  resolvedTickets: number;
  closedTickets: number;
  urgentTickets: number;
  mediumTickets: number;
  lowTickets: number;
}