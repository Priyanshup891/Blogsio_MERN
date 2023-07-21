import React, { useState } from "react";
import "./categories.css";

const Categories = ({ setSelectCatelory }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="categoriesWrapper">
      <button
        style={
          active === 0
            ? { backgroundColor: "#000", color: "#fff" }
            : { backgroundColor: "transparent", color: "#000" }
        }
        className="categoriesChip"
        onClick={() => {
          setSelectCatelory("all");
          setActive(0);
        }}
      >
        All
      </button>
      <button
        style={
          active === 1
            ? { backgroundColor: "#000", color: "#fff" }
            : { backgroundColor: "transparent", color: "#000" }
        }
        className="categoriesChip"
        onClick={() => {
          setSelectCatelory("culture");
          setActive(1);
        }}
      >
        Culture
      </button>
      <button
        style={
          active === 3
            ? { backgroundColor: "#000", color: "#fff" }
            : { backgroundColor: "transparent", color: "#000" }
        }
        className="categoriesChip"
        onClick={() => {
          setSelectCatelory("creativity");
          setActive(3);
        }}
      >
        Creativity
      </button>
      <button
        style={
          active === 4
            ? { backgroundColor: "#000", color: "#fff" }
            : { backgroundColor: "transparent", color: "#000" }
        }
        className="categoriesChip"
        onClick={() => {
          setSelectCatelory("food");
          setActive(4);
        }}
      >
        Food
      </button>
      <button
        style={
          active === 5
            ? { backgroundColor: "#000", color: "#fff" }
            : { backgroundColor: "transparent", color: "#000" }
        }
        className="categoriesChip"
        onClick={() => {
          setSelectCatelory("travel");
          setActive(5);
        }}
      >
        Travel
      </button>
      <button
        style={
          active === 6
            ? { backgroundColor: "#000", color: "#fff" }
            : { backgroundColor: "transparent", color: "#000" }
        }
        className="categoriesChip"
        onClick={() => {
          setSelectCatelory("entertainment");
          setActive(6);
        }}
      >
        Entertainment
      </button>
      <button
        style={
          active === 7
            ? { backgroundColor: "#000", color: "#fff" }
            : { backgroundColor: "transparent", color: "#000" }
        }
        className="categoriesChip"
        onClick={() => {
          setSelectCatelory("music");
          setActive(7);
        }}
      >
        Music
      </button>
    </div>
  );
};

export default Categories;
