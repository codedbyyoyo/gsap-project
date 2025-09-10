import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { cocktailLists, mockTailLists } from "../../constants/index.js";

const Cocktails = () => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails",
        start: "18% center", // animation starts very early
        end: "center 50%", // finishes almost immediately as it enters
        markers: true,
        scrub: true,
      },
    });

    // Animate leaves moving out
    tl.to(
      "#c-left-leaf",
      { x: -200, y: -200, opacity: 0, ease: "power1.out" },
      0
    ).to(
      "#c-right-leaf",
      { x: 200, y: -200, opacity: 0, ease: "power1.out" },
      0
    );

    // Fade in menus
    tl.from(".popular, .loved", { opacity: 0, y: 50, ease: "power1.out" }, 0);
  });

  return (
    <section id="cocktails">
      <div className="absolute noisy opacity-20"></div>
      <img src="/images/cocktail-left-leaf.png" alt="l-leaf" id="c-left-leaf" />
      <img
        src="/images/cocktail-right-leaf.png"
        alt="r-leaf"
        id="c-right-leaf"
      />

      <div className="list">
        <div className="popular">
          <h2>Most popular cocktails:</h2>

          <ul>
            {cocktailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="md:me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="loved">
          <h2>Most loved mocktails:</h2>

          <ul>
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cocktails;
