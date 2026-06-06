"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";
import type { Experience } from "@/lib/experiences";
import { updateExperienceAction, type UpdateExperienceState } from "./actions";

type ExperienceEditorProps = {
  experience: Experience;
};

const initialState: UpdateExperienceState = {};

function listToTextareaValue(values: string[]) {
  return values.join("\n");
}

function formatShelfLabel(shelf: string) {
  return shelf
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function ExperienceEditor({
  experience,
}: ExperienceEditorProps) {
  const [state, formAction, isPending] = useActionState(
    updateExperienceAction,
    initialState,
  );

  const formId = experience.id;
  const imagesFieldId = `${formId}-images`;
  const shelvesFieldId = `${formId}-shelves`;
  const titleFieldId = `${formId}-title`;
  const locationFieldId = `${formId}-location`;
  const descriptionFieldId = `${formId}-description`;

  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">
            Experience
          </p>
          <h2 className="mt-2 text-xl font-serif text-white">
            {experience.title}
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-stone-300">
          {experience.homepageShelves.map((shelf) => (
            <span
              key={shelf}
              className="rounded-full border border-amber-300/20 bg-amber-100/10 px-3 py-1"
            >
              {formatShelfLabel(shelf)}
            </span>
          ))}
        </div>
      </div>

      <form action={formAction} className="mt-6 grid gap-5">
        <input type="hidden" name="id" value={experience.id} />

        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <label
              htmlFor={titleFieldId}
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone-400"
            >
              Title
            </label>
            <input
              id={titleFieldId}
              name="title"
              defaultValue={experience.title}
              required
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-stone-100 outline-none transition focus:border-amber-300/40 focus:ring-2 focus:ring-amber-200/20"
            />
          </div>

          <div>
            <label
              htmlFor={locationFieldId}
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone-400"
            >
              Location
            </label>
            <input
              id={locationFieldId}
              name="location"
              defaultValue={experience.location}
              required
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-stone-100 outline-none transition focus:border-amber-300/40 focus:ring-2 focus:ring-amber-200/20"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor={descriptionFieldId}
            className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone-400"
          >
            Description
          </label>
          <textarea
            id={descriptionFieldId}
            name="description"
            defaultValue={experience.description}
            required
            rows={6}
            className="w-full rounded-[1.5rem] border border-white/10 bg-black/30 px-4 py-3 text-stone-100 outline-none transition focus:border-amber-300/40 focus:ring-2 focus:ring-amber-200/20"
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <label
              htmlFor={imagesFieldId}
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone-400"
            >
              Image paths
            </label>
            <textarea
              id={imagesFieldId}
              name="images"
              defaultValue={listToTextareaValue(experience.images)}
              rows={5}
              className="w-full rounded-[1.5rem] border border-white/10 bg-black/30 px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-amber-300/40 focus:ring-2 focus:ring-amber-200/20"
            />
            <p className="mt-2 text-xs leading-6 text-stone-400">
              One path per line, for example
              ` /experiences/kilifi/kilifi_cover.jpeg `.
            </p>
          </div>

          <div>
            <label
              htmlFor={shelvesFieldId}
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone-400"
            >
              Homepage shelves
            </label>
            <textarea
              id={shelvesFieldId}
              name="homepageShelves"
              defaultValue={listToTextareaValue(experience.homepageShelves)}
              rows={5}
              className="w-full rounded-[1.5rem] border border-white/10 bg-black/30 px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-amber-300/40 focus:ring-2 focus:ring-amber-200/20"
            />
            <p className="mt-2 text-xs leading-6 text-stone-400">
              One shelf per line. Available shelves are `fresh-arrivals`,
              `sweet-season`, `cultural-encounters`, and `mountain-escapes`.
            </p>
          </div>
        </div>

        {state.error ? (
          <p className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {state.error}
          </p>
        ) : null}

        {state.success ? (
          <p className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            {state.success}
          </p>
        ) : null}

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-full bg-amber-200 px-5 py-3 text-sm font-medium text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Save className="h-4 w-4" />
            {isPending ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </article>
  );
}
