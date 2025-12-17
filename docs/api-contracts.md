# API Documentation

Base URL: `http://localhost:4000/api`

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

### POST /auth/register
Create a new tenant and admin user.

**Request Body:**
```json
{
  "companyName": "Acme Corp",
  "email": "admin@acme.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "admin@acme.com",
    "role": "ADMIN"
  }
}
```

### POST /auth/login
Authenticate existing user.

**Request Body:**
```json
{
  "email": "admin@acme.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "admin@acme.com",
    "role": "ADMIN"
  }
}
```

## Usage Tracking

### POST /usage/ingest
Record a usage event (authenticated).

**Request Body:**
```json
{
  "eventType": "api_call",
  "quantity": 1,
  "idempotencyKey": "optional-unique-key"
}
```

**Response:**
```json
{
  "message": "Event accepted",
  "id": "event-uuid"
}
```

### GET /usage/summary
Get usage summary for current tenant (authenticated).

**Response:**
```json
[
  {
    "eventType": "api_call",
    "_sum": {
      "quantity": 125000
    }
  }
]
```

## Pricing Plans

### GET /pricing/plans
List all pricing plans (authenticated).

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Pro",
    "type": "METERED",
    "basePrice": "299.00",
    "includedUnits": 100000,
    "overageRate": "0.01"
  }
]
```

### POST /pricing/plans
Create a new pricing plan (Admin only).

**Request Body:**
```json
{
  "name": "Enterprise",
  "description": "For large teams",
  "type": "TIERED",
  "basePrice": 999.00,
  "includedUnits": 500000,
  "overageRate": 0.005
}
```

## Invoices

### GET /invoices
List invoices for current tenant (authenticated).

**Response:**
```json
[
  {
    "id": "uuid",
    "amount": "450.00",
    "status": "PAID",
    "billingStart": "2023-10-01T00:00:00Z",
    "billingEnd": "2023-10-31T23:59:59Z",
    "items": [
      {
        "description": "API Usage",
        "quantity": 150000,
        "unitPrice": "0.01",
        "total": "450.00"
      }
    ]
  }
]
```

### GET /invoices/:id
Get single invoice details (authenticated).

**Response:**
```json
{
  "id": "uuid",
  "amount": "450.00",
  "status": "PAID",
  "billingStart": "2023-10-01T00:00:00Z",
  "billingEnd": "2023-10-31T23:59:59Z",
  "items": [...]
}
```

### POST /invoices/generate
Generate invoice for a tenant (Admin/Finance only).

**Request Body:**
```json
{
  "tenantId": "uuid",
  "billingStart": "2023-11-01T00:00:00Z",
  "billingEnd": "2023-11-30T23:59:59Z"
}
```

**Response:**
```json
{
  "id": "uuid",
  "amount": "520.00",
  "status": "PENDING",
  "items": [...]
}
```

## Error Responses

All endpoints may return these error codes:

- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error
