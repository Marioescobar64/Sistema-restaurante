import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const DashboardContainer = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        
        {/* Sidebar */}
        <Sidebar />

        {/* Contenido principal */}
        <main className="flex-1 p-6">
          Contenido del menu
        </main>

      </div>
    </div>
  );
};