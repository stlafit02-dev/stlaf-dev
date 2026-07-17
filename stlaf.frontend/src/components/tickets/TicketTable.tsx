import { Chip, Paper } from "@mui/material";
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
      field: "ticketId",
      headerName: "Ticket No.",
      width: 150,
      sortable: false,
      renderCell: ({ value }) => (
        <strong>#{String(value).substring(0, 8).toUpperCase()}</strong>
      ),
    },

    {
      field: "name",
      headerName: "Requester",
      flex: 1,
      minWidth: 180,
    },

    {
      field: "companyEmail",
      headerName: "Company Email",
      flex: 1.5,
      minWidth: 240,
    },

    {
      field: "priority",
      headerName: "Priority",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: ({ value }) => {
        const color =
          value === "High"
            ? "error"
            : value === "Medium"
            ? "warning"
            : "success";

        return (
          <Chip
            label={value}
            color={color}
            size="small"
            variant="filled"
          />
        );
      },
    },

    {
      field: "status",
      headerName: "Status",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: ({ value }) => {
        let color:
          | "default"
          | "primary"
          | "warning"
          | "success"
          | "error" = "default";

        switch (value) {
          case "Open":
            color = "primary";
            break;

          case "InProgress":
            color = "warning";
            break;

          case "Resolved":
            color = "success";
            break;

          case "Closed":
            color = "default";
            break;

          default:
            color = "default";
        }

        return (
          <Chip
            label={value}
            color={color}
            size="small"
            variant="filled"
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
        overflow: "hidden",
        borderRadius: 2,
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
        rowHeight={60}
        columnHeaderHeight={58}
        onRowClick={(params) => onView(params.row)}
        sx={{
          border: 0,

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#1A2634",
            borderBottom: "2px solid #CCAA49",
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 700,
            color: "#000000",
          },

          "& .MuiDataGrid-columnSeparator": {
            color: "#3A4A5E",
          },

          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #ECECEC",
            display: "flex",
            alignItems: "center",
          },

          "& .MuiDataGrid-row": {
            transition: "background-color .2s ease",
          },

          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#F7F9FC",
            cursor: "pointer",
          },

          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #E0E0E0",
          },
        }}
      />
    </Paper>
  );
}