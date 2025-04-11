import React, { useState } from "react";
import {
  MapPin,
  Sun,
  Droplets,
  Sprout,
  X,
  ChevronDown,
  Leaf,
  Heart,
  Timer,
  Utensils,
  FlaskConical,
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

  const closeModal = () => setSelectedProduct(null);

  const [currentImage, setCurrentImage] = useState(1); 

  const toggleImage = () => {
    setCurrentImage(currentImage === 1 ? 2 : 1);
  };

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

      {/* Contact Section */}
<section className="py-16 bg-white text-center" id="contact">
  <div className="max-w-2xl mx-auto px-4">
    <h2 className="text-3xl font-bold mb-4 text-gray-900">Interested in a Plant?</h2>
    <p className="text-gray-600 mb-6">
      Feel free to contact me via email if you'd like to get your own Calabrian chili plant.
    </p>
    <button
      onClick={() => {
        navigator.clipboard.writeText("rossocalabria25@gmail.com");
        alert("Email copied to clipboard!");
      }}
      className="inline-block bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors"
    >
      Copy Email
    </button>
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
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <Droplets className="text-red-600 mt-1" size={20} />
                    <p className="text-gray-600">
                      {selectedProduct.care.water}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sun className="text-red-600 mt-1" size={20} />
                    <p className="text-gray-600">{selectedProduct.care.sun}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sprout className="text-red-600 mt-1" size={20} />
                    <p className="text-gray-600">{selectedProduct.care.soil}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Culinary Uses</h4>
                <div className="grid gap-2">
                  {selectedProduct.uses.map((use, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Utensils className="text-red-600" size={16} />
                      <p className="text-gray-600">{use}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
