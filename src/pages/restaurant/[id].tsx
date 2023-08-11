import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function Restaurant() {
  const router = useRouter();
  const restaurantId = router.query.id ? String(router.query.id) : "";
  const restaurant = api.restaurant.getById.useQuery({ id: restaurantId });

  if (!restaurant.data) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{restaurant.data.name}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="space-y-4 bg-slate-200 px-4 py-8 font-mono">
        <h1 className="text-xl font-bold tracking-tight text-slate-800">
          {restaurant.data.name}
        </h1>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full sm:max-w-lg">
            <label htmlFor="search" className="sr-only">
              Buscar
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-slate-500 focus:border-slate-500 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-500 sm:text-sm"
                placeholder="Buscar"
                type="search"
              />
            </div>
          </div>
        </div>
      </header>
      <main className="container flex space-x-4 px-4 py-8">
        {restaurant.data.menu?.[0]?.category.map((category) => {
          return (
            <div
              key={category.id}
              className="flex aspect-square w-1/4 flex-col items-center justify-between bg-slate-100 p-4"
            >
              <span className="text-5xl">{category.image}</span>
              <span className="break-words">{category.name}</span>
            </div>
          );
        })}
      </main>
    </>
  );
}

const SearchIcon = () => (
  <svg
    className="h-5 w-5 text-slate-400"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fill-rule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clip-rule="evenodd"
    />
  </svg>
);
