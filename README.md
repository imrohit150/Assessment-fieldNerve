# Installation Process

## Prerequisites

- Node.js 18 or later
- npm

## Steps To Run Locally

### 1. Open the project folder

Open the project in your terminal:

```bash
cd vendor-management-system
```

### 2. Install dependencies

Run:

```bash
npm install
```

### 3. Start the local mock API

Run:

```bash
npm run api
```

This starts the mock API on:

```bash
http://localhost:4000
```

Keep this terminal running.

### 4. Start the frontend application

Open a second terminal in the same project folder and run:

```bash
npm run dev
```

Vite will show a local development URL, usually:

```bash
http://localhost:5173
```

Open that URL in your browser.

## Features Available

- Dashboard
- Vendor Directory
- Search, sorting, and pagination in the directory
- Vendor Details page
- Vendor Performance page
- Add Vendor drawer with form

## Notes

- The application uses a local mock API for assessment purposes.
- Both the API and frontend must be running at the same time.
- If `localhost:5173` is busy, Vite may start on another port. Use the URL shown in the terminal.

## Quick Run Summary

Terminal 1:

```bash
npm install
npm run api
```

Terminal 2:

```bash
npm run dev
```
