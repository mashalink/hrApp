import "./App.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Person from "./components/Person.jsx";

export default function App() {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <div className="grid">
          <Person
            name="Alice"
            title="CEO"
            salary="$120,000"
            phone="+358 40 123 4567"
            email="alice@example.com"
            animal="Cat"
          />
          <Person
            name="Bob"
            title="Developer"
            salary="$80,000"
            phone="+358 40 234 5678"
            email="bob@example.com"
            animal="Dog"
          />
          <Person
            name="Karin"
            title="Designer"
            salary="$75,000"
            phone="+358 40 345 6789"
            email="karin@example.com"
            animal="Owl"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
