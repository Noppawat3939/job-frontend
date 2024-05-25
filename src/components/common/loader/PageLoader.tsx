import { Spinner } from ".";

export default function PageLoader({ open = false }) {
  if (!open) return null;

  return (
    <div className="fixed bg-black/10 animate-in backdrop-blur-mdbackdrop-blur-md top-0 right-0 w-full h-full z-10 flex justify-center items-center">
      <center>
        <Spinner />
      </center>
    </div>
  );
}
