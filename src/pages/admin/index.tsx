import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import {
  TCategoryCreateInputSchema,
  type TMenuCreateInputSchema,
  type TRestaurantCreateInputSchema,
} from "~/schemas";
import { api } from "~/utils/api";

export default function Restaurant() {
  const session = useSession();

  const utils = api.useContext();

  const myRestaurants = api.restaurant.getMine.useQuery();
  const createRestaurant = api.restaurant.create.useMutation({
    onSuccess: () => utils.restaurant.getMine.invalidate(),
  });

  const [rFormData, setRFormData] = useState<TRestaurantCreateInputSchema>({
    name: "La Farola de Cabildo",
    slug: "la-farola-de-cabildo",
    address: "Cabildo 2030",
    description: "Bodegón porteño",
    image:
      "http://brefexsa.com/wp-content/uploads/2020/03/la_farola_logo-300x134.png",
  });

  const createMenu = api.menu.create.useMutation({
    onSuccess: () => utils.restaurant.getMine.invalidate(),
  });
  const [mFormData, setMFormData] = useState<
    Omit<TMenuCreateInputSchema, "restaurantId">
  >({
    name: "Menú del local",
    description: "Turno noche",
  });

  const createCategory = api.category.create.useMutation({
    onSuccess: () => utils.restaurant.getMine.invalidate(),
  });
  const [cFormData, setCFormData] = useState<
    Omit<TCategoryCreateInputSchema, "menuId">
  >({
    name: "Menú del local",
    description: "Turno noche",
  });

  if (session.status === "unauthenticated") {
    return (
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => void signIn("google")}
      >
        <svg
          className="-ml-0.5 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
        Google Login
      </button>
    );
  }

  return (
    <>
      <Head>
        <title>Panel de Administración - RestoMenuQR</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {myRestaurants.data?.map((r) => (
            <div
              className="w-full overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
              key={r.id}
            >
              <div className="mb-8 text-3xl font-semibold text-gray-900">
                {r.name}
              </div>
              {r.menu.map((m) => (
                <div
                  key={m.id}
                  className="mt-2 rounded-lg bg-slate-200 px-4 py-5 shadow sm:p-6"
                >
                  <div>{m.name}</div>
                  <div className="my-4 h-0.5 w-full bg-slate-400" />
                  {m.category.map((c) => (
                    <div key={c.id}>{c.name}</div>
                  ))}
                  <h1 className="text-3xl font-bold">Crear Categoría</h1>
                  <div className="">
                    {Object.entries(cFormData).map(([field, value]) => (
                      <input
                        className="border border-slate-200"
                        key={field}
                        value={value}
                        placeholder={field}
                        onChange={(e) =>
                          setCFormData((prev) => ({
                            ...prev,
                            [field]: e.target.value,
                          }))
                        }
                      />
                    ))}
                    <button
                      className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() =>
                        createCategory.mutate({ ...cFormData, menuId: m.id })
                      }
                    >
                      Crear
                    </button>
                  </div>
                </div>
              ))}

              <h1 className="text-3xl font-bold ">Crear Menu</h1>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
                {Object.entries(mFormData).map(([field, value]) => (
                  <input
                    className="border border-slate-200"
                    key={field}
                    value={value}
                    placeholder={field}
                    onChange={(e) =>
                      setMFormData((prev) => ({
                        ...prev,
                        [field]: e.target.value,
                      }))
                    }
                  />
                ))}
                <button
                  className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() =>
                    createMenu.mutate({ ...mFormData, restaurantId: r.id })
                  }
                >
                  Crear
                </button>
              </div>
            </div>
          ))}
          <h1 className="text-4xl font-bold text-white">Crear Restaurant</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            {Object.entries(rFormData).map(([field, value]) => (
              <input
                key={field}
                value={value}
                placeholder={field}
                onChange={(e) =>
                  setRFormData((prev) => ({ ...prev, [field]: e.target.value }))
                }
              />
            ))}
            <button
              className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => createRestaurant.mutate(rFormData)}
            >
              Crear
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
