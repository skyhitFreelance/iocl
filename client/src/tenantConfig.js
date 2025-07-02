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
import ioclFavicon from "./assets/favicon.ico";
import hpdefFavicon from "./assets/favicon.png";

const tenantConfig = {
  iocl: {
    name: "IndianOil",
    tenant: "iocl",
    logo: "https://cdn4.singleinterface.com/files/outlet/logo/99528/Logo_jpg.jpg",
    banners: [banner1, banner2, banner3, banner4],
    title: "IndianOil Locator/Finder | Petrol Pump",
    metaDescription:
      "Find closest IndianOil fuel station. Get accurate fuel station information e.g. address, phone no, map & timings.",
    favicon: ioclFavicon,
    primaryColor: "#013d86",
    secondaryColor: "#f35e04",
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
      "Find closest HPDEF fuel station. Get accurate fuel station information e.g. address, phone no, map & timings.",
    favicon: hpdefFavicon,
    primaryColor: "#002749",
    secondaryColor: "#eb1e25",
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
