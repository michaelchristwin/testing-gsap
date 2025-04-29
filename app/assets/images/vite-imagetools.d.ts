declare module "*&as=picture" {
  const metadata: {
    sources: {
      [key: string]: string; // e.g. { webp: "...srcset..." }
    };
    img: {
      src: string;
      w: number;
      h: number;
    };
  };
  export default metadata;
}
