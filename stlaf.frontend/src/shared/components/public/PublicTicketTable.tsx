import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  CircularProgress,
  Box,
  TableContainer,
  Paper,
  Tooltip,
  TablePagination,
  Typography,
  Stack,
} from "@mui/material";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useState } from "react";
import { usePublicTickets } from "../../../departments/IT/hooks/useTickets";

export default function PublicTicketTable() {
  const { data = [], isLoading, error } = usePublicTickets();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          height: 520,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        Failed to load tickets.
      </Typography>
    );
  }

  const activeTickets = data.filter(
    (ticket) => ticket.status !== "Closed",
  );

  const paginatedTickets = activeTickets.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        mb={2}
      >
        <FiberManualRecordIcon
          sx={{
            color: "#22C55E",
            fontSize: 14,
            animation: "pulse 1.5s infinite",
            "@keyframes pulse": {
              "0%": {
                opacity: 1,
                transform: "scale(1)",
              },
              "50%": {
                opacity: 0.3,
                transform: "scale(1.4)",
              },
              "100%": {
                opacity: 1,
                transform: "scale(1)",
              },
            },
          }}
        />

        <Typography
          variant="h5"
          fontWeight={700}
          color="#1A2634"
        >
          Live Queue
        </Typography>
      </Stack>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: "1px solid #E5E7EB",
          borderRadius: 3,
          height: 520,
          overflow: "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  bgcolor: "#F8FAFC",
                }}
              >
                Ticket #
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  bgcolor: "#F8FAFC",
                }}
              >
                Date Submitted
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 700,
                  bgcolor: "#F8FAFC",
                }}
              >
                Description
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  bgcolor: "#F8FAFC",
                }}
              >
                Priority
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  bgcolor: "#F8FAFC",
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedTickets.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  sx={{ py: 10 }}
                >
                  <Typography
                    color="text.secondary"
                    fontWeight={600}
                    fontSize={16}
                  >
                    No tickets available.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedTickets.map((ticket) => (
                <TableRow hover key={ticket.ticketNumber}>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 700,
                      color: "#1A2364",
                    }}
                  >
                    {ticket.ticketNumber}
                  </TableCell>

                  <TableCell align="center">
                    {new Date(
                      ticket.dateSubmitted,
                    ).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <Tooltip
                      title={ticket.description}
                      arrow
                    >
                      <Typography
                        noWrap
                        sx={{
                          maxWidth: 320,
                          cursor: "pointer",
                        }}
                      >
                        {ticket.description}
                      </Typography>
                    </Tooltip>
                  </TableCell>

                  <TableCell align="center">
                    <Chip
                      label={ticket.priority}
                      size="small"
                      sx={{
                        fontWeight: 700,

                        bgcolor:
                          ticket.priority === "Low"
                            ? "#DCFCE7"
                            : ticket.priority === "Medium"
                              ? "#FEF3C7"
                              : ticket.priority === "High"
                                ? "#FFF7ED"
                                : "#FEE2E2",

                        color:
                          ticket.priority === "Low"
                            ? "#166534"
                            : ticket.priority === "Medium"
                              ? "#92400E"
                              : ticket.priority === "High"
                                ? "#C2410C"
                                : "#B91C1C",
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Chip
                      size="small"
                      label={
                        ticket.status === "InProgress"
                          ? "In Progress"
                          : ticket.status === "OnHold"
                            ? "On Hold"
                            : ticket.status
                      }
                      sx={{
                        fontWeight: 700,

                        bgcolor:
                          ticket.status === "Open"
                            ? "#DBEAFE"
                            : ticket.status === "InProgress"
                              ? "#FFF7ED"
                              : ticket.status === "OnHold"
                                ? "#F3E8FF"
                                : ticket.status === "Resolved"
                                  ? "#DCFCE7"
                                  : "#E2E8F0",

                        color:
                          ticket.status === "Open"
                            ? "#2563EB"
                            : ticket.status === "InProgress"
                              ? "#EA580C"
                              : ticket.status === "OnHold"
                                ? "#9333EA"
                                : ticket.status === "Resolved"
                                  ? "#059669"
                                  : "#64748B",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={activeTickets.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[30, 50, 100]}
      />
    </>
  );
}