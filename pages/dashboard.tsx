import { CheckIn } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const DashboardPage = () => {
  const [data, setData] = useState<CheckIn[]>();

  useEffect(() => {
    fetch("/api/service")
      .then((res) => res.json())
      .then((data: CheckIn[]) => setData(data));
  }, []);

  return (
    <div>
      <div
        style={{
          gap: "10px",
          display: "flex",
          justifyContent: "center",
          margin: "0 auto",
          maxWidth: "500px",
        }}
      >
        <Link
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            textDecoration: "none",
          }}
          href={"/"}
        >
          View Table
        </Link>
        <Link
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            textDecoration: "none",
          }}
          href={"/form"}
        >
          Fill out Form
        </Link>
      </div>
      <div
        style={{
          maxWidth: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "40px auto" }}>
          <h2 style={{ textAlign: "center" }}>Team Mood Overview By Person</h2>
          <BarChart
            width={600}
            height={400}
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis dataKey="mood" />
            <CartesianGrid stroke="#f5f5f5" />
            <Bar dataKey="mood" fill="#81b49a" />
          </BarChart>
        </div>
        <div style={{ maxWidth: "600px", margin: "40px auto" }}>
          <h2 style={{ textAlign: "center" }}>Team Mood Overview By Time</h2>
          <BarChart
            width={600}
            height={400}
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="createdAt" />
            <YAxis dataKey="mood" />
            <CartesianGrid stroke="#f5f5f5" />
            <Bar dataKey="mood" fill="#4699b5" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
