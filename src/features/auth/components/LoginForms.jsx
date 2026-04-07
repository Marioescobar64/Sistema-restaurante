export const LoginForm = () => {
  return (
    <form className="space-y-5">
      
      {/* EMAIL */}
      <div>
        <label className="block text-sm font-medium text-[#2C1506] mb-1.5">
          Email o Usuario
        </label>

        <input
          type="text"
          placeholder="Ingresa tu email"
          className="w-full px-3 py-2 text-sm border border-[#7F3C09] rounded-lg
          focus:ring-2 focus:ring-[#7F3C09] outline-none"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="block text-sm font-medium text-[#2C1506] mb-1.5">
          Contraseña
        </label>

        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          className="w-full px-3 py-2 text-sm border border-[#7F3C09] rounded-lg
          focus:ring-2 focus:ring-[#7F3C09] outline-none"
        />
      </div>

      {/* BOTÓN */}
      <button
        type="submit"
        className="w-full bg-[#7F3C09] hover:bg-[#2C1506] text-white font-medium 
        py-2.5 px-4 rounded-lg transition duration-200 text-sm"
      >
        Iniciar Sesión
      </button>

      {/* LINK */}
      <p className="text-center text-sm">
        <button
          type="button"
          onClick={() => alert("Recuperar contraseña")}
          className="text-[#7F3C09] hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </p>

    </form>
  );
};