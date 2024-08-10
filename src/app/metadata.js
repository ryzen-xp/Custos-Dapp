// src/app/Metadata.js

export const metadata = {
    title: "Custos Diretriz",
    description: "The new blockchain safe",
  };
  
  const Metadata = () => {
    return (
      <head>
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.png" />
      </head>
    );
  };
  
  export default Metadata;
  