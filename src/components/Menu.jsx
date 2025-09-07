import { allCocktails } from "../../constants/index.js";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  const contentRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(() => {
    // Animate title and cocktail details (existing animations)
    gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.fromTo(
      ".cocktail img",
      { opacity: 0, xPercent: -100 },
      { xPercent: 0, opacity: 1, duration: 1, ease: "power1.inOut" }
    );
    gsap.fromTo(
      ".details h2",
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, ease: "power1.inOut" }
    );
    gsap.fromTo(
      ".details p",
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, ease: "power1.inOut" }
    );
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#menu",
          start: "20% center",
          end: "center 50%",
          markers: true,
        },
      })
      // Fade in the whole content
      .from("#menu .content", {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power1.out",
      });
  }, [currentIndex]);

  const totalCocktails = allCocktails.length;

  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;

    setCurrentIndex(newIndex);
  };

  const getCocktailAt = (indexOffset) => {
    return allCocktails[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ];
  };

  const currentCocktail = getCocktailAt(0);

  return (
    <section id="menu" aria-labelledby="menu-heading">
      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <nav className="cocktail-tabs p-4" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={cocktail.id}
              className={`relative group ${
                isActive ? "text-white" : "text-gray-500"
              }`}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}

              <span
                className={`
      absolute bottom-0 left-0 h-1 bg-white
      transition-all duration-300 ease-out
      ${isActive ? "w-full" : "w-0"}
      group-hover:bg-yellow
    `}
              ></span>
            </button>
          );
        })}
      </nav>

      <div className="content">
        <div className="cocktail">
          <img src={currentCocktail.image} className="object-contain" />
        </div>

        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>

          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Menu;
