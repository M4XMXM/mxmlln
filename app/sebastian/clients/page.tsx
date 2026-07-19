import { clients, wixImage } from "../data";

export default function ClientsPage() {
  return (
    <div>
      <h2
        className="mb-8 text-3xl"
        style={{ fontFamily: "var(--font-cormorant), serif" }}
      >
        Clients
      </h2>
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
        {clients.map((client) => (
          <div
            key={client.uri}
            className="flex aspect-square items-center justify-center p-4"
          >
            <img
              src={wixImage(client.uri, 400)}
              alt={client.title}
              title={client.title}
              loading="lazy"
              className="max-h-full max-w-full object-contain opacity-80 transition-opacity hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
