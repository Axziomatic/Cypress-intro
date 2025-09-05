# Nutrition Tracker

A simple nutrition tracking application built with **Next.js**, **TypeScript**, **Prisma**, and **MongoDB**.  
The app allows users to log their meals and track calories, protein, fat, and carbs throughout the day.  
It also includes progress bars, goal comparisons, and error handling for invalid input.

---

## Features

- Add, edit, and delete food entries
- Daily nutrition goals with progress indicators
- Warnings when goals are exceeded
- Basic form validation (no negative values, only numbers allowed)
- Integration with a MongoDB database via Prisma
- End-to-end testing with Cypress

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn
- A MongoDB instance (Atlas or local)

### Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd nutrition-tracker
npm install
```

## Database Setup

1. Configure your database connection in .env:

- DATABASE_URL="your-mongodb-connection-string"

2. Generate Prisma Client

- npx prisma generate

3. Run database migrations

- npx prisma migrate dev

## Running the App

Start the development server:

- npm run dev

The app will be available at http://localhost:3000

## Testing

This project uses Cypress for end-to-end testing
Run Cypress tests in headless mode:

-npm run test:e2e

Or open the Cypress UI

-npx cypress open

Tests cover:

- Creating, updating, and deleting food entries

- Displaying daily totals

- Showing warnings when exceeding nutrition goals

- Handling invalid input

## Build for Production

To build and start the app in production mode:

- npm run build
- npm run start

## Future Improvements

- User authentication

- Separate daily logs by date

- Export data as CSV or PDF
