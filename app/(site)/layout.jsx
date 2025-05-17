import AppProviders from "../providers"; // adjust path as needed

export default function SiteLayout({ children }) {
  return <AppProviders>{children}</AppProviders>;
}
