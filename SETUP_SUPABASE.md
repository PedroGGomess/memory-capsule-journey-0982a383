# Supabase Setup Instructions - The 100's Academy

This guide walks you through setting up the Supabase backend for the Academy platform.

## Prerequisites

- Access to Supabase dashboard at: https://zktcyligqdgisurapxco.supabase.co
- Your Supabase project is already created and configured

## Step 1: Create the Academy Employees Table

The app uses Supabase to store academy employee data and track progress. You need to run a SQL migration to create the required table.

### Instructions:

1. Log in to your Supabase dashboard
2. Go to the **SQL Editor** section
3. Click **New Query**
4. Copy and paste the contents of `/supabase/migrations/001_create_academy_employees.sql`
5. Click **Run** to execute the migration

The migration will create:
- `academy_employees` table with fields for employee data, roles, progress tracking
- Row Level Security (RLS) policy to allow all operations
- Index on `access_code` for fast lookups during login

### Table Schema:

```
academy_employees {
  id: UUID (Primary Key)
  name: TEXT (Required)
  email: TEXT (Optional)
  role: TEXT (Default: 'store-employee')
  access_code: TEXT (Unique)
  is_active: BOOLEAN (Default: true)
  created_at: TIMESTAMP
  last_login: TIMESTAMP
  progress: JSONB (Stores module completion)
  quiz_scores: JSONB (Stores quiz results)
}
```

## Step 2: Create the First Admin User (Optional)

To create an admin user with access to the Team Management interface, manually insert a record into the `academy_employees` table:

### Option A: Using Supabase Dashboard

1. Go to **Table Editor**
2. Click on `academy_employees` table
3. Click **Insert row** and fill in:
   - `name`: (e.g., "Maria Silva")
   - `email`: (optional)
   - `role`: Select `store-manager` or `hr` (these roles have admin access)
   - `access_code`: Generate a code (8 characters, uppercase letters and numbers, e.g., `MGMT0001`)
   - `is_active`: Toggle to `true`

4. Click **Save**

### Option B: Using SQL

```sql
INSERT INTO academy_employees (name, email, role, access_code, is_active)
VALUES ('Manager Name', 'manager@example.com', 'store-manager', 'MGMT0001', true);
```

## Step 3: Generate Access Codes for Employees

### Manual Approach (for a few employees):

1. In the Supabase dashboard, go to **Table Editor**
2. Click **Insert row** for each new employee:
   - `name`: Employee name
   - `email`: Employee email (optional)
   - `role`: Choose from:
     - `store-employee` (default)
     - `team-leader`
     - `store-manager`
     - `internal-it`
     - `hr`
     - `marketing`
   - `access_code`: Generate a unique 8-character code (e.g., `EMP00001`, `TEAM0002`)
   - `is_active`: true

3. Click **Save**

### Using the Admin Interface (Recommended):

Once the app is running:

1. Log in with a `store-manager` or `hr` access code
2. Go to **Gestão de Equipa** / **Team Management** (in the sidebar under Admin)
3. Click **Create Employee**
4. Fill in the form:
   - Name (required)
   - Email (optional)
   - Role
5. The system automatically generates a unique access code
6. Share the code with the employee

## Step 4: Environment Variables

Ensure your `.env` file has the correct Supabase credentials:

```
VITE_SUPABASE_URL=https://zktcyligqdgisurapxco.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprdGN5bGlncWRnaXN1cmFweGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MTE3NjIsImV4cCI6MjA4ODQ4Nzc2Mn0.wvwrIQGXzX_sgKKBwjkPTegpryzqzTJao9-9wYH-c5Q
```

These are already configured in the project's environment.

## Step 5: Test the Setup

1. Start the application: `npm run dev`
2. Navigate to: http://localhost:5173/academy/login
3. Enter an access code for an active employee
4. You should be logged in and see the Academy dashboard
5. Check the sidebar - admin users should see the **Gestão de Equipa** / **Team Management** link

## Roles & Permissions

### Access Control by Role:

**store-employee** (Default)
- Access to core modules
- Cannot access admin panel

**team-leader**
- Access to additional leadership modules
- Cannot access admin panel

**store-manager**
- Access to all modules
- Can access Team Management (admin)

**hr** (Human Resources)
- Focused module access
- Can access Team Management (admin)

**internal-it**
- Limited technical modules
- Cannot access admin panel

**marketing**
- Marketing-focused modules
- Cannot access admin panel

## Data Persistence

### Progress Tracking:
- Module completions and quiz scores are automatically saved to Supabase
- Changes sync in the background (debounced by 1 second)
- Falls back to localStorage if offline

### Caching:
- User data is cached in localStorage for quick access
- Auto-syncs with Supabase on login and periodically

## Troubleshooting

### Login Issues:
- Verify the access code exists in the database
- Check that `is_active` is set to `true`
- Ensure the code matches exactly (case-sensitive)

### Progress Not Saving:
- Check browser console for errors
- Verify user ID is correctly stored
- Ensure Supabase connection is active

### Admin Panel Not Visible:
- Confirm user role is `store-manager` or `hr`
- Logout and log back in to refresh role cache
- Check the sidebar under the Admin section

## Future Enhancements

Potential improvements:
- Bulk employee import via CSV
- Email notifications for new access codes
- Advanced reporting and analytics
- Role-based custom module access
- Progress export for training records

## Support

For issues or questions about the Supabase setup, check:
- Supabase Documentation: https://supabase.com/docs
- Project Logs in Supabase Dashboard
- Browser Console for client-side errors
