'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const { user, isLoaded } = useUser();

  // No mostrar el header si el usuario no está cargado o no está autenticado
  if (!isLoaded || !user) {
    return null;
  }

  return (
    <header className="w-full bg-[#020026] text-white shadow-lg">
      <div className="max-w-full px-6 py-4 flex items-center justify-between">
        {/* Logo de Siemens - Izquierda */}
        <Link href="/linea1" className="flex items-center">
          <div className="relative w-32 h-10 md:w-40 md:h-12">
            <Image
              src="/Siemens_logo.png"
              alt="Siemens"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Usuario - Derecha */}
        <div className="flex items-center gap-3">
          <span className="text-sm md:text-base font-medium hidden sm:block">
            {user.fullName || user.firstName || user.emailAddresses[0]?.emailAddress}
          </span>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 md:w-12 md:h-12"
              }
            }}
          />
        </div>
      </div>
    </header>
  );
}
