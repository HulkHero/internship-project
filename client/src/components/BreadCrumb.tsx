import React from "react";
import { Link, Route } from "react-router-dom";

const Breadcrumbs = ({ route }:{route:string}) => {
  

  const pathSegments = route.split("/").filter((segment) => segment !== "");

   const breadcrumbs = pathSegments.map((segment, index) => {
    if (segment === "company" && index === 0) {
      // Skip creating a breadcrumb for the "company" segment when it's the first segment
      if (pathSegments.length === 1) {

        return {
            label: "Dashboard",
            href: "/company/",
        };
      }
      return null;
    }

    return {
      label: segment,
      href: `/${pathSegments.slice(0, index + 1).join("/")}`,
    };
  }).filter((breadcrumb) => breadcrumb !== null);

  return (
    <ul className="flex gap-2">
    {breadcrumbs.map((breadcrumb, index) => (
      <li className="text-sm breadcrumbs bg-textDark px-3 py-2 rounded-xl" key={index}>
        <Link to={breadcrumb?.href||""}>{breadcrumb?.label}</Link>
      </li>
    ))}
  </ul>
  );
};

export default Breadcrumbs;
