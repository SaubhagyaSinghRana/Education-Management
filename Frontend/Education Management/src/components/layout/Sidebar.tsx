import { NavLink } from "react-router-dom";
import {
  adminMenu,
  teacherMenu,
  studentMenu,
} from "../../data/menu";

function Sidebar() {
  const role = localStorage.getItem("role");

  let menu = [];

  if (role === "admin") {
    menu = adminMenu;
  } else if (role === "teacher") {
    menu = teacherMenu;
  } else {
    menu = studentMenu;
  }

  return (
    <aside className="w-64 bg-slate-800 text-white">

      <div className="border-b p-5">
        <h1 className="text-2xl font-bold">
          Education
        </h1>
      </div>

      <nav className="flex flex-col p-4">

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `rounded-lg p-3 mb-2 ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-700"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;