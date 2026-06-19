import HeroPage from "../components/Hero/page";
import AboutPage from "../components/About/page";
import ExperiencePage from "../components/Experience/page";
import EducationPage from "../components/Education/page";
import AwardsPage from "../components/Awards/page";
import ProjectsPage from "../components/Projects/page";
import ContactPage from "../components/Contact/page";
import FooterPage from "../components/layout/Footer";
import NavBarPage from "../components/layout/NavBar";
import Loader from "../components/loader/Loader";
import ConsoleGreeting from "../components/easter-eggs/ConsoleGreeting";
import NameConfetti from "../components/easter-eggs/NameConfetti";
import CustomCursor from "../components/interactions/CustomCursor";
import "./globals.css";

export default function Home() {
  return (
    <Loader>
      <main className="min-h-screen w-full">
        <NavBarPage />
        <HeroPage />
        <AboutPage />
        <ExperiencePage />
        <EducationPage />
        <AwardsPage />
        <ProjectsPage />
        <ContactPage />
        <FooterPage />
      </main>
      <ConsoleGreeting />
      <NameConfetti />
      <CustomCursor />
    </Loader>
  );
}
