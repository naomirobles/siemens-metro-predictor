"use client";

import dynamic from "next/dynamic";

const MapaMetro = dynamic(() => import("@/app/components/MapaMetro"), {
  ssr: false,
});

const Linea1Layer = dynamic(() => import("@/app/components/Linea1Layer"), {
  ssr: false,
});

export default function Linea1Page() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Línea 1 del Metro CDMX</h1>

      <MapaMetro>
        <Linea1Layer />
      </MapaMetro>
    </div>
  );
}
