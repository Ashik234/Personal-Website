import HeroPage from "../components/Hero/page";
import FooterPage from "../components/layout/Footer";
import NavBarPage from "../components/layout/NavBar";
import "./globals.css";
export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center min-h-screen">
      <div className="w-60 mt-4">
        <NavBarPage />
      </div>

      <div className="flex flex-col items-center justify-center flex-grow w-full">
        <HeroPage />
      </div>

      <FooterPage />
    </div>
  );
}
