export default function download(data: BlobPart, fileName: string) {
  const blob = new Blob([data]);
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", fileName); // `user_${new Date().getTime()}.xlsx`
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
}
