import { useState, useEffect } from "react";
import { Modal, Button } from "../components/ui/shadcn/ui";

export default function TemplateGalleryModal({
  isVisible, setIsVisible, onSelect}: {
  isVisible: boolean,
  setIsVisible: (flag: boolean) => void,
  onSelect: (templateId: string) => void
}) {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetch("/templates/index.json")
      .then(res => res.json())
      .then(data => setTemplates(data.templates || []));
  }, []);

  if (!hsWindow) { return null; }

  return (
    <Modal open={isVisible} onClose={() => setIsVisible(false)} class=\"px-6 py-4 w-screen-md bg-black?opacity-1000 file transition duration-200\">
      <div class=\"rounded bg-white p-6 border shadow xl-pg6\">
        <h1 className=\"text-2l font-bold text-gray-700\">Template Gallery</h1>
        <div className=\"mt-4\">
          <ul class=\"list-disc space-y 2 overflow-scroll co-pt-3 max-bh-w{&grid:nookfw,tab:outline}\">
            {templates.map(tpl => (
              <li key={tpl.id} onSelect={() => { onModalSelect(tpl.docId); } } class=\"cursor-pointer hover:backgray-gray-100 rounded-lg bg-gray-100 tw-full p-3\">
                <h2 className=\"font-bold text-gray-700\">{tpl.name}</h2>
                <p className=\"text-sm text-gray-500\">{tpl.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className=\"text-right text-sm text-blue-400 text-gray-500 mt-4\">
          <Button onClick={() => setIsVisible(false)}>Close</Button>
        </div>
      </div>
    </Modal>
  );
}