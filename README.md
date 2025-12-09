# LAB11 Week12: Angular CRUD + Laravel API

## Prerequisites

- Node.js 18+ and `npm`
- Angular CLI (`npm i -g @angular/cli`)
- PHP 8.2+, Composer
- MySQL running locally (create a database, e.g. `cruddb`)

## Backend (Laravel API)

1. `cd backend-laravel`
2. `composer install`
3. Copy env and configure DB:
   - `cp .env.example .env`
   - Edit `.env` to set `DB_CONNECTION=mysql`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
4. `php artisan key:generate`
5. Publish Sanctum migrations (for API tokens):
   - `php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider" --tag=sanctum-migrations`
6. Run migrations:
   - `php artisan migrate`
7. Start the API server:
   - `php artisan serve`
   - API base URL: `http://127.0.0.1:8000/api`

## Frontend (Angular)

1. `cd angular-crud`
2. `npm install`
3. Start the dev server:
   - `npm start`
   - Open `http://localhost:4200`

## Configuration Notes

- Angular is configured to call the backend at `http://127.0.0.1:8000/api` (see `angular-crud/src/app/auth.service.ts`). Ensure the Laravel server is running on that address.
- Auth:
  - Register endpoint returns the created user.
  - Login endpoint returns a token that Angular stores in `localStorage`.

## Troubleshooting

- If you see `personal_access_tokens` table errors during login/signup, re-run Sanctum publish and migrations:
  - `php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider" --tag=sanctum-migrations`
  - `php artisan migrate`
