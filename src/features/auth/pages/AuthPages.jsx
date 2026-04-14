import { useState } from "react";
import { LoginForm } from "../components/LoginForms";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";

export const AuthPage = () => {
  const [isForgot, setIsForgot] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#C4935A]/20 p-4"
      style={{ backgroundImage: "radial-gradient(ellipse at top, #E8D5B7 0%, #C4A882 60%, #A0724A 100%)" }}
    >

      {/* Tarjeta del formulario */}
      <div className="w-full max-w-xl bg-[#F5ECD9]/90 backdrop-blur-md rounded-xl shadow-lg border border-[#A0724A]/30 p-6 md:p-10">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/src/assets/img/logo.png"
            alt="Papa Luigi"
            className="h-20 w-auto"
          />
        </div>

        {/* Título y subtítulo */}
        <div className="text-center mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#4A2C0A] mb-2">
            {isForgot ? "Recuperar Contraseña" : "Bienvenido de Nuevo"}
          </h1>

          <p className="text-[#7A5235] text-base max-w-md mx-auto">
            {isForgot
              ? "Ingresa tu correo para recuperar tu contraseña"
              : "Ingresa a tu cuenta de administrador de Papa Luigi"}
          </p>
        </div>

        {isForgot ? (
          <ForgotPasswordForm onSwitch={() => setIsForgot(false)} />
        ) : (
          <LoginForm onForgot={() => setIsForgot(true)} />
        )}

      </div>
    </div>
  );
};