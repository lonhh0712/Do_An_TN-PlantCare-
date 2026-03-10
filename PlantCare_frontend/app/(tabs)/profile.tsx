import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 1. Cấu hình màu sắc từ Tailwind config
const COLORS = {
    primary: '#13ec13',
    primaryLight: 'rgba(19, 236, 19, 0.1)',
    backgroundLight: '#f6f8f6',
    white: '#ffffff',
    textPrimary: '#0f172a', // slate-900
    textSecondary: '#64748b', // slate-500
    border: '#f3f4f6', // gray-100
    green700: '#15803d',
    red50: '#fef2f2',
    red100: '#fee2e2',
    red600: '#dc2626',
};

const HEADER_BG = 'rgba(246, 248, 246, 0.95)';
const { width } = Dimensions.get('window');

interface MenuItemProps {
    icon: React.ComponentProps<typeof MaterialIcons>['name'];
    title: string;
    subtitle?: string;
    value?: string;
    isLast?: boolean;
}

// Component hiển thị từng mục Menu
const MenuItem = ({ icon, title, subtitle, value, isLast }: MenuItemProps) => (
    <View>
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuIconBox}>
                <MaterialIcons name={icon} size={24} color={COLORS.green700} />
            </View>

            <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{title}</Text>
                {subtitle ? <Text style={styles.menuSubtitle}>{subtitle}</Text> : null}
            </View>

            {value ? (
                <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{value}</Text>
                    <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
                </View>
            ) : (
                <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
            )}
        </TouchableOpacity>
        {!isLast && <View style={styles.separator} />}
    </View>
);

// Component hiển thị thống kê (Stats)
interface StatCardProps {
    icon: React.ComponentProps<typeof MaterialIcons>['name'];
    value: string;
    label: string;
}

const StatCard = ({ icon, value, label }: StatCardProps) => (
    <View style={styles.statCard}>
        <MaterialIcons name={icon} size={28} color={COLORS.primary} style={{ marginBottom: 4 }} />
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={HEADER_BG} />

            <View style={styles.header}>
                <View style={{ width: 40 }} />
                <Text style={styles.headerTitle}>Hồ sơ</Text>
                <TouchableOpacity style={styles.settingsBtn}>
                    <MaterialIcons name="settings" size={24} color={COLORS.textPrimary} />
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* --- Profile Header --- */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGSf5RR2b-lo6H4m1Etl60SlyG9dICavfu6N7Vq58oqFniHGoSKcqo9HhIFWuFIkMRKDzeoXei7aSQT7d2r2gmAf1adGU4DXqCEy7953scOW2fY4IU_ZQmH7jk7_eYjAnZiW1e9OkaOMPB1KJu23qIBq9XLJ_Me19RoYWm0KnM2TSIgI4Yul2qexZTeYdv4Zh7JsRp2LWFG8qNgKZSPwglPK3pLmdIIbZn717xQgHvcFJsGcFrxVxHpu1kRFkzAy54neBXcWUIrt2F' }}
                            style={styles.avatar}
                        />
                        <View style={styles.editBadge}>
                            <MaterialIcons name="edit" size={16} color="#000" />
                        </View>
                    </View>

                    <View style={styles.nameContainer}>
                        <Text style={styles.userName}>Nguyễn Văn A</Text>
                        <View style={styles.verifiedBadge}>
                            <MaterialIcons name="verified" size={18} color={COLORS.green700} />
                            <Text style={styles.verifiedText}>Nông dân đã xác thực</Text>
                        </View>
                    </View>
                </View>

                {/* --- Stats Section --- */}
                <View style={styles.statsContainer}>
                    <StatCard icon="qr-code-scanner" value="124" label="Lượt quét" />
                    <StatCard icon="eco" value="98" label="Khỏe mạnh" />
                    <StatCard icon="bookmark" value="12" label="Đã lưu" />
                </View>

                {/* --- Menu Groups --- */}
                <View style={styles.menuContainer}>

                    {/* Group 1: Account */}
                    <View style={styles.menuGroup}>
                        <MenuItem icon="person" title="Thông tin tài khoản" />
                        <MenuItem
                            icon="agriculture"
                            title="Cài đặt nông trại"
                            subtitle="Vị trí: ĐBSCL"
                            isLast
                        />
                    </View>

                    {/* Group 2: Activity */}
                    <View style={styles.menuGroup}>
                        <MenuItem icon="history" title="Lịch sử quét" />
                        <MenuItem icon="trending-up" title="Sở thích thị trường" isLast />
                    </View>

                    {/* Group 3: App Settings */}
                    <View style={styles.menuGroup}>
                        <MenuItem icon="language" title="Ngôn ngữ" value="Tiếng Việt" />
                        <MenuItem icon="help-outline" title="Trợ giúp & Hỗ trợ" isLast />
                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
                        <MaterialIcons name="logout" size={20} color={COLORS.red600} />
                        <Text style={styles.logoutText}>Đăng xuất</Text>
                    </TouchableOpacity>

                    <View style={styles.versionContainer}>
                        <Text style={styles.versionText}>Phiên bản 1.0.2</Text>
                    </View>
                </View>

                {/* Padding for Bottom Nav */}
                <View style={{ height: 100 }} />
            </ScrollView>



        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(246, 248, 246, 0.95)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(229, 231, 235, 0.5)',
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    settingsBtn: {
        width: 40,
        alignItems: 'flex-end',
    },

    scrollContent: {
        paddingBottom: 24,
    },

    // Profile Header
    profileHeader: {
        alignItems: 'center',
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 112, // w-28
        height: 112,
        borderRadius: 56,
        borderWidth: 4,
        borderColor: COLORS.white,
        backgroundColor: '#e5e7eb',
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.primary,
        padding: 6,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameContainer: {
        alignItems: 'center',
        gap: 8,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primaryLight,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 999,
        gap: 6,
    },
    verifiedText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#166534', // green-800
    },

    // Stats Section
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 24,
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        // shadow-sm
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        lineHeight: 28,
    },
    statLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    // Menu Section
    menuContainer: {
        paddingHorizontal: 16,
        gap: 20,
    },
    menuGroup: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 16,
    },
    menuIconBox: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: COLORS.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuContent: {
        flex: 1,
        justifyContent: 'center',
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.textPrimary,
    },
    menuSubtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    valueText: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.border,
        marginLeft: 72, // Icon width + gap + padding
    },

    // Logout
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        paddingVertical: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.red100,
        gap: 8,
        marginTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.red600,
    },
    versionContainer: {
        alignItems: 'center',
        paddingBottom: 24,
    },
    versionText: {
        fontSize: 12,
        color: '#9ca3af', // gray-400
    },

    // Bottom Nav
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80, // h-20 approx
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 20, // safe area padding
        zIndex: 50,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 56, // w-14
        paddingTop: 12,
        gap: 4,
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: COLORS.textSecondary,
    },
    fabWrapper: {
        position: 'relative',
        top: -24,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    fab: {
        width: 64, // bigger than standard nav
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: COLORS.backgroundLight,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
});