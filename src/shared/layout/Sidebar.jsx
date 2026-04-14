export const Sidebar = () => {
  const items = [
    { label: "Menú" },
    { label: "Reservaciones" },
    { label: "Eventos" },
    { label: "Carrito" },
    { label: "Galeria" },
    { label: "Contactanos" },
  ];
  return (
    <aside className="w-60 bg-[#E8D5B7]/95 backdrop-blur-md border-r border-[#A0724A]/40 min-h-[calc(100vh-4rem)] p-4 shadow-sm">
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.label}>
            <div className="block px-4 py-2 rounded-lg font-medium text-[#4A2C0A] hover:bg-[#C4935A]/20 cursor-pointer transition-colors">
              {item.label}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};