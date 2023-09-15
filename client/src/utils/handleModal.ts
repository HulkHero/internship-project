export default function openModal(id:string) {
    const dialogElement = document.getElementById(id) as HTMLDialogElement | null;
    if (dialogElement) {
      dialogElement.showModal();
    }
  }