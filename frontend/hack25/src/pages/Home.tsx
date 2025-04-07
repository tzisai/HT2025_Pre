import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

interface HomeProps {
  user: { name: string; email: string } | null;
}

function Home({ user }: HomeProps) {
  return (
    <>
      <NavBar />
      <h1>Bienvenido {user?.name ? user.name : "nuevo usuario"}</h1>
      <p>This is the home page.</p>
    </>
  );
}

export default Home;
