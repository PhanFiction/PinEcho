import Nav from "./Nav/Nav"
 
export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main className="scroll-smooth mt-12">
        {children}
      </main>
    </>
  )
}