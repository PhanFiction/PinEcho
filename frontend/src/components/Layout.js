import Nav from "./Nav/Nav"
import '../styles/globals.css';
 
export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main id="main" className="scroll-smooth mt-12">
        {children}
      </main>
    </>
  )
}