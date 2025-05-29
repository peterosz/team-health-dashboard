import Link from "next/link";
import React from "react";

const FormPage = () => {
  return (
    <>
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
          }).then((res) => res.json());

          (e.target as HTMLFormElement).reset();
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
        <div style={{ display: "flex", gap: "10px" }}>
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
        </div>
      </form>
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
          href={"/dashboard"}
        >
          View Dashboard
        </Link>
      </div>
    </>
  );
};

export default FormPage;
