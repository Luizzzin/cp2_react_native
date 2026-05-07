import { UserProvider } from '../context/UserContext';
import Home from './index';
export default function App() {
  return (
    <UserProvider>
      <Home />
    </UserProvider>
  );
}