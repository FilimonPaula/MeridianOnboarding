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

The database is organized around the main entities involved in the onboarding process:

- Users
- Teams
- Onboarding Tasks
- Employee Tasks
- Meetings
- Resources

This structure keeps the application simple while allowing each employee to track their own onboarding progress independently.

### Why did you choose a simple architecture?

I intentionally chose a simple architecture because the project is an MVP with a relatively small domain. My goal was to focus on implementing the required functionality while keeping the code easy to understand and maintain. More advanced architectural patterns could be introduced as the application grows.

### Why did you choose these libraries/frameworks?

I chose ASP.NET Core Web API for the backend because it offers strong built-in support for JWT authentication and integrates seamlessly with Entity Framework Core. React was selected for the frontend because its component-based structure made it easy to reuse the same components for both HR and Employee views, while keeping role-based logic isolated. SQL Server LocalDB was used for local development since it requires no external dependencies, but I would migrate to PostgreSQL or Azure SQL for production.

### If you had more time, what would you build differently?

With more time, I would implement notifications, document uploads, hybrid work schedules, dynamic dashboard widgets, automated testing, and deployment. These improvements are described in the `WHAT_I_WOULD_DO_NEXT.md` document.

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

---

## Implementation Updates

During development, some implementation details evolved compared to the initial design.

### Component Reuse

Initially, I planned separate pages for HR and Employee users. During implementation, I decided to reuse the same pages for meetings, resources, and tasks whenever possible. Instead of duplicating the UI, I restricted specific actions based on the user's role. HR users can create, edit, and delete data, while employees have read-only access where appropriate and can only complete their own onboarding tasks.

This approach reduced code duplication, improved maintainability, and ensured a consistent user experience across both roles.

---

### Team Visibility

The employee dashboard was updated to display the members of the employee's team instead of a static onboarding buddy. This provides employees with a better overview of the people they work with while keeping the dashboard dynamic.

---

### Team Statistics

Initially, the Teams page displayed a static number of team members. During development, I noticed that this value became inconsistent whenever new employees were added or reassigned to a team, since it was not automatically updated. To fix this, the Teams page was updated to calculate and display the number of team members dynamically based on the employees actually assigned to each team, ensuring the displayed data always reflects the current state.

---

### Security Configuration

For simplicity, the JWT signing key is stored in `appsettings.json` during development. In a production environment, sensitive configuration such as JWT keys and connection strings should be stored using environment variables, User Secrets, or a secure secret management solution.
