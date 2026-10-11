function Navbar() {
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow">

      <h2 className="text-2xl font-bold capitalize">
        {role} Dashboard
      </h2>

      <button
        onClick={logout}
        className="rounded bg-red-600 px-4 py-2 text-white"
      >
        Logout
      </button>

    </header>
  );
}

export default Navbar;