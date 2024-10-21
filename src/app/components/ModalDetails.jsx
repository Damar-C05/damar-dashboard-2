import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import moment from "moment";

export default function ModalDetails({ isOpen, onOpenChange, data }) {
  return (
    <>
      <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h3 className="text-lg font-semibold">Detail Laporan</h3>
              </ModalHeader>
              <ModalBody>
                <p>
                  <strong>Pengirim:</strong> {data.fullname}
                </p>
                <p>
                  <strong>Lokasi:</strong> {data.locationName}
                </p>
                <p>
                  <strong>Keluhan:</strong> {data.deskripsi}
                </p>
                <p>
                  <strong>Area:</strong> {data.area} m²
                </p>
                <p>
                  <strong>Tanggal:</strong>{" "}
                  {moment(data?.date?.toDate()).format(
                    "DD MMMM YYYY"
                  )}
                </p>
                <img
                  src={data.image}
                  alt="Laporan"
                  className="mt-4 rounded-md object-cover h-52  w-full mb-4"
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
