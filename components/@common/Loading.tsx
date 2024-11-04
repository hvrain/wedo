import { Spinner } from "@/ui/spinner";

export default function Loading() {
  return (
    <div className="fixed z-50 h-screen w-full bg-black opacity-20">
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner size="large" />
      </div>
    </div>
  );
}
