import { Link } from "react-router";
import { useEffect, useState } from "react";
//@ts-expect-error"Could not find a declaration file for module '../../node_modules/colorthief/dist/color-thief.mjs'."
import ColorThief from "../../node_modules/colorthief/dist/color-thief.mjs";
import { Solaxy, WattAFrame, XCharge } from "~/assets/images/applications";

type AppDataType = {
  name: string;
  href: string;
  imgSrc: string;
};

type AppElementProps = {
  className: string;
  imgSrc: string;
  href: string;
  name: string;
};

const appsdata: AppDataType[] = [
  {
    name: "XCharge",
    href: "https://xcharge.m3ter.ing/",
    imgSrc: XCharge.img.src,
  },
  {
    name: "Watt-A-Frame",
    href: "https://watt-a-frame.vercel.app/",
    imgSrc: WattAFrame.img.src,
  },
  {
    name: "Solaxy",
    href: "https://asset.m3ter.ing/",
    imgSrc: Solaxy.img.src,
  },
  {
    name: "XCharge",
    href: "https://xcharge.m3ter.ing/",
    imgSrc: XCharge.img.src,
  },
  {
    name: "Watt-A-Frame",
    href: "https://watt-a-frame.vercel.app/",
    imgSrc: WattAFrame.img.src,
  },
  {
    name: "Solaxy",
    href: "https://asset.m3ter.ing/",
    imgSrc: Solaxy.img.src,
  },
];

const Applications: React.FC = () => {
  return (
    <section className="activity-container w-full mb-[100px] text-[20px] font-semibold p-4">
      {appsdata.map((app, i) => (
        <AppElement
          key={i}
          name={app.name}
          imgSrc={app.imgSrc}
          href={app.href}
          className={`img-${i}`}
        />
      ))}
    </section>
  );
};
export default Applications;

const AppElement: React.FC<AppElementProps> = ({
  name,
  href,
  className,
  imgSrc,
}) => {
  const [gradientColor, setGradientColor] = useState("transparent");
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (imgSrc) {
      const colorThief = new ColorThief();
      const img = new Image();
      img.crossOrigin = "Anonymous";

      img.onload = () => {
        try {
          // Get dominant color
          const color = colorThief.getColor(img);
          setGradientColor(`rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.85)`);
          setIsLoaded(true);
        } catch (e) {
          console.error("Color extraction failed:", e);
          // Use fallback color if extraction fails
          setGradientColor("rgba(0, 0, 0, 0.5)");
          setIsLoaded(true);
        }
      };

      img.src = imgSrc;
    } else {
      // No background image, use fallback
      setGradientColor("rgba(0, 0, 0, 0.5)");
      setIsLoaded(true);
    }
  }, [imgSrc]);
  return (
    <Link
      to={href}
      aria-label={`Open ${name}`}
      className={`${className} app-container`}
      target="_blank"
      style={{
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className={`overlay p-2`}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: `linear-gradient(to bottom, transparent, ${gradientColor})`,
          opacity: isLoaded ? "1" : "0",
          transition: "opacity 0.3s ease",
        }}
      >
        <p className={`sm:text-[18px] text-[13px]`}>{name}</p>
      </div>
    </Link>
  );
};
