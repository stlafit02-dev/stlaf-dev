import { Box, Grid, Paper, Typography, Chip, Stack } from "@mui/material";

import PublicTicketForm from "../../components/public/PublicTicketForm";
import PublicTicketTable from "../../components/public/PublicTicketTable";
import { useDashboard } from "../../hooks/useDashboard";
import logo from "../../assets/stlaf.png";

export default function PublicTicketPage() {
  const { data, isLoading } = useDashboard();

  const stats = [
    {
      title: "OPEN",
      value: data?.openTickets ?? 0,
      color: "#2563EB",
      bg: "#DBEAFE",
    },
    {
      title: "IN PROGRESS",
      value: data?.inProgressTickets ?? 0,
      color: "#EA580C",
      bg: "#FFEDD5",
    },
    {
      title: "ON HOLD",
      value: data?.onHoldTickets ?? 0,
      color: "#9333EA",
      bg: "#F3E8FF",
    },
    {
      title: "RESOLVED",
      value: data?.resolvedTickets ?? 0,
      color: "#059669",
      bg: "#D1FAE5",
    },
    {
      title: "CLOSED",
      value: data?.closedTickets ?? 0,
      color: "#64748B",
      bg: "#E2E8F0",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#EEF3F8",
        p: {
          xs: 2,
          md: 4,
        },
      }}
    >
      <Box
        sx={{
          maxWidth: 1700,
          mx: "auto",
        }}
      >
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
          <Box
            component="img"
            src={logo}
            alt="STLAF IT Helpdesk"
            sx={{
              width: 180,
              height: "auto",
              objectFit: "contain",
            }}
          />

          <Stack>
            <Typography variant="h3" fontWeight={600}>
              IT Helpdesk
            </Typography>

            <Typography color="text.secondary">
              Submit an IT request and monitor live ticket updates.
            </Typography>
          </Stack>
        </Stack>

        {/* Dashboard Cards */}
        <Grid container spacing={2} mb={3}>
          {stats.map((card) => (
            <Grid
              key={card.title}
              size={{
                xs: 12,
                sm: 6,
                md: 2.4,
              }}
            >
              <Paper
                sx={{
                  p: 2.5,
                  borderRadius: 1,
                  border: "1px solid #E5E7EB",
                  boxShadow: "none",
                  height: 130,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Chip
                    label={card.title}
                    size="small"
                    sx={{
                      alignSelf: "flex-start",
                      bgcolor: card.bg,
                      color: card.color,
                      fontWeight: 700,
                      borderRadius: "999px",
                    }}
                  />

                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 48,
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {/* 3. The value will seamlessly jump to the new number when the background fetch completes */}
                      {isLoading ? "-" : card.value}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Create Ticket */}
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}
          >
            <Paper
              sx={{
                borderRadius: 1,
                p: 3,
                height: 650,
                boxShadow: "0 3px 12px rgba(0,0,0,.08)",
              }}
            >
              <PublicTicketForm />
            </Paper>
          </Grid>

          {/* Ticket Table */}
          <Grid
            size={{
              xs: 12,
              lg: 8,
            }}
          >
            <Paper
              sx={{
                borderRadius: 1,
                p: 3,
                height: 650,
                boxShadow: "0 3px 12px rgba(0,0,0,.08)",
              }}
            >
              <PublicTicketTable />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}