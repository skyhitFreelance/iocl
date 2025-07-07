// tenantConfig.js
import banner1 from "./assets/IOC Banners.png";
import banner2 from "./assets/IOC Banners (1).png";
import banner3 from "./assets/IOC Banners (2).png";
import banner4 from "./assets/IOC Banners (3).png";
import hpdefBanner1 from "./assets/hpdef1.png";
import hpdefBanner2 from "./assets/hpdef2.png";
import hpdefBanner3 from "./assets/hpdef3.png";
import hpdefBanner4 from "./assets/hpdef4.png";
import hpdefBanner5 from "./assets/hpdef5.png";

const tenantConfig = {
  iocl: {
    name: "IndianOil",
    tenant: "iocl",
    logo: "https://ioclclearblue.com/wp-content/uploads/2024/10/Indian-Oil-logo-min-2048x635.png",
    banners: [banner1, banner2, banner3, banner4],
    title: "IndianOil Locator/Finder | Petrol Pump",
    metaDescription:
      "Find the nearest IndianOil Clearblue dispensers and Petrol bunks. Get accurate DEF Oil Fuel Stations info for including address, contact number, timings, and map for all nearby fuel stations.",
    metaKeywords: "IndianOil Clearblue Dispensers, DEF Oil Fuel Stations, IndianOil fuel Dispensers, IndianOil petrol pump locator, IndianOil Clearblue Dispenser finder, nearest petrol pump, fuel stations on map, petrol pump contact, Clearblue Dispensers",
    favicon: "/favicon.ico",
    primaryColor: "#013d86",
    secondaryColor: "#f35e04",
    footerName: "IndianOil Clear Blue",
  },
  hpdef: {
    name: "HPDEF",
    tenant: "hpdef",
    logo: "https://hpdef.com/wp-content/uploads/2024/10/hp-def-logo-001-min.png",
    banners: [
      hpdefBanner1,
      hpdefBanner2,
      hpdefBanner3,
      hpdefBanner4,
      hpdefBanner5,
    ],
    title: "HPDEF Locator/Finder | Petrol Pump",
    metaDescription:
      "Locate HP Def AdBlue Dispensers and Petrol pumps near you. Get precise DEF Oil Fuel Stations details like address, phone number, operating hours, and directions via map.",
    metaKeywords: "HPCL Def AdBlue Dispensers, DEF Oil Fuel Stations, HP Def AdBlue Dispenser finder, HPCL fuel dispensers, HPCL petrol pump locator, HPCL station finder, nearest HPCL pump, fuel dispenser HPCL, HP petrol bunk, HPCL fuel station map",
    favicon: "/favicon-hpdef.png?v=2",
    primaryColor: "#002749",
    secondaryColor: "#eb1e25",
    footerName: "HPDEF AdBlue",
  },
};

export const getTenantConfig = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tenantQuery = urlParams.get("tenant");
  if (tenantQuery && tenantConfig[tenantQuery]) {
    return tenantConfig[tenantQuery];
  }
  const hostname = window.location.hostname.toLowerCase();
  // For example, if the URL contains "hpdef" use that config; otherwise default to IOCL
  if (hostname.includes("hpdef")) {
    return tenantConfig.hpdef;
  }
  return tenantConfig.iocl;
};

export default tenantConfig;
