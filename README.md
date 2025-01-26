# Donation Collection System API

A NestJS-based REST API for donation collection system with user authentication.

## Prerequisites

- Node.js (v20 or higher)
- pnpm (v7 or higher)
- PostgreSQL (v14 or higher)

## Installation

```bash
# Install dependencies
pnpm install
```

## Environment Setup

Update a `development.env` file in the enviroments directory with the following variables:

```env
# Database
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=your_db_port
DB_USERNAME=your_db_user_name
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name
DB_SYNCHRONIZE=true
DB_LOGGING=false

```

## Running the Application

```bash
# Development mode
pnpm start:dev
```

After running the project, it will create super admin account.
Phone Number: `01621432377`
Password: `123456`

The application will be available at `http://localhost:5004`.

## API Documentation

Once the application is running, you can access the Swagger documentation at:
`http://localhost:4000/docs`

## Project Structure

```
src/
├── app/
│   └── modules/
│       └── donation/
│           ├── services/
│           │   ├── donation.service.ts
│           ├── entities/
│           │   └── donation.entity.ts
│           └── dtos/
│               └── donation.dto.ts
│       └── user/
│           ├── services/
│           │   ├── user.service.ts
│           ├── entities/
│           │   └── user.entity.ts
│           └── dtos/
```
