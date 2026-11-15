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

  // El campo tiene la misma forma de pastilla que el botón y va separado de
  // él: en celular uno debajo de otro, de tableta en adelante lado a lado.
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setEnviado(true);
      }}
      className="flex flex-col gap-3 sm:flex-row sm:items-center"
    >
      <input
        type="email"
        required
        autoComplete="email"
        aria-label={placeholder}
        placeholder={placeholder}
        className={`min-h-11 min-w-0 flex-1 rounded-full border bg-transparent px-5 py-2 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:min-h-9 ${
          oscuro
            ? "border-crema/60 text-crema placeholder:text-crema/60 focus-visible:ring-crema focus-visible:ring-offset-carbon"
            : "border-carbon/40 text-carbon placeholder:text-tenue focus-visible:ring-carbon focus-visible:ring-offset-crema"
        }`}
      />
      <button className="boton shrink-0">{boton}</button>
    </form>
  );
}
