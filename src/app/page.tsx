import HeroPage from "../components/Hero/page";
import FooterPage from "../components/layout/Footer";
import NavBarPage from "../components/layout/NavBar";
import "./globals.css";
export default function Home() {
  return (
    <div className="w-full flex flex-col items-center space-y-8">
      <div className="w-60 mt-4">
        <NavBarPage />
      </div>
      <div className="w-full">
        <HeroPage />
      </div>
      <div className="w-full">
        <FooterPage />
      </div>
    </div>
  );
}
