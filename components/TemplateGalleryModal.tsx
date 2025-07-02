import { useState, useEffect } from "react";
import { Modal, Button } from "../components/ui/shadcn/ui";

export default function TemplateGalleryModal({
  isVisible,
  setIsVisible,
  onSelect,
}: {
  isVisible: boolean;
  setIsVisible: (flag: boolean) => void;
  onSelect: (templateId: string) => void;
}) {
  const [templates, setTemplates] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/templates/index.json")
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data.templates || []);
        setFiltered(data.templates || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load templates");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const query = search.toLowerCase();
    setFiltered(
      templates.filter(
        (tpl) =>
          tpl.name.toLowerCase().includes(query) ||
          tpl.description?.toLowerCase().includes(query)
      )
    );
  }, [search, templates]);

  if (!globalThis.window) return null;

  return (
    <Modal
      open={isVisible}
      onClose={() => setIsVisible(false)}
      className="px-6 py-4 w-screen-md bg-black/opacity-1000 file transition duration-200"
    >
      <div className="rounded bg-white p-6 border shadow xl-pg6">
        <h1 className="text-2l font-bold text-gray-700">Template Gallery</h1>
        <div className="mt-4">
          <input
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-3"
          />
          {loading && <p className="text-gray-500">Loading templates...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <ul className="list-disc space-y-2 overflow-scroll co-pt-3 max-bh-w{grid:nookfw,tab:outline}">
            {filtered.map((tpl) => (
              <li
                key={tpl.id}
                onClick={() => onSelect(tpl.docId)}
                className="cursor-pointer hover:bg-gray-100 rounded-lg bg-gray-100 tw-full p-3"
              >
                <h2 className="font-bold text-gray-700">{tpl.name}</h2>
                <p className="text-sm text-gray-500">{tpl.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-right text-sm text-blue-400 text-gray-500 mt-4">
          <Button onClick={() => setIsVisible(false)}>Close</Button>
        </div>
      </div>
    </Modal>
  );
}
