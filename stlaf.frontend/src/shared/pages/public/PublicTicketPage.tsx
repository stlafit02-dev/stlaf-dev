import { Box, Grid, Paper, Typography, Chip, Stack } from "@mui/material";

import PublicTicketForm from "../../components/public/PublicTicketForm";
import PublicTicketTable from "../../components/public/PublicTicketTable";
import { useDashboard } from "../../hooks/useDashboard";

import logo from "../../../assets/stlaf.png";

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
        py: 4,
        px: {
          xs: 2,
          sm: 3,
          lg: 4,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1450,
          mx: "auto",
        }}
      >
        {/* Header */}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          mb={4}
        >
          <Box
            component="img"
            src={logo}
            alt="STLAF"
            sx={{
              width: {
                xs: 130,
                sm: 160,
                md: 180,
              },
              height: "auto",
            }}
          />

          <Stack
            spacing={0.5}
            textAlign={{
              xs: "center",
              sm: "left",
            }}
          >
            <Typography
              variant="h3"
              fontWeight={700}
              color="#1A2634"
            >
              IT Helpdesk
            </Typography>

            <Typography
              color="text.secondary"
              fontSize={16}
            >
              Submit an IT request and monitor live ticket updates.
            </Typography>
          </Stack>
        </Stack>

        {/* Dashboard */}

        <Grid container spacing={2.5} mb={4}>
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
                  height: 120,
                  p: 2.5,
                  borderRadius: 2,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 2px 10px rgba(15,23,42,.05)",
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  height="100%"
                >
                  <Chip
                    label={card.title}
                    size="small"
                    sx={{
                      alignSelf: "flex-start",
                      bgcolor: card.bg,
                      color: card.color,
                      fontWeight: 700,
                    }}
                  />

                  <Box
                    flex={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      sx={{
                        fontSize: 42,
                        fontWeight: 700,
                        color: "#1E293B",
                      }}
                    >
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
          {/* Form */}

          <Grid
            size={{
              xs: 12,
              md: 5,
              lg: 3.5,
            }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                height: {
                  xs: "auto",
                  lg: 640,
                },
                boxShadow: "0 4px 14px rgba(15,23,42,.08)",
              }}
            >
              <PublicTicketForm />
            </Paper>
          </Grid>

          {/* Table */}

          <Grid
            size={{
              xs: 12,
              md: 7,
              lg: 8.5,
            }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                height: {
                  xs: "auto",
                  lg: 640,
                },
                boxShadow: "0 4px 14px rgba(15,23,42,.08)",
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