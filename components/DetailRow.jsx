import { storyblokEditable } from "@storyblok/react/rsc";

export default function DetailRow({ blok }) {
  return (
    <div
      {...storyblokEditable(blok)}
      className="grid gap-1 border-t border-linea py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
    >
      <dt className="etiqueta pt-0.5 text-tenue">{blok.label}</dt>
      <dd className="whitespace-pre-line">{blok.value}</dd>
    </div>
  );
}
