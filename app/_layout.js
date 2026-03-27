import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
export default function Layout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#E83D84', tabBarStyle: {
        backgroundColor: '#121213', // Cor de fundo da tab bar
        paddingBottom: 5,
        paddingTop: 5,
      },
    }}>
 
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarStyle: { display: 'none' },
          href: null,
        }}
      />
 
      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
 
        <Tabs.Screen
          name="cardapio"
          options={{
            title: 'Cardapio',
            headerShown: false,
            tabBarIcon: ({ color }) => <Ionicons name="bag-add" size={24} color={color} />,
        }}
      />
 
      <Tabs.Screen
          name="TelaPagamento"
          options={{
            title: 'Pagamento',
            headerShown: false,
            tabBarIcon: ({ color }) => <Ionicons name="wallet" size={24} color={color} />,
        }}
      />
 
      <Tabs.Screen
          name="retirada"
          options={{
            title: 'Retirada',
            headerShown: false,
            tabBarIcon: ({ color }) => <Ionicons name="bag-handle" size={24} color={color} />,
        }}
      />
 
    </Tabs>
  );
}