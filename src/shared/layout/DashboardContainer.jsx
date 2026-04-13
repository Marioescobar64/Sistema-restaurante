import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import fondo from "../../assets/img/fondo.png";
 
export const DashboardContainer = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#041F3D]">
 
      {/* Contenido */}
      <div className="flex flex-col min-h-screen text-white">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${fondo})` }}
              />
 
        {/* Navbar */}
        <div className="bg-[#0B3A66]/90 backdrop-blur-md border-b border-[#18A7A1]/30">
          <Navbar />
        </div>
       
 
        <div className="flex flex-1">
          <div className="bg-[#041F3D]/95 backdrop-blur-md border-r border-[#18A7A1]/20 min-w-[220px]">
            <Sidebar />
          </div>
          <main className="flex-1 p-6 bg-[#041F3D]/80">
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-[#18A7A1]/20">
              <div className="absolute inset-0 bg-[#0B3A66]/80" />
              <div className="relative p-6">
                <h2 className="text-xl font-semibold text-[#E6E6E6] mb-4">
                  Contenido del menú
                </h2>
 
                <p className="text-[#E6E6E6]/80">
               
                </p>
              </div>
 
            </div>
 
          </main>
 
        </div>
      </div>
    </div>
  );
};
 