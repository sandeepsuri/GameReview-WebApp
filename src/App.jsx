import React from "react";
import ReactDOM  from "react-dom";

//Return List of Pets
const Pets = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pets, {
      name: "Maxi",
      animal: "Dog",
      breed: "American Bulldog",
    }),
    React.createElement(Pets, {
      name: "Chewie",
      animal: "Dog",
      breed: "Poodle",
    }),
    React.createElement(Pets, {
      name: "Ronin",
      animal: "Dog",
      breed: "Labradoodle",
    }),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
