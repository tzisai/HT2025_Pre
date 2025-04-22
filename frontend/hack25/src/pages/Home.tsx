import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import "./Home.css"; // Asegúrate de tener este archivo CSS para estilos
function Home() {
  const { user, loading } = useAuth();
  if (loading) return <p>Cargando...</p>;

  return (
    
    <>
      <NavBar />
      <h1>Bienvenido {user?.name ? user.name : "nuevo usuario"}</h1>
      <div className="texto-chido">
      <p>This is the home page.</p>
      </div>
    </>
  );
}

export default Home;
