import Navbar  from "./components/Navbar";
import Hero    from "./components/Hero";
import Works   from "./components/Works";
import Process from "./components/Process";
import About   from "./components/About";
import Skills  from "./components/Skills";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="bg-canvas overflow-hidden">
      <Navbar />
      <Hero />
      <Works />
      <Process />
      <About />
      <Skills />
      <Contact />
    </main>
  );
}
