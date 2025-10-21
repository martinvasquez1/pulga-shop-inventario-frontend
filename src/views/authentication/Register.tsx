import { TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const testToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMywiZW1haWwiOiJjb3JyZW9AY29ycmVvLmNvbSIsInJvbGUiOiJ2ZW5kZWRvciIsImlhdCI6MTc2MDk3OTA4OH0.dcRUZpDddgMwobYV_82pYI62VkeUZIBnWFQ3_EJkvw0";

export default function Register() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: Event) {
    e.preventDefault();

    // Simple validation
    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    localStorage.setItem("jwt", testToken);
    navigate("/app");
  }

  return (
    <form onSubmit={handleSubmit} id="subscription-form">
      <TextField
        autoFocus
        required
        margin="dense"
        id="name"
        name="name"
        label="Nombre"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="email"
        name="email"
        label="Email"
        type="email"
        fullWidth
        variant="standard"
      />
      <TextField
        required
        margin="dense"
        id="password"
        name="password"
        label="Contraseña"
        type="password"
        fullWidth
        variant="standard"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        required
        margin="dense"
        id="repeatPassword"
        name="repeatPassword"
        label="Repetir Contraseña"
        type="password"
        fullWidth
        variant="standard"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
