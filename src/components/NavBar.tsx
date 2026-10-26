import { usePathname } from "expo-router";
import { Appbar } from "react-native-paper";

interface NavBarProp {
  title: string;
}

export default function NavBar({ title }: NavBarProp) {
  const pathname = usePathname();
  const isDashboard = pathname === "/";

  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
      {isDashboard && <Appbar.Action icon="cog" />}
    </Appbar.Header>
  );
}
