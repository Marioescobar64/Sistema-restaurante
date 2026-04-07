import { useState } from "react";
import { LoginForm } from "../components/LoginForms";
import fondo from "../../../assets/img/fondo.png";
import logo from "../../../assets/img/logo.jpg";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(44,21,6,0.6), rgba(44,21,6,0.6)), url(${fondo})`
      }}
    >
      
      {/* 🔥 AQUÍ ESTÁ EL CAMBIO */}
      <div className="w-full max-w-xl bg-[#F5F5DC]/20 backdrop-blur-md rounded-xl shadow-2xl border border-[#7F3C09]/30 p-6 md:p-10 transition-all">
        
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Papa Luigi"
            className="h-20 w-auto"
          />
        </div>

        {/* TITULO */}
        <div className="text-center mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#F5F5DC] mb-2">
            {isForgot
              ? "Recuperar contraseña"
              : isLogin
              ? "Bienvenido de nuevo"
              : "Crear cuenta"}
          </h1>

          <p className="text-[#F5F5DC] text-base max-w-md mx-auto">
            {isForgot
              ? "Ingresa tu correo para recuperar tu contraseña"
              : isLogin
              ? "Ingresa a tu cuenta de administrador de Papa Luigi"
              : "Regístrate como administrador de Papa Luigi"}
          </p>
        </div>

        {/* FORM */}
        {isForgot ? (
          <p className="text-center text-[#F5F5DC]">
            Formulario de recuperación (pendiente)
          </p>
        ) : (
          <LoginForm />
        )}

      </div>
    </div>
  );
};

export { AuthPage };