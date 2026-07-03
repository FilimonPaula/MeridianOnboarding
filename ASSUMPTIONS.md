# ASSUMPTIONS

## About the users

### Who uses the application?

The application is intended for two types of users:

- **HR staff**, who manage the onboarding process by creating employee accounts, assigning onboarding tasks, scheduling meetings, providing onboarding resources, and organizing employees into teams.

- **New employees**, who use the application to track their onboarding progress, complete assigned tasks, view meetings, access company resources, and see the members of their team.

### What does the user already know when opening the application for the first time?

A new employee already has an account created by HR and receives their login credentials before their first working day. They are familiar with the purpose of the application but not necessarily with the company or their colleagues.

---

## About the data

### Who enters the information into the application?

HR is responsible for:

- creating employee accounts
- assigning onboarding tasks
- creating meetings
- providing onboarding resources
- assigning employees to teams

Employees only update their own onboarding progress by marking assigned tasks as completed.

### When is the information added?

Most onboarding information is prepared before the employee's first working day. During the onboarding process, HR may add additional meetings, resources, or tasks whenever necessary.

### What happens if information is missing or incorrect?

Required fields are validated before submission. If validation fails, the information cannot be saved. Existing data can later be updated by HR if corrections are needed.

### How is access controlled?

The application assumes that authentication is handled using JWT tokens and that users only have access to the functionality allowed by their assigned role (HR or Employee).

---

## About the context

### What device does the new employee use on the first day?

The application is primarily designed for desktop use, since onboarding usually takes place using a company laptop.

### Do they have access to the application before their first working day?

Yes. Employees receive access before their first working day so they can complete administrative tasks and become familiar with the onboarding process.
