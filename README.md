# Mission Control Telemetry Monitor

A full-stack system status dashboard built to display real-time simulated telemetry metrics.

## Tech Stack
- **Backend:** C# (.NET 8 Minimal API), REST APIs
- **Frontend:** TypeScript, React, Vite

## How to Run Locally

### 1. Start the C# Backend
```bash
cd TelemetryBackend
dotnet run
```
### 2. Start the TypeScript Frontend (in a new terminal)
```bash
cd telemetry-frontend
npx pnpm install
npx pnpm dev
```
### 3. Open up the local host links and see the result.
example (Replace the '####" with the actual port)
```bash
http://localhost/####/api/telemetry
http://localhost/####/
```
