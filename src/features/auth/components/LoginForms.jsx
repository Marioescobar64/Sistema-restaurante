export const LoginForm = ({ onForgot }) => {
  return (
    <form className="space-y-5 bg-[#E8D5B7]/95 backdrop-blur-md p-6 rounded-xl border border-[#A0724A]/30 shadow-sm">

      {/* Sección de email o usuario */}
      <div>
        <label className="block text-sm font-medium text-[#4A2C0A] mb-1.5">
          Email o Usuario
        </label>
        <input
          type="text"
          placeholder="correo@ejemplo.com o usuario"
          className="w-full px-3 py-2 text-sm border border-[#A0724A]/50 rounded-lg focus:ring-2 focus:ring-[#A0724A]/60 outline-none bg-[#F5ECD9]/60 text-[#4A2C0A] placeholder-[#A0724A]/50"
        />
      </div>

      {/* Sección de contraseña */}
      <div>
        <label className="block text-sm font-medium text-[#4A2C0A] mb-1.5">
          Contraseña
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full px-3 py-2 text-sm border border-[#A0724A]/50 rounded-lg focus:ring-2 focus:ring-[#A0724A]/60 outline-none bg-[#F5ECD9]/60 text-[#4A2C0A] placeholder-[#A0724A]/50"
        />
      </div>

      {/* Botón submit */}
      <button
        type="submit"
        className="w-full bg-[#A0724A] text-[#F5ECD9] py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-[#7A5235] transition"
      >
        Iniciar Sesión
      </button>

      {/* Link olvidé contraseña */}
      <p className="text-center text-sm text-[#4A2C0A]/70">
        <button
          type="button"
          onClick={onForgot}
          className="text-[#A0724A] font-medium hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </p>

    </form>
  );
};