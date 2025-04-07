import { SeeUserBookings } from "../Locations/seeBookings";
import Logout from "../security/logout";
import Logged from "../Contexts/Authenticated";
import DeleteAccount from "../security/deleteAccount";
import Fond from "../utile/style";
import { ChangePasswordButton } from "../security/changePassword";

export default function User() {

  return (
    <Logged>
      <Fond>
        <div className="min-h-screen bg-[#f5f5f5] text-gray-900 px-6 py-10">
          <div className="max-w-6xl mx-auto space-y-10">

            {/* Header avec boutons alignés à droite */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold tracking-wide text-gray-800 uppercase">
                Tableau de bord
              </h1>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/confirmation"
                  className="bg-black text-white px-5 py-2 rounded-2xl text-sm font-medium hover:bg-gray-900 transition"
                >
                  Valider des réservations
                </a>
                <ChangePasswordButton />
                <Logout />
              </div>
            </div>

            {/* Bloc réservations */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Vos réservations
              </h2>
              <div className="overflow-x-auto">
                <SeeUserBookings />
              </div>
            </div>

            {/* Suppression compte */}
            <div className="pt-10 text-center border-t border-gray-300">
              <DeleteAccount />
            </div>
          </div>
        </div>
      </Fond>
    </Logged>
  );
}
