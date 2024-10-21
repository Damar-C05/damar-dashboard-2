import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Chip,
  Card,
  CardBody,
  Button,
} from "@nextui-org/react";
import moment from "moment";
import { MapComponent } from ".";

export default function ModalDetails({ isOpen, onOpenChange, data }) {
  const statusColorMap = {
    Dilaporkan: "default",
    Ditanggapi: "primary",
    Diproses: "warning",
    Selesai: "success",
  };
  return (
    <Modal
      size="4xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h3 className="text-lg font-semibold">Detail Laporan</h3>
            </ModalHeader>
            <ModalBody>
              <div className="flex items-center mb-4">
                <Chip
                  color={statusColorMap[data.status]}
                  variant="shadow"
                  className="mr-2">
                  {data.status}
                </Chip>
              </div>
              <Card>
                <CardBody>
                  <div className="grid grid-cols-2 gap-y-2">
                    <p className="mb-2 flex flex-col">
                      <strong className="mb-1">Pengirim</strong> {data.fullname}
                    </p>
                    <p className="mb-2 flex flex-col">
                      <strong className="mb-1">Lokasi</strong>{" "}
                      {data.locationName}
                    </p>
                    <p className="mb-2 flex flex-col">
                      <strong className="mb-1">Tanggal</strong>{" "}
                      {moment(data?.date?.toDate()).format("DD MMMM YYYY")}
                    </p>
                    <p className="mb-2 flex flex-col">
                      <strong className="mb-1">Area</strong> {data.area} m²
                    </p>
                    <p className="mb-2 flex flex-col">
                      <strong className="mb-1">Keluhan</strong> {data.deskripsi}
                    </p>
                  </div>
                </CardBody>
              </Card>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <img
                  src={data.image}
                  alt="Laporan"
                  className="rounded-md object-cover h-72 w-full"
                />
                <MapComponent
                  height="288px"
                  markers={[
                    {
                      lat: +data.latitude,
                      lng: +data.longitude,
                    },
                  ]}
                  latitude={+data.latitude}
                  longitude={+data.longitude}
                />
              </div>
              <Button
                variant="shadow"
                color="primary"
                className="mt-1 mb-4"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`,
                    "_blank"
                  )
                }>
                Open in Google Maps
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
