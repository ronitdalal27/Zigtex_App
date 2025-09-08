import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

export function PageMeta({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}

export function AppWrapper({ children }) {
  return <HelmetProvider>{children}</HelmetProvider>;
}

export default PageMeta;
