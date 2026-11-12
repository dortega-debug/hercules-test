import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";

// Tipo de contenido "page": una pila de bloques
export default function Page({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      {blok.body?.map((b) => (
        <StoryblokServerComponent blok={b} key={b._uid} />
      ))}
    </div>
  );
}
