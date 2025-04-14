import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user, loading } = useAuth();
  if (loading) return <p>Cargando...</p>;

  return (
    <>
      <NavBar />
      <h1>Bienvenido {user?.name ? user.name : "nuevo usuario"}</h1>
      <p>This is the home page.</p>
    </>
  );
}

export default Home;
