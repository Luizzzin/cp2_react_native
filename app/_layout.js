import { Slot } from "expo-router";
import { UserProvider } from "../context/UserContext";

export default function Layout() {
  return (
    <UserProvider>
      <Slot /> {/* Slot renderiza a tela atual sem nenhum estilo ou header */}
    </UserProvider>
  );
}