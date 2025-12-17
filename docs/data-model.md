# Data Model

## Overview

The SaaS Billing Platform uses a multi-tenant architecture with strict data isolation. Each tenant has their own set of users, usage events, and invoices.

## Core Entities

### Tenant
Represents a customer organization using the platform.

**Fields:**
- `id` (UUID): Unique identifier
- `name` (String): Company name
- `email` (String): Primary contact email
- `stripeCustomerId` (String, optional): Stripe customer ID for payment processing
- `planId` (UUID, optional): Reference to active pricing plan
- `createdAt`, `updatedAt` (DateTime): Timestamps

**Relationships:**
- Has many Users
- Has many UsageEvents
- Has many Invoices
- Belongs to one PricingPlan (optional)

### User
Represents an individual user within a tenant organization.

**Fields:**
- `id` (UUID): Unique identifier
- `email` (String): User email (unique)
- `password` (String): Hashed password
- `name` (String, optional): Display name
- `role` (Enum): ADMIN | FINANCE | CUSTOMER
- `tenantId` (UUID): Reference to tenant
- `createdAt`, `updatedAt` (DateTime): Timestamps

**Relationships:**
- Belongs to one Tenant

### PricingPlan
Defines pricing tiers and usage limits.

**Fields:**
- `id` (UUID): Unique identifier
- `name` (String): Plan name (e.g., "Pro", "Enterprise")
- `description` (String, optional): Plan description
- `type` (Enum): METERED | TIERED | FREEMIUM
- `basePrice` (Decimal): Monthly base fee
- `includedUnits` (Int): Free tier usage units
- `overageRate` (Decimal): Cost per unit over limit
- `createdAt`, `updatedAt` (DateTime): Timestamps

**Relationships:**
- Has many Tenants

### UsageEvent
Records individual usage events for billing calculation.

**Fields:**
- `id` (UUID): Unique identifier
- `tenantId` (UUID): Reference to tenant
- `eventType` (String): Type of usage (e.g., "api_call", "storage_gb")
- `quantity` (Int): Amount consumed
- `timestamp` (DateTime): When the event occurred
- `processed` (Boolean): Whether event has been billed
- `idempotencyKey` (String, optional): For deduplication
- `createdAt` (DateTime): Record creation time

**Relationships:**
- Belongs to one Tenant

### Invoice
Represents a billing invoice for a period.

**Fields:**
- `id` (UUID): Unique identifier
- `tenantId` (UUID): Reference to tenant
- `amount` (Decimal): Total invoice amount
- `status` (Enum): DRAFT | PENDING | PAID | VOID | FAILED
- `billingStart` (DateTime): Period start date
- `billingEnd` (DateTime): Period end date
- `createdAt`, `updatedAt` (DateTime): Timestamps

**Relationships:**
- Belongs to one Tenant
- Has many InvoiceItems

### InvoiceItem
Line items within an invoice.

**Fields:**
- `id` (UUID): Unique identifier
- `invoiceId` (UUID): Reference to invoice
- `description` (String): Item description
- `quantity` (Int): Number of units
- `unitPrice` (Decimal): Price per unit
- `total` (Decimal): Line item total

**Relationships:**
- Belongs to one Invoice

## Multi-Tenancy Strategy

**Data Isolation:**
- All queries filter by `tenantId` from JWT token
- Middleware enforces tenant context on all authenticated requests
- Database-level foreign keys prevent cross-tenant data access

**Security:**
- Row-level security through application logic
- JWT tokens contain `tenantId` claim
- RBAC middleware enforces role-based permissions
