import Badge from "@/public/svg/badge.svg";

export default function BestBadge() {
  return (
    <figure className="absolute left-0 top-0 flex h-8 items-center gap-1 rounded-br-xl bg-brand-primary-light px-4 pt-2">
      <Badge />

      <figcaption className="md-semibold text-white tab:lg-semibold">
        Best
      </figcaption>
    </figure>
  );
}
