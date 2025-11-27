import { Outlet } from "react-router-dom";
import NavBar from "./navbar";

export default function RootLayout() {
  return (
    <>
      <NavBar />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}
