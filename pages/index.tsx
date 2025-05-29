import Link from "next/link";
import React, { useEffect, useState } from "react";

type CheckIn = {
  id: number;
  name: string;
  mood: number;
  createdAt: string;
};

export default function Home() {
  const [data, setData] = useState<CheckIn[]>();

  useEffect(() => {
    fetch("/api/service")
      .then((res) => res.json())
      .then((data: CheckIn[]) => setData(data));
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "100%", margin: "0 auto" }}>
      <div
        style={{
          gap: "10px",
          display: "flex",
          justifyContent: "start",
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
          href={"/form"}
        >
          Fill out Form
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
          href={"/dashboard"}
        >
          View Dashboard
        </Link>
        <button
          type="button"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "red",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => {
            fetch("/api/service", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: undefined }),
            }).then((res) => res.json());
          }}
        >
          Delete All
        </button>
      </div>
      {data && data.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#007BFF",
                color: "#fff",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>ID</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                Name
              </th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                Mood
              </th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                Created At
              </th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((checkIn) => (
              <tr
                key={checkIn.id}
                style={{
                  backgroundColor: "#f9f9f9",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  {checkIn.id}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  {checkIn.name}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  {checkIn.mood}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  {new Date(checkIn.createdAt).toLocaleString()}
                </td>
                <td>
                  <button
                    onClick={() => {
                      fetch("/api/service", {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: checkIn.id }),
                      })
                        .then((res) => res.json())
                        .then(() => {
                          setData((prev) =>
                            prev ? prev.filter((c) => c.id !== checkIn.id) : []
                          );
                        });
                    }}
                    style={{
                      backgroundColor: "#FF0000",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No check-ins available.</p>
      )}
    </div>
  );
}
