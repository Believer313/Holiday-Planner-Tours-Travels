import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{
      height: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    }}>
      
      <h1 style={{ fontSize: "80px", margin: "0", color: "#ff4d4f" }}>
        404
      </h1>

      <h2 style={{ marginTop: "10px" }}>
        Page Not Found
      </h2>

      <p style={{ color: "#666", marginBottom: "30px" }}>
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        to="/"
        style={{
          padding: "12px 25px",
          backgroundColor: "#007bff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "6px"
        }}
      >
        Go Back Home
      </Link>

    </div>
  );
}