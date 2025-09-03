// Header.tsx
import LOGO from "../assets/logo.svg";
import { MdLogout } from "react-icons/md";

const Header = ({ logout }) => {
  const Avatar = ({ name, avatarUrl }) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    return (
      <div className="h-9 w-9 rounded-full overflow-hidden flex items-center justify-center border">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="h-full w-full flex items-center justify-center bg-indigo-500 text-white font-semibold text-sm">
            {initials}
          </span>
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md px-3 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={LOGO} alt="Logo" className="h-10 w-10 object-contain" />
        <h1 className="text-lg font-bold text-gray-700">
          Fashion Ladies Tailor
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <Avatar name="Hardik Mandaliya" />
        <MdLogout size={22} onClick={logout} />
      </div>
    </header>
  );
};

export default Header;
