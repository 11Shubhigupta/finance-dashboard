# Finova — Finance Dashboard UI
## Overview

Finova is a responsive finance dashboard built using React and custom CSS.  
It allows users to track income, expenses, and overall financial activity through an interactive and visually clean interface.

The dashboard is designed to simulate real-world financial tracking behavior using mock data. It demonstrates frontend skills such as component structuring, state management, UI design, and data visualization.

The project includes role-based UI simulation where users can switch between Viewer and Admin roles to demonstrate different access levels.
## Features

### Dashboard Overview
- Summary cards displaying Total Balance, Income, and Expenses
- Line chart showing balance trends over time
- Pie chart showing spending breakdown by category
- Quick financial summary at a glance

### Transactions Management
- Display transactions in table format
- Add new transactions (Admin only)
- Edit existing transactions
- Delete transactions
- Search transactions by title or category
- Filter transactions by type or category
- Sort transactions by date or amount

### Role-Based UI
- Viewer role can only view data
- Admin role can add, edit, and delete transactions
- Role switching implemented using dropdown toggle

### Insights Section
- Highest spending category detection
- Monthly spending comparison
- Income vs Expense summary
- Useful financial observations

### UI and UX Features
- Responsive design for different screen sizes
- Modern dark themed interface
- Modal-based transaction forms
- Form validation and error handling
- Smooth UI transitions and hover effects

### Data Handling
- Uses mock transaction data
- Data persistence using localStorage
- Real-time updates on transaction changes

- ## Tech Stack

Frontend:
- React 
- JavaScript (ES6+)
- Custom CSS

Libraries Used:
- Recharts (for charts and data visualization)
- React Icons (for UI icons)
- Context API (for state management)
- Local Storage (for data persistence)

- ## Installation and Setup

Follow these steps to run the project locally:

### Step 1 — Clone the Repository

git clone https://github.com/11Shubhigupta/finance-dashboard.git

### Step 2 — Navigate to Project Folder

cd finance-dashboard

### Step 3 — Install Dependencies

npm install

### Step 4 — Run the Project

npm start

The application will start at:

http://localhost:3000
## Approach

The application is built using a modular component-based architecture in React.

Each major UI section such as Dashboard, Transactions, and Insights is divided into reusable components. State management is handled using the React Context API to manage transactions data, user role, filters, and UI updates.

Charts are implemented using Recharts to visualize financial trends and spending distribution. Local storage is used to persist transaction data so that user data remains available after page refresh.

The UI is designed to be clean, readable, and responsive across different screen sizes.

## Role-Based UI Logic

The dashboard simulates two user roles:

Viewer:
- Can view dashboard data
- Can view transactions
- Cannot modify data

Admin:
- Can add transactions
- Can edit transactions
- Can delete transactions

Role switching is implemented using a dropdown toggle to demonstrate frontend-level permission control.
## Edge Case Handling

The application handles common edge cases such as:

- Empty transaction list
- Invalid form inputs
- Missing required fields
- Responsive layout adjustments
- Safe UI updates during data changes

  ##Screenshots
  <img width="1366" height="768" alt="Screenshot 2026-04-03 155950" src="https://github.com/user-attachments/assets/35331761-d334-47a5-803f-2c356415a48c" />

  <img width="1362" height="766" alt="Screenshot 2026-04-03 160011" src="https://github.com/user-attachments/assets/c8c7339d-a5a1-4079-bb41-2c6f7c3811bc" />
<img width="1362" height="762" alt="Screenshot 2026-04-03 160020" src="https://github.com/user-attachments/assets/36f4abd2-aee8-4cc3-9deb-05e2b65f691d" />
<img width="1354" height="768" alt="Screenshot 2026-04-03 160029" src="https://github.com/user-attachments/assets/67278447-5a93-4b58-9471-d91250b3846e" />
<img width="1340" height="738" alt="Screenshot 2026-04-03 160045" src="https://github.com/user-attachments/assets/ad7ebc1a-691b-4a66-897b-f6e3f0d8ec99" />

light mode feature
<img width="1366" height="768" alt="Screenshot 2026-04-03 160104" src="https://github.com/user-attachments/assets/3bdb46a8-bd8a-4133-9aa6-6baee6ba5615" />

responsive 
<img width="500" height="768" alt="Screenshot 2026-04-03 160148" src="https://github.com/user-attachments/assets/d7defa1a-a379-402a-a2dc-93250d155c24" />
<img width="486" height="757" alt="Screenshot 2026-04-03 160203" src="https://github.com/user-attachments/assets/796c0a04-fb3d-474c-83fe-969e4d90caca" />







