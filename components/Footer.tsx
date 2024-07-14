import { footerLinks } from "@/constants";
import React from "react";

type ColumnProps = {
  title: string;
  link: string;
};

const FooterColumn = ({ title, link }: ColumnProps) => (
  <div className="gooter_column">
    <ul className="flex flex-col gap-2 font-normal">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        {title}
      </a>
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="flexStart footer">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col"></div>
        <div className="flex flex-wrap gap-12">
          {footerLinks.map(({ title, link }) => (
            <FooterColumn key={title} title={title} link={link} />
          ))}
        </div>
      </div>
      <p className="flex-between"> @2023 Hila Israeli </p>
    </footer>
  );
};

export default Footer;
