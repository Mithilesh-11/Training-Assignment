import path from "path";
import { randomUUID } from "crypto";

export const generateFilename = (originalFilename: string): string => {
  const extension = path.extname(originalFilename);

  const baseName = path
    .basename(originalFilename, extension)
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();

  return `${randomUUID()}-${baseName}${extension}`;
};