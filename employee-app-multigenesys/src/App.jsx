import { Routes, Route } from "react-router-dom";
import EmployeePage from "./pages/EmployeeListPage";
import MainLayout from "./layout/MainLayout";
import EmployeeFormPage from "./pages/EmployeeFormPage";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<EmployeePage />} />
        <Route path="/add" element={<EmployeeFormPage />} />
        <Route path="/edit/:id" element={<EmployeeFormPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
