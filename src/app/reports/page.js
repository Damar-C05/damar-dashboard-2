"use client";

import { useState, useEffect, useMemo } from "react";
import {
  getAllDocuments,
  updateStatusDocument,
  deleteDocument,
} from "../lib/firestore";
import {
  Button,
  Pagination,
  Table,
  TableHeader,
  TableColumn,
  TableCell,
  TableBody,
  TableRow,
  useDisclosure,
  Chip,
  Tooltip,
  Spinner,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import moment from "moment";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { ModalDetails, ModalEditStatus, ModalDelete } from "../components";

const ActionButton = ({ icon: Icon, tooltipText, onClick, color }) => (
  <Tooltip color={color} content={tooltipText} placement="top">
    <Button
      isIconOnly
      color={color}
      aria-label={tooltipText}
      variant="light"
      onPress={onClick}>
      <Icon
        className={`text-xl ${
          color === "danger" ? "text-red-500" : "text-gray-500"
        }`}
      />
    </Button>
  </Tooltip>
);

export default function Reports() {
  const [data, setData] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("newest");
  const rowsPerPage = 4;

  const {
    isOpen: isDetailsOpen,
    onOpen: onDetailsOpen,
    onOpenChange: onDetailsOpenChange,
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllDocuments("Laporan");
      setData(result);
      setLoading(false); // Move loading false here to ensure loading only stops after data is fetched
    };
    fetchData();
  }, []);

  const handleSelectReport = (report) => {
    setSelectedReport(report);
    onDetailsOpen();
  };

  const handleEditStatus = (report) => {
    setSelectedReport(report);
    onEditOpen();
  };

  const handleUpdateStatus = async (id, newStatus, notes) => {
    await updateStatusDocument("Laporan", id, newStatus, notes);
    const result = await getAllDocuments("Laporan");
    setData(result);
    onEditOpenChange();
  };

  const handleDeleteOpen = (report) => {
    setSelectedReport(report);
    onDeleteOpen();
  };

  const handleDeleteReport = async (id) => {
    await deleteDocument("Laporan", id);
    const result = await getAllDocuments("Laporan");
    setData(result);
    onDeleteOpenChange();
  };

  const pages = Math.ceil(data.length / rowsPerPage);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    const sorted = [...data];

    if (sortCriteria === "oldest") {
      return sorted.sort((a, b) => a.date.toDate() - b.date.toDate());
    } else if (sortCriteria === "newest") {
      return sorted.sort((a, b) => b.date.toDate() - a.date.toDate());
    } else if (sortCriteria === "smallest") {
      return sorted.sort((a, b) => a.area - b.area);
    } else if (sortCriteria === "largest") {
      return sorted.sort((a, b) => b.area - a.area);
    } else if (sortCriteria === "pengirim") {
      return sorted.sort((a, b) => a.fullname.localeCompare(b.fullname));
    } else if (sortCriteria === "status") {
      return sorted.sort((a, b) => a.status.localeCompare(b.status));
    }

    return sorted; // Default return
  }, [data, sortCriteria]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedData.slice(start, end);
  }, [page, sortedData]);

  const statusColorMap = {
    Dilaporkan: "default",
    Ditanggapi: "primary",
    Diproses: "warning",
    Selesai: "success",
  };

  console.log(sortCriteria);

  return (
    <div className="p-6 pt-28 min-h-screen sm:ml-64">
      <div className="flex flex-col md:flex-row gap-x-4 md:w-1/3">
        <Input
          label="Cari berdasarkan pengirim"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
          aria-label="Search by sender"
          variant="bordered"
        />

        <Select
          label="Urutkan dari"
          selectedKeys={[sortCriteria]}
          onChange={(e) => setSortCriteria(e.target.value)}
          className="mb-4"
          aria-label="Sort"
          variant="bordered">
          <SelectItem key="newest">Terbaru</SelectItem>
          <SelectItem key="oldest">Paling Lama</SelectItem>
          <SelectItem key="largest">Luas Lubang Terbesar</SelectItem>
          <SelectItem key="smallest">Luas Lubang Terkecil</SelectItem>
          <SelectItem key="fullname">Sender</SelectItem>
          <SelectItem key="status">Status</SelectItem>
        </Select>
      </div>

      <Table
        aria-label="Laporan Jalan Rusak"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }>
        <TableHeader>
          <TableColumn>Tanggal</TableColumn>
          <TableColumn>Pengirim</TableColumn>
          <TableColumn>Lokasi</TableColumn>
          <TableColumn>Keluhan</TableColumn>
          <TableColumn>Area (m²)</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={loading}
          loadingContent={<Spinner label="Loading..." />}>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {moment(item?.date.toDate()).format("llll")}
              </TableCell>
              <TableCell>{item.fullname}</TableCell>
              <TableCell>{item.locationName}</TableCell>
              <TableCell>{item.deskripsi}</TableCell>
              <TableCell>{item.area}</TableCell>
              <TableCell>
                <Chip
                  className="uppercase text-xs text-gray-600 font-bold"
                  color={statusColorMap[item.status]}
                  variant="dot">
                  {item.status}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  <ActionButton
                    icon={IoEyeOutline}
                    tooltipText="Lihat Detail"
                    onClick={() => handleSelectReport(item)}
                    color="default"
                  />
                  <ActionButton
                    icon={AiOutlineEdit}
                    tooltipText="Ubah Status"
                    onClick={() => handleEditStatus(item)}
                    color="default"
                  />
                  <ActionButton
                    icon={FiTrash2}
                    tooltipText="Hapus Laporan"
                    onClick={() => handleDeleteOpen(item)}
                    color="danger"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedReport && (
        <ModalDetails
          isOpen={isDetailsOpen}
          onOpenChange={onDetailsOpenChange}
          data={selectedReport}
        />
      )}

      {selectedReport && (
        <ModalEditStatus
          isOpen={isEditOpen}
          onOpenChange={onEditOpenChange}
          data={selectedReport}
          onSubmit={handleUpdateStatus}
        />
      )}

      {selectedReport && (
        <ModalDelete
          isOpen={isDeleteOpen}
          onOpenChange={onDeleteOpenChange}
          data={selectedReport}
          onConfirm={handleDeleteReport}
        />
      )}
    </div>
  );
}
