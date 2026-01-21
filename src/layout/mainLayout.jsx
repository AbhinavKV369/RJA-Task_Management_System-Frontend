import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="container mt-4 min-vh-100">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
