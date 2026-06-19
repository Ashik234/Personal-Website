import HeroPage from "../components/Hero/page";
import AboutPage from "../components/About/page";
import FooterPage from "../components/layout/Footer";
import NavBarPage from "../components/layout/NavBar";
import Loader from "../components/loader/Loader";
import "./globals.css";

export default function Home() {
  return (
    <Loader>
      <main className="min-h-screen w-full">
        <NavBarPage />
        <HeroPage />
        <AboutPage />
        <FooterPage />
      </main>
    </Loader>
  );
}
