# DECISIONS

## Product decisions

### Which features did you include?

For the MVP, I decided to include the core features needed for a smooth onboarding experience.

HR users can:

- Create employee accounts
- Assign onboarding tasks
- Schedule meetings
- Upload useful resources
- Assign employees to teams

Employees can:

- View their onboarding progress
- Complete assigned tasks
- View upcoming meetings
- Access company resources
- See the members of their team

### How did you prioritize them?

I prioritized the features that provide the most value during a new employee's first days in the company. Instead of implementing many advanced features, I focused on building a simple and complete onboarding workflow.

### Which features did you intentionally leave out of scope?

To keep the project achievable within the given timeframe, I intentionally left out notifications, messaging, file uploads, manager accounts, and advanced team management. These features could be added in future versions of the application.

---

## Technical decisions

### Why did you choose this database structure?

The database is organized around the main entities involved in the onboarding process:- Users

- Teams
- Onboarding Tasks
- Employee Tasks
- Meetings
- Resources
  This structure keeps the application simple while allowing each employee to track their own onboarding progress independently.

### Why did you choose these libraries/frameworks?

I chose ASP.NET Core Web API for the backend because it provides a clean architecture for building REST APIs and integrates well with Entity Framework Core. React was selected for the frontend because of its component-based approach and ability to build responsive user interfaces. SQL Server was chosen because it integrates naturally with the .NET ecosystem.

### If you had more time, what would you build differently?

With more time, I would implement notifications, document uploads, profile pictures, search functionality, manager accounts and a more advanced team management system.These improvements are described in the `WHAT_I_WOULD_DO_NEXT.md` document.

---

## UX decisions

### Why did you choose this user flow?

I wanted the application to be easy to navigate, especially for new employees who may not yet be familiar with the company.

After logging in, both HR users and employees are taken to a dashboard that provides an overview of the most important information for their role.

For employees, the dashboard displays onboarding progress, assigned tasks, upcoming meetings, resources and team members.

For HR users, the dashboard provides quick access to employee management, onboarding tasks, meetings and company resources, allowing them to efficiently manage the onboarding process.

This role-based approach keeps the interface simple while ensuring that each user immediately sees the information most relevant to them.

### Did you test it with anyone?

I did not conduct formal user testing. Instead, I reviewed the application from the perspective of a new employee and simplified the navigation whenever possible.

### What changed after receiving feedback?

Since I did not receive external feedback during development, no major design changes were made. However, after reviewing the user flow myself, I simplified the navigation and kept the interface focused on the most important onboarding features.
