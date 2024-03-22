# # Telecom Customer Management System

This is a web application designed to manage telecom mobility customers. It provides functionalities for registering new customers, choosing plans, renewing plans, upgrading/downgrading plans, and displaying customer details in a table.

## Technologies Used

- 
- Backend: Node.js with Express for REST APIs
- Database: MongoDB

## Installation

1. Clone this repository:
   
   ```bash
   git clone 
   ```

## Backend APIs

### Register New Customer

- **URL:** `/api/customers/register`

- **Method:** `POST`

- **Request Body:**
  
  jsonCopy code
  
  `{   "name": "Customer Name",   "dob": "YYYY-MM-DD",   "email": "customer@example.com",   "adharNumber": "123456789012",   "assignedMobileNumber": "1234567890",   "plan": {     "name": "Plan Name",     "cost": 499,     "validity": 365,     "status": "Active"   } }`

- **Response:** Newly registered customer object

### Choose New Plan

- **URL:** `/api/customers/choose-plan`

- **Method:** `POST`

- **Request Body:**
  
  jsonCopy code
  
  `{   "customerId": "customer_id",   "plan": {     "name": "New Plan Name",     "cost": 299,     "validity": 180,     "status": "Active"   } }`

- **Response:** Updated customer object with the new plan

### Renew Plan

- **URL:** `/api/customers/renew-plan`

- **Method:** `POST`

- **Request Body:**
  
  jsonCopy code
  
  `{   "customerId": "customer_id",   "renewalDate": "YYYY-MM-DD",   "planStatus": "Active" }`

- **Response:** Updated customer object with renewed plan details

### Upgrade/Downgrade Plan

- **URL:** `/api/customers/change-plan`

- **Method:** `POST`

- **Request Body:**
  
  jsonCopy code
  
  `{   "customerId": "customer_id",   "newPlan": {     "name": "New Plan Name",     "cost": 199,     "validity": 90,     "status": "Active"   } }`

- **Response:** Updated customer object with the new plan

### Display Customer Table

- **URL:** `/api/customers`
- **Method:** `GET`
- **Response:** Array of customer objects
