import { Link } from "react-router-dom";



export default function Sidebar() {

  return (
    <aside className="w-52 bg-secondary-base p-2 h-screen  hidden lg:flex flex-col justify-between  overflow-hidden z-10">
      <nav>
        <ul className="list-none p-0 m-0 max-h-[95vh] overflow-y-auto">
          <li className="mb-5">
            <Link
              to="/admin/users"
              className="flex items-center text-white p-2 rounded transition duration-300 hover:bg-secondary-shadow"
            >

              <span className="text-xl">Korisnici</span>
            </Link>
          </li>
          <li className="mb-5">
            <Link
              to="/admin/offers"
              className="flex items-center text-white p-2 rounded transition duration-300 hover:bg-secondary-shadow"
            >
              <span className="text-xl">Oglasi</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}