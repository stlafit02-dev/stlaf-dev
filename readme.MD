# STLAF Internal IT Ticketing System

A full-stack Internal IT Helpdesk and Asset Management System built for STLAF.

## Tech Stack

### Backend
- ASP.NET Core 10 Web API
- Entity Framework Core
- PostgreSQL (Supabase)
- AutoMapper
- JWT Authentication
- BCrypt Password Hashing
- Swagger / OpenAPI

### Frontend
- React
- TypeScript
- Vite
- Material UI (MUI)
- React Router DOM
- Axios
- TanStack React Query

---

# Backend Packages

```bash
Microsoft.EntityFrameworkCore
Microsoft.EntityFrameworkCore.Design
Npgsql.EntityFrameworkCore.PostgreSQL
AutoMapper
AutoMapper.Extensions.Microsoft.DependencyInjection
Microsoft.AspNetCore.Authentication.JwtBearer
Microsoft.AspNetCore.Identity
Swashbuckle.AspNetCore
```

---

# Frontend Packages

```bash
npm install

react
react-dom
typescript
vite

@mui/material
@mui/icons-material
@mui/x-data-grid
@emotion/react
@emotion/styled

react-router-dom

axios

@tanstack/react-query

react-hook-form

zod
```

---

# Project Structure

## Backend

```
STLAF.API
│
├── Controllers
│      AuthController
│      TicketController
│      UserController
│
├── DTOs
│      Ticket
│      User
│      Asset
│
├── Interfaces
│      Services
│
├── Services
│
├── Models
│
├── Mappings
│
├── Enums
│
├── Common
│
├── Data
│
└── Program.cs
```

---

## Frontend

```
src
│
├── api
│      axios.ts
│      ticketApi.ts
│      userApi.ts
│
├── components
│      tickets
│            TicketTable.tsx
│            TicketDetailsDialog.tsx
│
├── hooks
│      useTickets.ts
│      useUsers.ts
│      useUpdateTicket.ts
│
├── pages
│      TicketsPage.tsx
│
├── types
│      ticket.ts
│      user.ts
│
└── App.tsx
```

---

# Features Completed

## Authentication

- JWT Login
- Password Hashing
- Protected APIs

---

## Ticket Module

### Create Ticket

- Name
- Company Email
- Viber Number
- Description
- Category
- Priority

---

### Ticket List

- Server Side Pagination
- Search
- Filter Status
- Filter Priority

---

### Ticket Details Dialog

Replaced separate Edit Page with a Modal.

### Read Only

- Requester Information
- Description
- Category
- Priority

### Editable

- Status
- Assigned To

---

### Ticket Update

Updates

- Status
- Assigned User

---

### Ticket Assignment

Dynamic users loaded from API.

```
GET /api/User
```

Dropdown displays

```
FirstName LastName
```

while saving

```
AssignedToId
```

---

## Ticket Table

Clickable rows.

Removed

- View Button
- Edit Button
- Delete Button

Clicking any row opens the Ticket Details Dialog.

---

## UI Improvements

- Material UI
- Modern Modal Layout
- Vertical Sections
- Close button (X)
- Responsive
- Chips for Priority
- Chips for Status

---

# Backend APIs

## Authentication

```
POST /api/Auth/login
POST /api/Auth/register
```

---

## Tickets

```
GET /api/Ticket
GET /api/Ticket/{id}

POST /api/Ticket

PUT /api/Ticket/{id}

DELETE /api/Ticket/{id}
```

---

## Users

```
GET /api/User
```

Returns

```json
[
    {
        "userId":"",
        "firstName":"",
        "lastName":"",
        "email":"",
        "role":""
    }
]
```

---

# Ticket DTO

```csharp
TicketDto

TicketId
TicketNumber

Name
CompanyEmail
ViberNumber

Description

Category

Priority

Status

AssignedToId

AssignedTo

DateSubmitted
```

---

# React Query Hooks

Implemented

```
useTickets()

useUsers()

useUpdateTicket()
```

Future

```
useCreateTicket()

useDeleteTicket()

useDashboard()

useComments()

useHistory()
```

---

# Current Progress

## Backend

✅ Authentication

✅ JWT

✅ User API

✅ Ticket CRUD

✅ Ticket Assignment

✅ AutoMapper

✅ Pagination

✅ Filtering

✅ PostgreSQL

---

## Frontend

✅ Login

✅ Ticket List

✅ Ticket Details Dialog

✅ Update Ticket

✅ Assign User

✅ Search

✅ Filters

✅ Server Pagination

---

# Database

Main Tables

```
Users

Tickets

Assets

TicketComments

TicketHistory
```

---

# Current Workflow

```
User

↓

Create Ticket

↓

Ticket appears in List

↓

IT clicks Ticket

↓

Dialog opens

↓

Update Status

↓

Assign User

↓

Save Changes

↓

Database Updated
```

---

# Next Development Roadmap

## Phase 2

### Ticket History

Track every update.

Example

```
Created

Assigned

Status Changed

Priority Changed

Resolved
```

---

### Ticket Comments

Internal discussion.

```
John

Desktop won't boot.

----------------

Admin

Please restart.

----------------

John

Still not working.
```

---

### Dashboard

Cards

```
Open Tickets

In Progress

Resolved

Closed
```

Charts

- Monthly Tickets
- Tickets by Category
- Tickets by Priority

---

### Delete Confirmation

Instead of instant delete.

```
Delete Ticket?

Cancel

Delete
```

---

### Toast Notifications

Success

```
Ticket Updated
```

Error

```
Update Failed
```

---

### Loading Skeletons

Instead of blank loading screens.

---

### Role Permissions

Admin

- Users
- Assets
- Tickets
- Dashboard

IT Support

- Dashboard
- Tickets

Employee

- My Tickets

---

### Asset Integration

Link tickets with company assets.

Example

```
Ticket

↓

Employee

↓

Assigned Asset

↓

Department
```

---

# Future Modules

- Asset Management
- Borrowing System
- Maintenance Logs
- Inventory
- Audit Logs
- Email Notifications
- Dashboard Analytics
- Reports
- Export Excel/PDF
- Activity Timeline
- Dark Mode

---

# Run Backend

```bash
dotnet restore

dotnet ef database update

dotnet run
```

Runs on

```
http://localhost:5096
```

---

# Run Frontend

```bash
npm install

npm run dev
```

Runs on

```
http://localhost:5173
```

---

# Notes

When continuing development:

1. Start Backend
2. Start Frontend
3. Login
4. Test Ticket CRUD
5. Continue with Ticket History
6. Then Ticket Comments
7. Then Dashboard
8. Then Asset Integration

---

# Recommended Next Feature

⭐ Ticket History

Followed by

⭐ Ticket Comments

These two features will make the system behave like a professional helpdesk platform similar to Jira, Freshservice, or Zendesk.