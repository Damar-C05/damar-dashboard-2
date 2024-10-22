"use client";

import { useEffect, useState } from "react";
import { MapComponent } from "../components";
import { ReportMarker, StreamMarker, WarningMarker } from "../assets/icons";
import { getAllDocuments } from "../lib/firestore";
import { Marker } from "@react-google-maps/api";
import { useDisclosure, Card, CardBody } from "@nextui-org/react";
import { ModalDetails } from "../components";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [streams, setStreams] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isStream, setIsStream] = useState(false);
  const [dataStatistics, setDataStatistics] = useState({
    totalReports: "...",
    totalStreams: "...",
    totalDamagedRoads: "...",
    repairedRoads: "...",
    inProgressRoads: "...",
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchReportsAndStreams = async () => {
      const [reports, streams] = await Promise.all([
        getAllDocuments("Laporan"),
        getAllDocuments("Streams"),
      ]);
      setReports(reports);
      setStreams(streams);

      setDataStatistics({
        totalReports: reports.length,
        totalStreams: streams.length,
        totalDamagedRoads:
          reports.filter((report) => report.status !== "Selesai").length +
          streams.filter((stream) => stream.status !== "Selesai").length,
        repairedRoads:
          reports.filter((report) => report.status === "Selesai").length +
          streams.filter((stream) => stream.status === "Selesai").length,
        inProgressRoads:
          reports.filter((report) => report.status === "Diproses").length +
          streams.filter((stream) => stream.status === "Diproses").length,
      });
    };

    fetchReportsAndStreams();
  }, []);

  const handleStreamClick = (stream) => {
    setSelectedData(stream);
    setIsStream(true);
    onOpen();
  };

  const handleReportClick = (report) => {
    setSelectedData(report);
    setIsStream(false);
    onOpen();
  };

  const statistics = [
    {
      label: "Total Laporan",
      value: dataStatistics.totalReports,
    },
    {
      label: "Total Deteksi",
      value: dataStatistics.totalStreams,
    },
    {
      label: "Total Jalan Rusak",
      value: dataStatistics.totalDamagedRoads,
    },

    {
      label: "Jalan Sedang Diperbaiki",
      value: dataStatistics.inProgressRoads,
    },
    {
      label: "Jalan Sudah Diperbaiki",
      value: dataStatistics.repairedRoads,
    },
  ];

  const chartData = {
    labels: statistics.map((stat) => stat.label),
    datasets: [
      {
        label: "Jumlah",
        data: statistics.map((stat) => stat.value),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    animation: {
      duration: 1500,
      easing: "easeOutQuart",
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="p-6 pt-28 min-h-screen sm:ml-64">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
          {statistics.map((label, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2, duration: 0.5 }}
              variants={cardVariants}>
              <Card>
                <CardBody>
                  <h3 className="text text-sm text-gray-500">{label.label}</h3>
                  <h2 className="text-4xl font-semibold">{label.value}</h2>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
        <MapComponent>
          {reports
            .filter((report) => report.status !== "Selesai")
            .map((report, index) => (
              <Marker
                key={index}
                position={{
                  lat: report.latitude,
                  lng: report.longitude,
                }}
                icon={{
                  url:
                    report.status === "Diproses"
                      ? WarningMarker.src
                      : ReportMarker.src,
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
                onClick={() => handleReportClick(report)}
              />
            ))}
          {streams
            .filter((stream) => stream.status !== "Selesai")
            .map((stream, index) => (
              <Marker
                key={index}
                position={{
                  lat: stream.latitude,
                  lng: stream.longitude,
                }}
                icon={{
                  url:
                    stream.status === "Diproses"
                      ? WarningMarker.src
                      : StreamMarker.src,
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
                onClick={() => handleStreamClick(stream)}
              />
            ))}
        </MapComponent>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="my-8">
          <Bar data={chartData} options={chartOptions} />
        </motion.div>

        <ModalDetails
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          data={selectedData}
          stream={isStream}
        />
      </div>
    </>
  );
}
