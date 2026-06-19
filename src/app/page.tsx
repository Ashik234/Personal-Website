import HeroPage from "../components/Hero/page";
import AboutPage from "../components/About/page";
import FooterPage from "../components/layout/Footer";
import NavBarPage from "../components/layout/NavBar";
import "./globals.css";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <NavBarPage />
      <HeroPage />
      <AboutPage />
      <FooterPage />
    </main>
  );
}
