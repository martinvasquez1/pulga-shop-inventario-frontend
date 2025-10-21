import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const testToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMywiZW1haWwiOiJjb3JyZW9AY29ycmVvLmNvbSIsInJvbGUiOiJ2ZW5kZWRvciIsImlhdCI6MTc2MDk3OTA4OH0.dcRUZpDddgMwobYV_82pYI62VkeUZIBnWFQ3_EJkvw0";

export default function Login() {
  const navigate = useNavigate();

  function handleSubmit(e: Event) {
    e.preventDefault();
    localStorage.setItem("jwt", testToken);
    navigate("/app");
  }

  return (
    <form onSubmit={handleSubmit} id="subscription-form">
      <TextField
        autoFocus
        required
        margin="dense"
        id="email"
        name="email"
        label="email"
        type="email"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="password"
        name="password"
        label="Password"
        type="text"
        fullWidth
        variant="standard"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
