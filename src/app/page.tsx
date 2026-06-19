import HeroPage from "../components/Hero/page";
import FooterPage from "../components/layout/Footer";
import NavBarPage from "../components/layout/NavBar";
import "./globals.css";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <NavBarPage />
      <HeroPage />
      <FooterPage />
    </main>
  );
}
