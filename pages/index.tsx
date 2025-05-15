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
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const name = formData.get("name") as string;
          const mood = Number(formData.get("mood"));
          fetch("/api/service", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, mood }),
          })
            .then((res) => res.json())
            .then((newCheckIn) => {
              setData((prev) => (prev ? [...prev, newCheckIn] : [newCheckIn]));
            });
        }}
        style={{
          maxWidth: "400px",
          margin: "20px auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="name"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            style={{
              width: "95%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="mood"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Mood (1-10):
          </label>
          <input
            type="number"
            id="mood"
            name="mood"
            min="1"
            max="10"
            required
            style={{
              width: "95%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          />
        </div>
        <button
          type="submit"
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
          }}
        >
          Submit
        </button>
      </form>
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
