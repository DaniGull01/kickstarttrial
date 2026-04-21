import { Routes, Route} from 'react-router-dom';
import AdminDashboard from "@/components/Admin/Dashboard";

const AppRoutes = () => {
  
  return (
    <Routes>

        <>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </>
      

    </Routes>
  );
};

export default AppRoutes;