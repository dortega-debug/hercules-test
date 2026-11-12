"use client";
import { useState } from "react";

// Demo: todavía no envía el correo a ningún servicio. En la fase 3 se
// conecta al servicio de newsletter que elija Hércules.
export default function NewsletterForm({ boton, placeholder, gracias, oscuro }) {
  const [enviado, setEnviado] = useState(false);

  if (enviado) {
    return (
      <p role="status" className="text-lg">
        {gracias}
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setEnviado(true);
      }}
      className="flex flex-col sm:flex-row"
    >
      <input
        type="email"
        required
        autoComplete="email"
        aria-label={placeholder}
        placeholder={placeholder}
        className="min-h-11 min-w-0 flex-1 border border-carbon bg-crema px-4 py-2.5 text-carbon placeholder:text-tenue focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon sm:border-r-0"
      />
      <button className="boton">
        {boton}
      </button>
    </form>
  );
}
