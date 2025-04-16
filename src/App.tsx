import React, { useState, useEffect } from "react";
import {
  MapPin,
  Sun,
  Droplets,
  Sprout,
  X,
  ChevronDown,
  Leaf,
  Heart,
  Utensils,
  CloudSun,
  Scissors,
} from "lucide-react";
import Footer from './components/Footer';
import products from "./data/data.js";

interface Product {
  id: number;
  name: string;
  description: string;
  details: string;
  care: {
    water: string;
    sun: string;
    soil: string;
  };
  uses: string[];
}

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState(1);

  const [availability, setAvailability] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const API_BASE_URL = "https://brunobusiness777-thankfulharlequinboar.web.val.run";

  const closeModal = () => setSelectedProduct(null);
  const toggleImage = () => setCurrentImage(currentImage === 1 ? 2 : 1);

  const fetchAvailability = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/availability`);
      const data = await response.json();
      setAvailability(data.available);
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  const canReserve = () => {
    const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
    const now = Date.now();
    const last24h = reservations.filter((t: number) => now - t < 24 * 60 * 60 * 1000);
    return last24h.length < 2;
  };

  const recordReservation = () => {
    const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
    reservations.push(Date.now());
    localStorage.setItem("reservations", JSON.stringify(reservations));
  };

  const handleReservation = async () => {
    if (!canReserve()) {
      alert("Du hast bereits 2 Pflanzen innerhalb der letzten 24h reserviert.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/reserve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, contact }),
      });

      if (response.ok) {
        recordReservation();
        fetchAvailability();
        setFormSubmitted(true);
      } else {
        alert("Reservierung fehlgeschlagen.");
      }
    } catch (error) {
      console.error("Fehler bei der Reservierung:", error);
      alert("Etwas ist schiefgelaufen.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
    const interval = setInterval(fetchAvailability, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <img
                src="/assets/logo.png"
                alt="Logo"
                className="h-7 w-auto p-0"
              />
              <span className="text-xl font-semibold tracking-tight">
                Rosso Calabria
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-600 hover:text-gray-900">
                Home
              </a>
              <a href="#featured" className="text-gray-600 hover:text-gray-900">
                Featured
              </a>
              <a href="#products" className="text-gray-600 hover:text-gray-900">
                Products
              </a>
              <a href="#care" className="text-gray-600 hover:text-gray-900">
                Care Guide
              </a>
              <a href="#why" className="text-gray-600 hover:text-gray-900">
                Why Us
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-16"
      >
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Rosso Calabria
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Bringing the authentic taste of Calabria to your home garden
          </p>
          <a
            href="#featured"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors"
          >
            Discover More
            <ChevronDown size={20} />
          </a>
        </div>
      </section>

      {/* Signature Product Section */}
      <section id="featured" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
          <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 relative">
      <span>Signature Product</span>
      <div className="absolute w-24 h-1 bg-gradient-to-r from-red-500 to-red-200 bottom-0 top-8 left-1/2 transform -translate-x-1/2 mt-2 rounded-full"></div>
    </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the heart of Calabrian cuisine with our authentic chili
              plant
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-black mb-6">
                Peperoncino Calabrese
              </h2>
              <p className="text-lg mb-8">
                Known for its intense heat and rich flavor, our Calabrian chili
                is cultivated using traditional methods passed down through
                generations.
              </p>
              <button
                className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors"
                onClick={() => setSelectedProduct(products[0])}
              >
                Learn More
              </button>
            </div>

            <div className="relative cursor-pointer" onClick={toggleImage}>
  <div className="relative w-full h-96 transform transition-transform duration-500">
    {/* Stacking Effect */}
    <div className="absolute top-0 left-0 w-full h-full transform -rotate-2 z-10">
      <img
        src={currentImage === 1 ? "assets/plate_front.png" : "assets/plate_back.png"}
        alt="Product Image"
        className="w-full h-full object-contain rounded-xl"
      />
    </div>
    <div className="absolute top-0 left-4 w-full h-full transform rotate-2 z-0">
      <img
        src={currentImage === 1 ? "assets/plate_front.png" : "assets/plate_back.png"}
        alt="Product Image"
        className="w-full h-full object-contain rounded-xl"
      />
    </div>
  </div>

  {/* Hinweis unter dem Bild */}
  <div className="mt-4 text-center text-sm text-gray-500 animate-pulse flex items-center justify-center gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
    </svg>
    Tap to flip image
  </div>
</div>


          </div>
        </div>
      </section>


        {/* Care Guide Section */}
      <section id="care" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 relative">
      <span>Plant Care Guide</span>
      <div className="absolute w-24 h-1 bg-gradient-to-r from-red-500 to-red-200 bottom-0 top-8 left-1/2 transform -translate-x-1/2 mt-2 rounded-full"></div>
    </h2>
          <div className="absolute w-24 h-1 bg-gradient-to-r from-red-500 to-red-200 bottom-0 top-8 left-1/2 transform -translate-x-1/2 mt-2 rounded-full"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Watering Care */}
            <div className="bg-white p-8 rounded-xl shadow animate-fade-up">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-200 p-3 rounded-full">
                  <Droplets className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold text-black-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Watering
              </h3>
              <p>
                Water your plants every 2-3 days, ensuring soil remains moist
                but not waterlogged.
              </p>
            </div>

            {/* Sunlight Care */}
            <div className="bg-white p-8 rounded-xl shadow animate-fade-up animate-delay-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-200 p-3 rounded-full">
                  <CloudSun className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold text-black-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Sunlight
              </h3>
              <p>
                Place in a sunny location with at least 6 hours of direct
                sunlight daily.
              </p>
            </div>

            {/* Repotting Care */}
            <div className="bg-white p-8 rounded-xl shadow animate-fade-up animate-delay-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-200 p-3 rounded-full">
                  <Sprout className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold text-black-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Repotting
              </h3>
              <p>
                Repot when the plant outgrows its container, typically every
                12-18 months.
              </p>
            </div>

            {/* Harvesting Care */}
            <div className="bg-white p-8 rounded-xl shadow animate-fade-up animate-delay-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-200 p-3 rounded-full">
                  <Scissors className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold text-black-600">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Harvesting
              </h3>
              <p>
                Harvest leaves regularly to encourage growth and maintain plant
                shape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 relative">
      <span>Why Rosso Calabria?</span>
      <div className="absolute w-24 h-1 bg-gradient-to-r from-red-500 to-red-200 bottom-0 top-8 left-1/2 transform -translate-x-1/2 mt-2 rounded-full"></div>
    </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-red-600" size={50} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentic Origins</h3>
              <p className="text-gray-600">
                All our seeds come directly from Calabria, ensuring the highest
                quality and true Italian heritage.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-red-600" size={50} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Naturally Grown</h3>
              <p className="text-gray-600">
                Each plant is personally grown by me from seed to maturity
                without artificial additives or pesticides.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="text-red-600" size={50} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Organic</h3>
              <p className="text-gray-600">
                100% organic plants, sustainably cultivated and free from
                chemical interventions.
              </p>
            </div>
          </div>
        </div>
      </section>

{/* Reservieren Section */}
<section className="py-16 text-center" id="contact">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 relative">
            <span>Interested In A Plant?</span>
            <div className="absolute w-24 h-1 bg-gradient-to-r from-red-500 to-red-200 bottom-0 top-8 left-1/2 transform -translate-x-1/2 mt-2 rounded-full"></div>
          </h2>

          <div className="bg-white rounded-xl p-8 shadow-lg max-w-lg mx-auto mb-8">
            <div className="mb-6">
              <p className="text-gray-800 text-xl mb-2">Currently Available Plants:</p>
              <p className="font-semibold text-3xl text-red-600">
                {availability !== null ? availability : "Loading..."}
              </p>
            </div>

            {!showForm && !formSubmitted && (
              <button
                onClick={() => setShowForm(true)}
                disabled={availability === 0}
                className={`w-full px-6 py-3 text-white font-semibold rounded-full transition-all transform ${
                  availability === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 hover:scale-105"
                }`}
              >
                Jetzt reservieren
              </button>
            )}

            {showForm && !formSubmitted && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleReservation();
                }}
                className="space-y-4 text-left"
              >
                <input
                  type="text"
                  required
                  placeholder="Vorname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 border rounded"
                />
                <input
                  type="text"
                  required
                  placeholder="Nachname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 border rounded"
                />
                <input
                  type="text"
                  required
                  placeholder="Telefonnummer oder E-Mail"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full p-3 border rounded"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-6 py-3 text-white font-semibold rounded-full transition-all transform ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 hover:scale-105"
                  }`}
                >
                  {loading ? "Reserviere..." : "Reservieren"}
                </button>
              </form>
            )}

            {formSubmitted && (
              <div className="text-center space-y-4">
                <p className="text-xl font-semibold text-green-700">Danke! 🌶️</p>
                <p className="text-gray-700">Vereinbare den Abholort per WhatsApp:</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-lg text-red-600">+49 123 456789</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("+49123456789");
                      setCopySuccess("Kopiert!");
                      setTimeout(() => setCopySuccess(""), 2000);
                    }}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Kopieren
                  </button>
                </div>
                {copySuccess && <p className="text-sm text-green-600">{copySuccess}</p>}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-semibold mb-6">
              {selectedProduct.name}
            </h3>
            <p className="text-gray-600 mb-8">{selectedProduct.details}</p>
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Plant Care</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Droplets className="text-red-500" /> {selectedProduct.care.water}
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="text-yellow-500" /> {selectedProduct.care.sun}
                  </div>
                  <div className="flex items-center gap-2">
                    <Sprout className="text-green-500" /> {selectedProduct.care.soil}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Uses</h4>
                <ul className="list-disc list-inside text-gray-700">
                  {selectedProduct.uses.map((use, i) => (
                    <li key={i}>{use}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
