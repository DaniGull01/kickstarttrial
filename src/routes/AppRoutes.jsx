import { Routes, Route} from 'react-router-dom';
import AdminDashboard from "@/components/Admin/Dashboard";

const AppRoutes = () => {
  
  return (
    <Routes>

        <>
          <Route path="/" element={<AdminDashboard />} />
        </>
      

    </Routes>
  );
};

export default AppRoutes;