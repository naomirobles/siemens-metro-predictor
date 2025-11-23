import { SignInButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

const Guest = () => {
   return (
    <div className="relative min-h-screen w-full bg-[#020026] flex flex-col">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/login_background.jpg"
          alt="Background"
          fill
          className="object-cover opacity-29"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-start justify-between p-8 md:p-12">
          {/* Siemens Logo */}
          <div className="relative w-48 h-16 md:w-64 md:h-20">
            <Image
              src="/Siemens_logo.png"
              alt="Siemens"
              fill
              className="object-contain object-left"
              priority
            />
          </div>

          {/* Title */}
          <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-light text-right">
            Sistema predictivo de incidencias
          </h1>
        </header>

        {/* Main Content - Centered Buttons */}
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col sm:flex-row gap-6 md:gap-8 px-4">
            {/* Login Button */}
            <Link href="/sign-in">
              <button className="bg-gradient-to-t from-[#83eecd] to-[#99ffdd] hover:from-[#6ed9b8] hover:to-[#83eecd] transition-all duration-300 text-black font-bold text-xl md:text-2xl px-16 md:px-20 py-6 md:py-8 rounded-sm shadow-lg hover:shadow-xl transform hover:scale-105">
                LOGIN
              </button>
            </Link>

            {/* Register Button */}
            <Link href="/sign-up">
              <button className="bg-gradient-to-t from-[#83eecd] to-[#99ffdd] hover:from-[#6ed9b8] hover:to-[#83eecd] transition-all duration-300 text-black font-bold text-xl md:text-2xl px-16 md:px-20 py-6 md:py-8 rounded-sm shadow-lg hover:shadow-xl transform hover:scale-105">
                REGISTER
              </button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Guest;