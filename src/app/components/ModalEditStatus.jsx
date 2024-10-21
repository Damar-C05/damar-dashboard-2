"use client";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import { useState, useEffect } from "react";

export const ModalEditStatus = ({ isOpen, onOpenChange, data, onSubmit }) => {
  const [status, setStatus] = useState(data.status);
  const [notes, setNotes] = useState(data?.notes || "");

  useEffect(() => {
    setStatus(data.status);
    setNotes(data?.notes || "");
  }, [data]);

  const handleSubmit = () => {
    onSubmit(data.id, status, notes);
    onOpenChange();
  };

  const options = ["Diajukan", "Ditanggapi", "Diproses", "Selesai"];

  const handleSelectionChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h2>Ubah Status Laporan</h2>
            </ModalHeader>
            <ModalBody>
              <Select
                label="Pilih Status"
                selectedKeys={[status]}
                onChange={handleSelectionChange}>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </Select>
              {status === "Ditanggapi" && (
                <Input
                  label="Catatan"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Masukkan catatan"
                  required
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button flat auto onClick={onOpenChange}>
                Batal
              </Button>
              <Button color="primary" variant="shadow" onClick={handleSubmit}>
                Simpan
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
