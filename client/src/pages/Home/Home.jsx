import Navbar from "../../components/layout/Navbar";
import Hero from '../../components/landing/Hero'
import Features from "../../components/landing/Features";
import HowItWorks from "../../components/landing/HowItWorks";
import DashboardPreview from "../../components/landing/DashboardPreview";
import Footer from "../../components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks/>
      <DashboardPreview/>
      <Footer/>
    </>
  );
}