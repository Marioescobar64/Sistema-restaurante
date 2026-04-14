import imgLogo from "../../assets/img/logo.png";

export const Navbar = () => {
    return (
        <nav className="bg-[#E8D5B7]/95 backdrop-blur-md border-b border-[#A0724A]/40 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo + título */}
                <div className="flex items-center gap-2">
                    <img
                        src={imgLogo}
                        alt="Papa Luigi Logo"
                        className="h-8 md:h-10 w-auto object-contain"
                    />
                    <h1 className="font-bold text-[#4A2C0A] text-lg tracking-wide">
                        Papa Luigi
                    </h1>
                </div>

                {/* Avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-[#C4935A]/30 border-2 border-[#A0724A]/70" />
            </div>
        </nav>
    );
};