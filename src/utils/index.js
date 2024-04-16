export function getFileBlobUrl(file) {
  if (!file) {
      console.error('No file provided.');
      return;
  }
  // Create a Blob URL from the file
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;

}