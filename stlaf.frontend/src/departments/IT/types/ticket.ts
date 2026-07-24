export interface TicketDto {
  ticketId: string;
  ticketNumber: string;
  name: string;
  companyEmail: string;
  viberNumber: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  assignedToId?: string | null;
  assignedTo?: string | null;
  dateSubmitted: string;
}

export interface PublicTicketDto {
  ticketNumber: string;
  dateSubmitted: string;
  department: string;
  description: string;
  status: string;
  priority: string;
}

export interface PaginatedResult<T> {
  data: T[];
  totalRecords: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

export interface TicketQuery {
  search?: string;
  status?: string;
  priority?: string;
  assignedTo?: string;
  sortBy?: string;
  descending?: boolean;
  page: number;
  pageSize: number;
}
