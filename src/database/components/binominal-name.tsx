export function BinomialName({ genus, species }: { genus: string; species: string }) {
  return (
    <i className="font-serif text-foreground" translate="no">
      {genus.trim()} {species.trim()}
    </i>
  );
}
