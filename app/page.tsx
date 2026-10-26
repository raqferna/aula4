import CatalogApp from "./CatalogApp";
import { getSitePublicConfig } from "@/lib/siteConfig";

export const dynamic = "force-dynamic";

export default function Page() {
  return <CatalogApp initialSite={getSitePublicConfig()} />;
}
