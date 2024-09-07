import { Link } from "react-router-dom";

export default function MobileSidebar() {
  return (
    <div className="w-full lg:hidden flex justify-center">
      <div className="bg-secondary-base p-4 flex flex-col gap-4 w-full ">
        <Link to="/admin/users" className="text-white font-open text-xl p-2 hover:bg-secondary-shadow text-center">
          Korisnici
        </Link>
        <Link to="/admin/offers" className="text-white font-open text-xl p-2 hover:bg-secondary-shadow text-center">
          Oglasi
        </Link>
      </div>
    </div>
  );
}
