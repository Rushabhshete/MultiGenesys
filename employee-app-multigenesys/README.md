MultiGenesys – Frontend Assignment (React)
#### Overview ####

This is a  Employee Management technical Assignment built using React, Redux Toolkit, and Material UI.

The application supports listing, searching, creating, editing, and deleting employees while maintaining clean state management using Redux and component separation.

The focus of this implementation is reusable components, and a clear smart/dumb component structure.

### Project Setup Instructions ###

Clone the repository:
--->git clone https://github.com/Rushabhshete/MultiGenesys.git
--->cd employee-app-multigenesys
--->npm install

### Start the development server: ###
---> npm run dev
The application will run locally :  http://localhost:5173
Run unit tests using:
--->npm test


#### Tech Stack ####

---React (latest)
---Redux Toolkit
---React Router
---Material UI + MUI DataGrid
---Axios
---Formik + Yup
---Jest + React Testing Library

#### Key Features ####

--Employee list with pagination
--Search by Employee ID (onClick button-trigger search)
--Add / Edit employee with validation
--Delete with confirmation dialog
--Custom empty states (no data / search not found)
--Snackbar feedback for user actions
--Responsive layout

#### Structure ####

Smart Components: Handle Redux and API interaction (e.g:- EmployeeListPage,EmployeeFormPage)
Dumb Components: Purely UI  (e.g., EmployeeTable, EmployeeForm)
Redux slice manages list, loading, and error states using createAsyncThunk
Reusable common components for dialogs, snackbar, and empty overlays
The design follows a clean separation of codes and avoids direct API logic inside UI components.



#### Notes ####

**Search is controlled and executed only on button click.
**Delete operations update state immediately after success.
**Empty and error states are explicitly handled.



Code: -
Rushabh Shete
rushabhshete188@gmail.com
Frontend Assignment – MultiGenesys -> employee management assignment