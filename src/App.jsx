import React from "react";
import { createRoot } from "react-dom/client";
import Pet from "./Pet";

const App = () => {
  return (
    <div>
      <h1>Adopt Me! - Pet Adoption Agency</h1>
      <Pet name="Maxi" animal="Dog" breed="American Bulldog" />
      <Pet name="Chewie" animal="Dog" breed="Poodle" />
      <Pet name="Ronin" animal="Dog" breed="Labradoodle" />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);