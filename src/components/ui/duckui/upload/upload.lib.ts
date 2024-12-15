import { FileType } from "./upload.constants";

export const getFileType = (file: Blob | null): FileType => {
  if (!file) return FileType.Unknown;
  if (file.type.startsWith("audio/")) return FileType.Audio;
  if (file.type.startsWith("text/")) return FileType.Text;
  if (file.type.startsWith("image/")) return FileType.Image;
  if (file.type.startsWith("video/")) return FileType.Video;
  if (file.type.startsWith("application/pdf")) return FileType.Pdf;
  return FileType.Unknown;
};
