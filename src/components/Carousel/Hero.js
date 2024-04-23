import { useState, useEffect } from "react";
import './hero.css'


function Hero() {
  const [current, setCurrent] = useState(0);
  
  const imagePaths = ['https://s3-alpha-sig.figma.com/img/0e77/a925/b3ce97f0b386a959404bc6be688c5352?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HRz523vrKY9z8tNS8hzOkYOV5FvEVd0QSCGpkAkiqr8ppKPloLQvhcpxTkx2qRaof~dqAsbX4yQYMnZavke1lmxX9yf8MM2A0j6Ds9VCiW3jJMWWNzgpN0P90Qa-tFkzwwyzMZy~tT~eZiNBWXLCqRin0QQd4cU3js2X16YeBn6PloAJcFe8TEySMqRHgJ24mGyJ5aqfkyPkBzr7MdV~omzt2YYIm7qpFpGUa848R7U9UQb15DEgjdFfCnlEFxr7PhQiyGIEwXsutkd-jCkPp5zSTeeU-WZGbUDXnCxsjpCBK9vjAyiluD8aNKvv0pxeZgIB8swZjAlKAmtqfuBnuA__', 'https://s3-alpha-sig.figma.com/img/02aa/a571/5370dacfdde75667a546c6f478317882?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PZmN6nycRluJ2mtA0yLiLPEnY8zuoWcPjMxcdeQa8aRrO7QwVuwv2eZMLQJgc2EBnbX40jf2xJd3nDdUlZbfBsfan9SgkqTBQNKLzbop1gSxlWkb30uju8Rn9ZREHDwZNuSnRq8beANXCXkVIEC0i58Q7E1KDbZtu-rMncTwTUyoAPx5tji4SukWVYxuU0FEkrSTXN7CB8AF4RTOx-nX3aXluFySw9upYVIRrAA9dEQulCEeSHUq09aCFqKz4wBMrD6mfjnzY3X9wov9I4f26K57gVUOsIoIYb3vUyqwL8R~mXkuClFrbwseIfIHF~z-CplHNPS-LjZC0vlWhfiT7A__', 'https://s3-alpha-sig.figma.com/img/c5f5/ba8a/6b9417a823c6e52aabf392adbc814fa1?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XfwfvQ7YAN1CLnOZhoQNyW5CYGo3yiNZiF9i0srQ5BLIJS9z9hIqyCsISKmFmnOKDsP5esfATkLvANaJBzIlCDema5OkMCwh64O-DbzjScz~sVS4gwlrFD2h2LBRaJ1CtT-Jnm0JCjwcQtAPThtIlX-rcOhNcFPTMttQrHSM-4b9UGP9fi9jENIM-LMm0op4zRbQySgJTGLTePztRaQI3bThLaj9bKoO40DtUuSFG2Vz3EqpOzfe5GBuC09P1jI~QxED~y55T3Ttb1Qwgl5iiKeRgqNqGK7EdIilCElyC4Zvjh8GPkL8yZi86F6xLrWZIyBKSwWQ3KU0LCE2-PP5ZA__']
  

  // const previousSlide = () => {
  //   const newIndex = (current === 0) ? (imagePaths.length - 1) : (current - 1);
  //   setCurrent(newIndex);
  // };

  const nextSlide = () => {
    const newIndex = (current === imagePaths.length - 1) ? 0 : (current + 1);
    setCurrent(newIndex);
  };
  useEffect(() => {
    const intervalId = setInterval(nextSlide, 2000); // Change slide every 5 seconds
    return () => clearInterval(intervalId); // Cleanup the interval
  }, [current]); // Re-run effect when current changes

  return (
    <div id="emotions-2" className="">
      <div
        className={`flex transition ease-out duration-40`}
        id="emotions"
        style={{
          backgroundImage: `linear-gradient(rgba(12, 12, 12, 0.4) 21.84%, rgba(12, 12, 12, 0.1) 71.03%), url(${imagePaths[current]})`,
        }}
      >
         <div className="mx-auto container text-white pt-64 pl-8">
    <div>
      SCENTS THAT COMMAND ATTENTION
    </div>
    <br/>
    <div id="hero-text" className="text-5xl">
      <p>CRAFTING FOR THE DISCERNING</p>
      <p>MAN:TIMELESS FRAGRANCES</p>
      <p>FOR EVERY OCCASION</p>
    </div>
    <button id="hero-shop" className="bg-white text-black">Shop</button>
  </div>
      </div>

      {/* <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
        <button onClick={previousSlide}>
          <BsFillArrowLeftCircleFill />
        </button>
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill />
        </button>
      </div> */}

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full mb-8">
        {imagePaths.map((imagePath, i) => (
          <div
            onClick={() => {
              setCurrent(i);
            }}
            key={"circle" + i}
            className={`rounded-full w-3 h-3 cursor-pointer  ${
              i === current ? "bg-white" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
