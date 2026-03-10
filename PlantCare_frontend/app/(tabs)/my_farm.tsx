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
    backgroundLight: '#f6f8f6',
    backgroundDark: '#102210',
    white: '#ffffff',
    textPrimary: '#111811',
    textSecondary: '#6b7280', // gray-500 equivalent
    textLight: '#9ca3af', // gray-400
    border: '#e5e7eb', // gray-200

    // Status Colors
    green50: '#f0fdf4',
    green700: '#15803d',
    red50: '#fef2f2',
    red100: '#fee2e2',
    red600: '#dc2626',
    orange50: '#fff7ed',
    orange100: '#ffedd5',
    orange600: '#ea580c',
    orange700: '#c2410c',

    // Custom Grays
    grayIconBg: '#f0f4f0',
    grayIconText: '#618961',
};

const { width } = Dimensions.get('window');
const COLUMN_GAP = 16;
const PADDING_HORIZONTAL = 16;
// Tính toán chiều rộng card cho Grid 2 cột
const CARD_WIDTH = (width - (PADDING_HORIZONTAL * 2) - COLUMN_GAP) / 2;

export default function MyFarmScreen() {

    // Data giả lập cho danh sách công việc
    const tasks: {
        id: number;
        title: string;
        time: string;
        icon: React.ComponentProps<typeof MaterialIcons>['name'];
        type: string;
    }[] = [
            {
                id: 1,
                title: 'Bón phân Ngô (Lô A)',
                time: 'Ngày mai lúc 8:00 sáng',
                icon: 'water-drop',
                type: 'water'
            },
            {
                id: 2,
                title: 'Kiểm tra lá Cà phê',
                time: 'Thứ 4, 24/10 • Cả ngày',
                icon: 'agriculture',
                type: 'tractor'
            }
        ];

    // Data giả lập cho danh sách Lô đất (Plots)
    const plots = [
        {
            id: 1,
            name: 'Ruộng lúa',
            sub: 'Jasmine • Lô A',
            status: 'Khỏe mạnh',
            stage: 'Sinh trưởng',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr7pcqJ7GSRivYFLHiPVMlKn1jnt60NgxzJzBCNKph0rHE5psJCoy1rnHxmcdU8y06e2NPc2Wbon_HEnpsGeDkh5zTOeOp3EhSm-LmZbDWrr9OdzK0W_6PsVSJFj-HikRfgEmsEFmtAR9LOZfpRtkbsxhcIPuA7gNOpL0v2wVodXX3kbjVANJiCVj_DuXvvb2ySyJQPWIiG5yH6ADaPAcpYWKxA95HaXpxHjstmF7KeSWzG1LWYP2ozA-s9XzwGLi6IKheuBqcmO6i',
            isRisk: false
        },
        {
            id: 2,
            name: 'Cà phê',
            sub: 'Arabica • Lô B',
            status: 'Nguy cơ',
            stage: 'Ra quả',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWr-Mnic6_VbM-gUxAKw8YThHEhoST8vSNie9nCSp7gF5htiJ4b8cs0NeZbCcuS4Dpsnm9IaB-K7jsD9VjHrOETGnecVSs_HCoIJmNcFsfLvWHDo3EoW0NFGRqFe7zQpAppNJVuGGWMSh65hvs9XLjGEi4QcsWOk_OtTkBf4BcKevSot7IQcfcsxeExDkddrBYhmqHcq38ioAhFoeAdfObj--sA_Ij1In5WmkEmx708IU_sKXxI8FQSb9ejwi764swrk09P8l0u5re',
            isRisk: true
        },
        {
            id: 3,
            name: 'Ngô ngọt',
            sub: 'Vàng • Lô C',
            status: 'Khỏe mạnh',
            stage: 'Cây con',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl4G9Zpg2yurW8NF9KS5AD4f6IT_sIMBNXFiPTPVadf9R_u06fXyTk3EgyxGhwYblAdral16CULA2-CmxIVikJDlzZqBeQghKOGb9GarboGN3Xowj2HwZy1VWekJEPaORv_p9GmmwaH4oKy9DDCHlTX8IlECZdd3H6W5cGBcZ3mSlQIkmBupg7CCLR4lYkxq0I16zwCmtGhcVqbEp_6o9AkpPnqe0G_sDSB5LuGiYp9zVW9kgDnIQGtqlJosTcGWd5LRkdWN1k6Qnm',
            isRisk: false
        },
        {
            id: 4,
            name: 'Đậu nành',
            sub: 'Thường • Lô D',
            status: 'Khỏe mạnh',
            stage: 'Ra hoa',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGxVHjB1bWArJwoH-nu7T_isXc_x3qslXGLLC1ZXbwluF0dmHHRTx6bQmgxTOvAd__3UBUMOfGk-9jhfYYAtjwnHydRx73v516nYPIPkzB2TFibo94vQHWKJTrMMXsWF6RHcrifKZId-0xksuOUv8VmIOMJG_kFOCy21Q8vchq2fmEb1o3rJWSGQh4Ts-0rYkzh9nJkqpMBBmmhtbnK88hpVrU3v93jmCZHLJThOI_cFg0pkuLdj2rjZk0kreWIK57LhHRmTNmT4sm',
            isRisk: false
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={styles.header.backgroundColor} />

            {/* --- Header (Sticky effect simulated) --- */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe2RkWTLbh3w3J3-PRjiN1I1vH_3LLzmC5ZTh2SUcF35qruyjKwV-9AmeewrFjHI1WrN2S_FNXNtbzt75xciCMzwzJ1jv8piT1iJrOrBcCI3P4S0YDeHY3Aeiy2BoTcrWv9upQPb8iFZa2UX5ZvRZ8XjF0S0D3Ju_Jr6xhi5hBJk-V0yyjsqPdsvLqtQ3dbdlI4c1IQeH2V9cTQyC_aZjqYC2sYQkuCRpNkEynxR3a_saBlr_4q4mMDH2_q9hpK3jg939s9DaBRqie' }}
                        style={styles.avatar}
                    />
                    <Text style={styles.headerTitle}>Nông trại của tôi</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <MaterialIcons name="notifications-none" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}>
                        <MaterialIcons name="settings" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* --- Greeting --- */}
                <View style={styles.section}>
                    <Text style={styles.greetingTitle}>Chào buổi sáng, John</Text>
                    <Text style={styles.greetingSub}>Đây là tình hình trang trại của bạn hôm nay.</Text>
                </View>

                {/* --- Stats Grid (3 columns) --- */}
                <View style={styles.statsGrid}>
                    {/* Area */}
                    <View style={styles.statCard}>
                        <View style={styles.statIconCircle}>
                            <MaterialIcons name="landscape" size={20} color={COLORS.textPrimary} />
                        </View>
                        <Text style={styles.statLabel}>Diện tích</Text>
                        <View style={styles.statValueRow}>
                            <Text style={styles.statValue}>12.5 </Text>
                            <Text style={styles.statUnit}>Ha</Text>
                        </View>
                    </View>

                    {/* Crops */}
                    <View style={styles.statCard}>
                        <View style={styles.statIconCircle}>
                            <MaterialIcons name="local-florist" size={20} color={COLORS.textPrimary} />
                        </View>
                        <Text style={styles.statLabel}>Cây trồng</Text>
                        <Text style={styles.statValue}>4</Text>
                    </View>

                    {/* Alerts */}
                    <View style={[styles.statCard, styles.alertCard]}>
                        <View style={styles.alertIconCircle}>
                            <MaterialIcons name="warning" size={20} color={COLORS.red600} />
                        </View>
                        <Text style={styles.statLabel}>Cảnh báo</Text>
                        <Text style={[styles.statValue, { color: COLORS.red600 }]}>1</Text>
                    </View>
                </View>

                {/* --- Upcoming Tasks --- */}
                <View style={styles.sectionGap}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Công việc sắp tới</Text>
                        <TouchableOpacity>
                            <Text style={styles.linkText}>Xem lịch</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.taskList}>
                        {tasks.map((task) => (
                            <View key={task.id} style={styles.taskItem}>
                                <View style={styles.taskIconBox}>
                                    <MaterialIcons name={task.icon} size={24} color={COLORS.textPrimary} />
                                </View>
                                <View style={styles.taskInfo}>
                                    <Text style={styles.taskTitle} numberOfLines={1}>{task.title}</Text>
                                    <Text style={styles.taskTime}>{task.time}</Text>
                                </View>
                                <TouchableOpacity style={styles.checkBtn}>
                                    <MaterialIcons name="check" size={20} color={COLORS.textLight} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>

                {/* --- My Plots Grid --- */}
                <View style={[styles.sectionGap, { paddingBottom: 100 }]}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Các lô đất</Text>
                        <TouchableOpacity style={styles.addBtn}>
                            <MaterialIcons name="add" size={18} color={COLORS.backgroundDark} />
                            <Text style={styles.addBtnText}>Thêm mới</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.plotsGrid}>
                        {plots.map((plot) => (
                            <View
                                key={plot.id}
                                style={[
                                    styles.plotCard,
                                    plot.isRisk && styles.plotCardRisk
                                ]}
                            >
                                {/* Image Section */}
                                <View style={styles.plotImageWrapper}>
                                    <Image source={{ uri: plot.image }} style={styles.plotImage} />
                                    <View style={styles.statusBadgeWrapper}>
                                        <View style={[
                                            styles.statusBadge,
                                            plot.isRisk
                                                ? { backgroundColor: 'rgba(255,255,255,0.9)' }
                                                : { backgroundColor: 'rgba(255,255,255,0.9)' }
                                        ]}>
                                            {plot.isRisk ? (
                                                <MaterialIcons name="warning" size={14} color={COLORS.orange600} />
                                            ) : (
                                                <View style={styles.healthyDot} />
                                            )}
                                            <Text style={[
                                                styles.statusText,
                                                plot.isRisk ? { color: COLORS.orange600 } : { color: COLORS.green700 }
                                            ]}>
                                                {plot.status}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Content Section */}
                                <View style={styles.plotContent}>
                                    <View>
                                        <Text style={styles.plotName}>{plot.name}</Text>
                                        <Text style={styles.plotSub}>{plot.sub}</Text>
                                    </View>

                                    <View style={styles.stageWrapper}>
                                        <View style={[
                                            styles.stageBadge,
                                            plot.isRisk ? { backgroundColor: COLORS.orange50 } : { backgroundColor: COLORS.backgroundLight }
                                        ]}>
                                            <Text style={[
                                                styles.stageText,
                                                plot.isRisk ? { color: COLORS.orange700 } : { color: COLORS.textSecondary }
                                            ]}>
                                                {plot.stage}
                                            </Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity style={[
                                        styles.scanActionBtn,
                                        plot.isRisk ? styles.scanActionBtnRisk : styles.scanActionBtnNormal
                                    ]}>
                                        <MaterialIcons
                                            name="qr-code-scanner"
                                            size={16}
                                            color={plot.isRisk ? '#102210' : COLORS.green700}
                                        />
                                        <Text style={[
                                            styles.scanBtnText,
                                            plot.isRisk ? { color: '#102210' } : { color: COLORS.green700 }
                                        ]}>
                                            {plot.isRisk ? 'Quét ngay' : 'Quét nhanh'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

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
        borderBottomColor: COLORS.border,
        zIndex: 10,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // hover effect handled by TouchableOpacity
    },

    // Scroll Content
    scrollContent: {
        padding: 16,
        paddingBottom: 24,
    },
    section: {
        marginBottom: 24,
    },
    greetingTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    greetingSub: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textSecondary,
    },

    // Stats Grid
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    statCard: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        // shadow-sm
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        gap: 4,
    },
    alertCard: {
        borderColor: COLORS.red100,
        borderWidth: 1,
    },
    statIconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.grayIconBg,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    alertIconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.red50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textSecondary,
    },
    statValueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    statUnit: {
        fontSize: 12,
        fontWeight: '400',
        color: COLORS.textLight,
        marginLeft: 2,
    },

    // Task List
    sectionGap: {
        marginBottom: 24,
        gap: 12,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    linkText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    taskList: {
        gap: 12,
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: 12, // px-4 py-3 roughly
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        gap: 16,
    },
    taskIconBox: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: COLORS.grayIconBg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    taskInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 2,
    },
    taskTime: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.grayIconText,
    },
    checkBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Plots Grid
    addBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111811',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        gap: 4,
    },
    addBtnText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    plotsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: COLUMN_GAP,
    },
    plotCard: {
        width: CARD_WIDTH,
        backgroundColor: COLORS.white,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    plotCardRisk: {
        borderColor: COLORS.orange100,
        borderWidth: 1,
    },
    plotImageWrapper: {
        height: 128, // h-32
        position: 'relative',
    },
    plotImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    statusBadgeWrapper: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },
    healthyDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#22c55e', // green-500
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    plotContent: {
        padding: 12,
        gap: 8,
        flex: 1,
    },
    plotName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        lineHeight: 20,
    },
    plotSub: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    stageWrapper: {
        flexDirection: 'row',
        marginTop: 'auto', // push to bottom before button
    },
    stageBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    stageText: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    scanActionBtn: {
        marginTop: 8,
        width: '100%',
        height: 36,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    scanActionBtnNormal: {
        backgroundColor: 'rgba(19, 236, 19, 0.1)', // primary/10
    },
    scanActionBtnRisk: {
        backgroundColor: COLORS.primary,
    },
    scanBtnText: {
        fontSize: 12,
        fontWeight: 'bold',
    },

    // Bottom Nav
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingBottom: 20, // safe area approximation
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 10,
        zIndex: 50,
    },
    navRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 24,
    },
    navItem: {
        width: 48,
        alignItems: 'center',
        gap: 4,
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: COLORS.textLight,
    },
    fabPlaceholder: {
        width: 48, // space for fab
    },
    fab: {
        position: 'absolute',
        top: -28, // Pull up above bar
        left: width / 2 - 28, // Center horizontally
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#22c55e', // green shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
});