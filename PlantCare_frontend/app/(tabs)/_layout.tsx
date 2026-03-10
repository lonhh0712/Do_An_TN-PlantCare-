import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
// Định nghĩa màu sắc từ Tailwind config gốc
const COLORS = {
    primary: '#13ec13',
    primaryHover: '#0fd60f',
    backgroundLight: '#f6f8f6',
    white: '#ffffff',
    textPrimary: '#111811',
    textSecondary: '#618961',
    border: '#f3f4f6', // gray-100 equivalent
    red100: '#fee2e2',
    red50: '#fef2f2',
    red600: '#dc2626',
    yellow100: '#fef9c3',
    yellow700: '#a16207',
    orange100: '#ffedd5',
    orange700: '#c2410c',
    green100: '#dcfce7',
    green600: '#16a34a',
    blue100: '#dbeafe',
    blue600: '#2563eb',
};

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: "#007BFF",
                tabBarInactiveTintColor: "#9CA3AF",
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Trang chủ",
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="my_farm"
                options={{
                    title: "Nông trại",
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="agriculture" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="scan_ai"
                options={{
                    title: "Quét AI",
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="center-focus-strong" size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="community"
                options={{
                    title: "Cộng đồng",
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="groups" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Tài khoản",
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="person" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}