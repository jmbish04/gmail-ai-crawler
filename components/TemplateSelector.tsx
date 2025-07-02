import { useState, useEffect } from "react";

export default function TemplateSelector({ onSelect }: { onSelect: (templateId: string) => void }) {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetch("/templates/index.json")
        .then((res) => res.json())
        .then( data => setTemplates(data.templates || []));
  }, []);

  return (
    <div className=\"p-4\">
      <label className=\"block text-sm font-medium text-gray-700 mb-1\">Select a Template</label>
      <select onChange= (e) => onSelect(e.target.value)
        className=\"mt-1 block w-full border border-gray-300 rounded-md shadow-sm\">
        <option value=\"\">-- Choose Template --</option>
        {templates.map((tpl: any) => (
          <option key={tpl.id} value={tpl.docId}>{tpl.name}</option>
        )}
      </select>
    </div>
  );
}