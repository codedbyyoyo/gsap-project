import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 1024 }); // mobile + tablet

  useGSAP(() => {
    if (!isMobile) {
      // Desktop / non-mobile behavior
      const startValue = "center 60%";
      const endValue = "bottom top";

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: videoRef.current,
          start: startValue,
          end: endValue,
          scrub: true,
          pin: true,
          markers: true,
        },
      });

      videoRef.current.onloadedmetadata = () => {
        tl.to(videoRef.current, { currentTime: videoRef.current.duration });
      };
    } else {
      // Mobile / tablet behavior: just play the video normally
      videoRef.current.autoplay = true;
      videoRef.current.loop = true;
      videoRef.current.muted = true; // required for autoplay on mobile
      videoRef.current.play().catch(() => {
        console.warn("Autoplay blocked on mobile, user interaction required.");
      });
    }

    // Wait for fonts to load before splitting text
    document.fonts.ready.then(() => {
      const heroSplit = new SplitText(".title", { type: "chars, words" });
      const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

      heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

      gsap.from(heroSplit.chars, {
        yPercent: 30,
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.02,
      });

      gsap.from(paragraphSplit.lines, {
        opacity: 0,
        yPercent: 100,
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.06,
        delay: 0.5,
      });

      gsap.to(".right-leaf", { x: 200, duration: 1.5, ease: "power1.inOut" });
      gsap.to(".left-leaf", { x: -200, duration: 1.5, ease: "power1.inOut" });
    });
  }, []);

  return (
    <>
      <section id="hero">
        <div className="absolute noisy opacity-20"></div>
        <h1 className="title">MOJITO</h1>

        <img
          src="/images/hero-left-leaf.webp"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.webp"
          alt="right-leaf"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <div className="cta">
                <a href="#cocktails" className="subtitle">
                  View cocktails
                </a>
              </div>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output.mp4"
        />
      </div>
    </>
  );
};

export default Hero;
