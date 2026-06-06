"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/admin-auth";
import { updateExperience } from "@/lib/experiences";

export type UpdateExperienceState = {
  error?: string;
  success?: string;
};

function parseListField(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function updateExperienceAction(
  _previousState: UpdateExperienceState,
  formData: FormData,
): Promise<UpdateExperienceState> {
  await requireAdminSession();

  const id = formData.get("id");
  const title = formData.get("title");
  const location = formData.get("location");
  const description = formData.get("description");

  if (
    typeof id !== "string" ||
    typeof title !== "string" ||
    typeof location !== "string" ||
    typeof description !== "string"
  ) {
    return {
      error: "The submitted form was incomplete. Please try again.",
    };
  }

  const trimmedTitle = title.trim();
  const trimmedLocation = location.trim();
  const trimmedDescription = description.trim();
  const images = parseListField(formData.get("images"));
  const homepageShelves = parseListField(formData.get("homepageShelves"));

  if (!trimmedTitle || !trimmedLocation || !trimmedDescription) {
    return {
      error: "Title, location, and description are required.",
    };
  }

  const updatedExperience = await updateExperience({
    id,
    title: trimmedTitle,
    location: trimmedLocation,
    description: trimmedDescription,
    images,
    homepageShelves,
  });

  if (!updatedExperience) {
    return {
      error: "That experience could not be found anymore.",
    };
  }

  revalidatePath("/");
  revalidatePath("/experiences");
  revalidatePath("/admin");

  return {
    success: "Saved. Public pages will reflect the new wording on refresh.",
  };
}
