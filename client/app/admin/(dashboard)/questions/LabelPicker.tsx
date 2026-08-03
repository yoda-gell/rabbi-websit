"use client";

import { useState } from "react";

const SUGGESTED_LABELS = ["אמונה", "נפילות", "חברה", "בית", "תפילה", "הלכה", "השקפה"];

export default function LabelPicker({
  labels,
  onChange,
  disabled,
}: {
  labels: string[];
  onChange: (labels: string[]) => void;
  disabled: boolean;
}) {
  const [customLabel, setCustomLabel] = useState("");

  function toggleLabel(label: string) {
    onChange(labels.includes(label) ? labels.filter((l) => l !== label) : [...labels, label]);
  }

  function addCustomLabel() {
    const trimmed = customLabel.trim();
    if (!trimmed || labels.includes(trimmed)) {
      setCustomLabel("");
      return;
    }
    onChange([...labels, trimmed]);
    setCustomLabel("");
  }

  function handleCustomLabelKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      addCustomLabel();
    }
  }

  function removeLabel(label: string) {
    onChange(labels.filter((l) => l !== label));
  }

  const customLabels = labels.filter((label) => !SUGGESTED_LABELS.includes(label));

  return (
    <div>
      <div className="mb-1.5 font-heading text-xs font-bold text-[#8A8175]">קטגוריות</div>

      <div className="flex flex-wrap gap-1.5">
        {SUGGESTED_LABELS.map((label) => {
          const selected = labels.includes(label);
          return (
            <button
              key={label}
              type="button"
              onClick={() => toggleLabel(label)}
              disabled={disabled}
              className={`rounded-full px-3 py-1 font-heading text-xs font-bold disabled:opacity-60 ${
                selected
                  ? "bg-amber text-ink"
                  : "border border-black/10 bg-white text-[#5C554B]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-2 flex gap-1.5">
        <input
          type="text"
          value={customLabel}
          onChange={(event) => setCustomLabel(event.target.value)}
          onKeyDown={handleCustomLabelKeyDown}
          disabled={disabled}
          placeholder="קטגוריה מותאמת אישית…"
          className="flex-1 rounded-xl border border-black/10 bg-[#FAF8F4] px-3 py-2 text-xs text-[#2A2620] focus:border-amber focus:outline-none disabled:opacity-60"
        />
        <button
          type="button"
          onClick={addCustomLabel}
          disabled={disabled}
          className="rounded-xl border border-black/10 bg-white px-3.5 py-2 font-heading text-xs font-bold text-[#5C554B] disabled:opacity-60"
        >
          הוסף
        </button>
      </div>

      {customLabels.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {customLabels.map((label) => (
            <span
              key={label}
              className="flex items-center gap-1.5 rounded-full bg-amber px-3 py-1 font-heading text-xs font-bold text-ink"
            >
              {label}
              <button
                type="button"
                onClick={() => removeLabel(label)}
                disabled={disabled}
                className="disabled:opacity-60"
                aria-label={`הסר קטגוריה ${label}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
