import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
} from "@nextui-org/react";

export const ModalDelete = ({ isOpen, onOpenChange, data, onConfirm }) => {
  const { id } = data;

  const handleDelete = () => {
    onConfirm(id);
    onOpenChange();
  };
  return (
    <Modal
      placement="center"
      size="sm"
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h2>Konfirmasi Penghapusan</h2>
            </ModalHeader>
            <ModalBody>
              <p>Apakah Anda yakin ingin menghapus laporan ini?</p>
            </ModalBody>
            <ModalFooter>
              <Button flat auto onClick={onOpenChange}>
                Batal
              </Button>
              <Button variant="shadow" color="danger" onClick={handleDelete}>
                Hapus
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
