import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans antialiased">
      <Header />
      <main className="flex-1 flex flex-col">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}
