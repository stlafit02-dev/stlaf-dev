import { Chip, Paper, Typography, Box } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid";

import type { TicketDto } from "../../types/ticket";

interface Props {
  tickets: TicketDto[];
  loading: boolean;
  totalRecords: number;
  paginationModel: GridPaginationModel;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  onView: (ticket: TicketDto) => void;
}

export default function TicketTable({
  tickets,
  loading,
  totalRecords,
  paginationModel,
  onPaginationModelChange,
  onView,
}: Props) {
  const columns: GridColDef[] = [
    {
      field: "ticketNumber",
      headerName: "Ticket ID",
      width: 150,
      sortable: false,
    },

    {
      field: "name",
      headerName: "Requester",
      width: 220,
      sortable: false,
      renderCell: ({ row }) => (
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 13,
              color: "#1F2937",
              lineHeight: 1.2,
            }}
          >
            {row.name}
          </Typography>

          <Typography
            sx={{
              fontSize: 11,
              color: "#94A3B8",
            }}
          >
            {row.companyEmail}
          </Typography>
        </Box>
      ),
    },

    {
      field: "description",
      headerName: "Description",
      flex: 1,
      minWidth: 350,
      sortable: false,
      renderCell: ({ value }) => (
        <Typography
          noWrap
          sx={{
            fontSize: 13,
            color: "#475569",
            width: "100%",
          }}
        >
          {value}
        </Typography>
      ),
    },

    {
      field: "priority",
      headerName: "Priority",
      width: 120,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: ({ value }) => {
        const styles: Record<string, any> = {
          Low: {
            bgcolor: "#DCFCE7",
            color: "#166534",
          },
          Medium: {
            bgcolor: "#FEF3C7",
            color: "#92400E",
          },
          High: {
            bgcolor: "#FFF7ED",
            color: "#C2410C",
          },
          Urgent: {
            bgcolor: "#FEE2E2",
            color: "#B91C1C",
          },
        };

        // Fallback style if value is missing/unmatched
        const activeStyle = styles[value] || {
          bgcolor: "#F1F5F9",
          color: "#475569",
        };

        return (
          <Chip
            label={value}
            size="small"
            sx={{
              height: 24,
              fontWeight: 600,
              fontSize: 11,
              borderRadius: 2,
              ...activeStyle,
            }}
          />
        );
      },
    },

    {
      field: "status",
      headerName: "Status",
      width: 140,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: ({ value }) => {
        const styles: Record<string, any> = {
          Open: {
            bgcolor: "#DBEAFE",
            color: "#2563EB",
          },
          InProgress: {
            bgcolor: "#FFF7ED",
            color: "#EA580C",
          },
          OnHold: {
            bgcolor: "#FEF3C7",
            color: "#D97706",
          },
          Resolved: {
            bgcolor: "#DCFCE7",
            color: "#15803D",
          },
          Closed: {
            bgcolor: "#E2E8F0",
            color: "#64748B",
          },
        };

        // Fallback style if value is missing/unmatched
        const activeStyle = styles[value] || {
          bgcolor: "#F1F5F9",
          color: "#475569",
        };

        const displayStatus =
          value === "InProgress"
            ? "In Progress"
            : value === "OnHold"
              ? "On Hold"
              : value;

        return (
          <Chip
            label={displayStatus}
            size="small"
            sx={{
              height: 24,
              fontWeight: 600,
              fontSize: 11,
              borderRadius: 2,
              ...activeStyle,
            }}
          />
        );
      },
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        height: 700,
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      <DataGrid
        rows={tickets}
        columns={columns}
        getRowId={(row) => row.ticketId}
        loading={loading}
        disableRowSelectionOnClick
        disableColumnMenu
        pagination
        paginationMode="server"
        rowCount={totalRecords}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={[10, 25, 50]}
        rowHeight={54}
        columnHeaderHeight={54}
        onRowClick={(params) => onView(params.row)}
        sx={{
          height: "100%",
          border: 0,

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#FFFFFF",
            borderBottom: "2px solid #CCAA49",
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 700,
            fontSize: 13,
            color: "#111827",
          },

          "& .MuiDataGrid-columnSeparator": {
            color: "#CBD5E1",
          },

          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #ECECEC",
            display: "flex",
            alignItems: "center",
            fontSize: 13,
          },

          "& .MuiDataGrid-row": {
            transition: "background .2s ease",
          },

          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#F8FAFC",
            cursor: "pointer",
          },

          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #E2E8F0",
          },
        }}
      />
    </Paper>
  );
}
