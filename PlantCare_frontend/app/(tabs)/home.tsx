import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
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

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />

            {/* Container chính */}
            <View style={styles.mainContainer}>

                {/* --- Header --- */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUdcW-BPM1qd9YHSblzEEorbxLCu2ePTK14MS3Yzigg3ET3OlkH_gUSGrb0gz2D42FJ-ciFsbcxHHL2YMigBTkoPFDYEor_QpwaN8MdJs8oJPSa8iMXbmATghUDnzGr46AxPIXPp_Oq-zxGweotxMQo4hFx0FjpK9TbjXu_sWPrhhJPVICP8AL5DkVN1GcfN9GndljUW6V2PCxTvaTpR9TWdOLNX0su7va3ar8w5tSj41XBuTPh22r19oFSTsW_V23L39MrSBRVY1x' }}
                                style={styles.avatar}
                            />
                            <View style={styles.statusDot} />
                        </View>
                        <View style={styles.headerText}>
                            <Text style={styles.headerTitle}>BẢNG ĐIỀU KHIỂN</Text>
                            <View style={styles.weatherContainer}>
                                <MaterialIcons name="wb-sunny" size={18} color="#fbbf24" />
                                <Text style={styles.weatherText}>24°C Có nắng</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.notificationBtn}>
                        <MaterialIcons name="notifications-none" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* --- Greeting --- */}
                    <View style={styles.greetingSection}>
                        <Text style={styles.greetingText}>
                            Chào buổi sáng,{'\n'}
                            <Text style={{ color: COLORS.primary }}>Nông dân John</Text> ⛅
                        </Text>
                    </View>

                    {/* --- Stats Carousel --- */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.statsScroll}
                    >
                        {/* Alert Card */}
                        <TouchableOpacity style={styles.alertCard} activeOpacity={0.9}>
                            <View style={styles.cardHeader}>
                                <View style={styles.alertIconBadge}>
                                    <MaterialIcons name="pest-control" size={20} color={COLORS.red600} />
                                </View>
                                <Text style={styles.alertBadgeText}>CẢNH BÁO CAO</Text>
                            </View>
                            <View style={styles.cardBody}>
                                <Text style={styles.cardTitle}>Nguy cơ bệnh sương mai</Text>
                                <Text style={styles.cardSubtitle}>Phát hiện trong vùng (cách 5km).</Text>
                            </View>
                            {/* Background Icon Opacity */}
                            <View style={styles.bgIconOverlay}>
                                <MaterialIcons name="warning" size={64} color={COLORS.red600} style={{ opacity: 0.1 }} />
                            </View>
                        </TouchableOpacity>

                        {/* Market Card 1: Wheat */}
                        <View style={styles.marketCard}>
                            <View style={[styles.marketIconBadge, { backgroundColor: COLORS.yellow100 }]}>
                                <MaterialIcons name="spa" size={24} color={COLORS.yellow700} />
                            </View>
                            <View>
                                <Text style={styles.marketLabel}>Lúa mì</Text>
                                <Text style={styles.marketPrice}>$240.50</Text>
                                <View style={styles.trendBadge}>
                                    <MaterialIcons name="trending-up" size={14} color={COLORS.green600} />
                                    <Text style={styles.trendText}>+2.4%</Text>
                                </View>
                            </View>
                        </View>

                        {/* Market Card 2: Corn */}
                        <View style={styles.marketCard}>
                            <View style={[styles.marketIconBadge, { backgroundColor: COLORS.orange100 }]}>
                                <MaterialCommunityIcons name="corn" size={24} color={COLORS.orange700} />
                            </View>
                            <View>
                                <Text style={styles.marketLabel}>Ngô</Text>
                                <Text style={styles.marketPrice}>$180.20</Text>
                                <View style={[styles.trendBadge, { backgroundColor: COLORS.red50 }]}>
                                    <MaterialIcons name="trending-down" size={14} color={COLORS.red600} />
                                    <Text style={[styles.trendText, { color: COLORS.red600 }]}>-1.2%</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    {/* --- Hero Action Button --- */}
                    <View style={styles.sectionPadding}>
                        <TouchableOpacity style={styles.heroButton} activeOpacity={0.9}>
                            {/* Gradient Effect would go here if animated, simplifying for RN */}
                            <View style={styles.heroContent}>
                                <View style={styles.cameraIconBg}>
                                    <MaterialIcons name="photo-camera" size={36} color={COLORS.textPrimary} />
                                </View>
                                <View style={styles.heroTextContainer}>
                                    <Text style={styles.heroTitle}>QUÉT SỨC KHỎE CÂY</Text>
                                    <Text style={styles.heroSubtitle}>Sẵn sàng nhận diện AI</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* --- Activity Summary --- */}
                    <View style={styles.sectionPadding}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Hoạt động nông trại</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAllText}>Xem tất cả</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.activityCard}>
                            <View style={styles.activityTop}>
                                <View style={styles.activityIconBg}>
                                    <MaterialIcons name="analytics" size={24} color={COLORS.blue600} />
                                </View>
                                <View style={styles.activityInfo}>
                                    <Text style={styles.activityTitle}>Tổng kết tuần</Text>
                                    <Text style={styles.activityDesc}>
                                        Bạn đã quét <Text style={{ fontWeight: 'bold' }}>12 cây</Text> tuần này. 2 vấn đề đã được xác định và lưu gợi ý xử lý.
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.activityFooter}>
                                <View style={styles.avatarGroup}>
                                    <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCLR4rcZ2kfxJGxD5oHzg_cTqcloGmlziUaduZTaSqJSn0m3AIC3RfJ-WEYPyRqlBqcXxbrgNXYX7W5bhgooixHWjVbtv0JLnU8BlubZWSxFxMr6lA_VJGn5FMAr8Av6hghahtXtCDDho8R91NHQoPB_Nzdgi7rsRcucippdjMF5HPXxjjjy-Ekn_VsiKEJxc1qkPIL-X76kcWcTGUdo76Gfaow0itdl8uM4hBjG7UMqo-_YXc6HePd5xsOGexgajFwzXy9COzivH2' }} style={styles.smallAvatar} />
                                    <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL4EOGAIok0MSv003p2K06YutbJrtftjhYdcuBeo09w1OrlaJh9X30_r_HwOde0PEY0yrFXNq07-nymgwV8lHI7xbpq5hhnDxYBt5iLJNSHj5M2sanMNLP5bbjpc4dJl31nviMJOR1ATIeW5DHuVwJLKDJHUOS4JuN2x5uSLSLociKA7eQcMNOaXpuqUB01fMA06eb4gWReCzBBI1ulV9eZpzhAs3RnW3Mg6YJgg_Fi4_VwJCC8fi2jZ7_Ullfywvn0OQLbqkL7-Vh' }} style={[styles.smallAvatar, { marginLeft: -8 }]} />
                                    <View style={[styles.smallAvatar, styles.moreAvatar, { marginLeft: -8 }]}>
                                        <Text style={styles.moreAvatarText}>+10</Text>
                                    </View>
                                </View>
                                <Text style={styles.timeText}>Cập nhật 2 giờ trước</Text>
                            </View>
                        </View>
                    </View>

                    {/* --- News Feed --- */}
                    <View style={[styles.sectionPadding, { paddingBottom: 100 }]}>
                        <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>Tin tức nông nghiệp mới nhất</Text>

                        <View style={styles.newsList}>
                            {/* News Item 1 */}
                            <TouchableOpacity style={styles.newsItem}>
                                <Image
                                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhVlJKfIeZHmBNNzfCvO6hh20yDc4YYitzmUQSVkNCxQSJi3kB3XaIsavrJiRSZuepHEGhox6Oev7TAW6SxhW5T1493jx5pPqBu_RvETvfXvCEcLzFmdtFamLcNwCtTNRl2Rp456EcEc1eg-H4Hp-W_lYwJWKdqreIKayb0v_vPb22-7TUN_Z0idZiIi09tr6PCnCEFEhmeYC0td1FnuMQZpGE7ISG9JVcuy9vihtG0-vibGBpHMIiims7ltGKz01unJnxfTOP1xys' }}
                                    style={styles.newsImage}
                                />
                                <View style={styles.newsContent}>
                                    <View>
                                        <Text style={[styles.newsTag, { color: COLORS.primary }]}>ĐỔI MỚI</Text>
                                        <Text style={styles.newsTitle} numberOfLines={2}>
                                            Công bố kỹ thuật tưới tiêu bền vững mới cho năm 2024
                                        </Text>
                                    </View>
                                    <View style={styles.newsMeta}>
                                        <MaterialIcons name="schedule" size={14} color={COLORS.textSecondary} />
                                        <Text style={styles.newsTime}>2 giờ trước</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {/* News Item 2 */}
                            <TouchableOpacity style={styles.newsItem}>
                                <Image
                                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGNRTuTRJlh6WsIv694FJ9SnZdPiV8OD7Hba2VdTdCDOxj-wOqubGHARGqnjjFfU6vhgvAAKxZB_ecnjQ8JvFmAtDhuyEgEWNUu57vgsEYkwJUMoQNGY7-bypaMb28BL7etgHSL6je4l_9A8WBK6934if_qwIu4005VYWOfZGKwXvL0tUpiLw-Ejhyk6nQKsZsu8JFmetZAnW3RwXW67ZhTvL2NMgA9NXa3mp01tVOamRj8eZwVKfggZszqcaN0Kr1Um-_JgByJ8bC' }}
                                    style={styles.newsImage}
                                />
                                <View style={styles.newsContent}>
                                    <View>
                                        <Text style={[styles.newsTag, { color: COLORS.blue600 }]}>THỊ TRƯỜNG</Text>
                                        <Text style={styles.newsTitle} numberOfLines={2}>
                                            Giá phân bón toàn cầu ổn định sau một tháng biến động
                                        </Text>
                                    </View>
                                    <View style={styles.newsMeta}>
                                        <MaterialIcons name="schedule" size={14} color={COLORS.textSecondary} />
                                        <Text style={styles.newsTime}>5 giờ trước</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {/* News Item 3 */}
                            <TouchableOpacity style={styles.newsItem}>
                                <Image
                                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChoeRep_OhVBzU-NKMGAJN1cnOXVMR_02Bm81aV-oBjJ2QcqZyuNSvH2c1_YpDV2qg-VUbA9uUnGco98VAh06baMYJt6tcb166t2DJVv3BL0pMKlwt7KXByIQByFxqkfaywTjncCYdzK9xXkUUgNk00fEA6RRpAtSEfiRCqpMMr9dlDGJ8SEDf_gFHqqYUFv-R6iPIwKde1I3bo37z6F6TVJ8EFTewBeaXYm-I8EvsrB10zDD7FVwj6TmLwHXtPC5IKsXayER_6PT1' }}
                                    style={styles.newsImage}
                                />
                                <View style={styles.newsContent}>
                                    <View>
                                        <Text style={[styles.newsTag, { color: '#a855f7' }]}>CÔNG NGHỆ</Text>
                                        <Text style={styles.newsTitle} numberOfLines={2}>
                                            Drone so với Vệ tinh: Lựa chọn nào tốt hơn cho nông trại nhỏ?
                                        </Text>
                                    </View>
                                    <View style={styles.newsMeta}>
                                        <MaterialIcons name="schedule" size={14} color={COLORS.textSecondary} />
                                        <Text style={styles.newsTime}>1 ngày trước</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>



            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
        maxWidth: 448, // max-w-md
        width: '100%',
        alignSelf: 'center',
        // shadow logic
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: 'rgba(246, 248, 246, 0.95)',
        zIndex: 50,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    statusDot: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#22c55e', // green-500
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    headerText: {
        flexDirection: 'column',
    },
    headerTitle: {
        fontSize: 10, // text-xs
        fontWeight: '600',
        color: COLORS.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    weatherContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    weatherText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    notificationBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        // shadow-sm
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },

    scrollContent: {
        paddingBottom: 24,
    },

    // Greeting
    greetingSection: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 24,
    },
    greetingText: {
        fontSize: 30, // text-3xl
        fontWeight: '800', // font-extrabold
        lineHeight: 36,
        color: COLORS.textPrimary,
    },

    // Stats Carousel
    statsScroll: {
        paddingHorizontal: 20,
        paddingBottom: 16,
        gap: 16,
    },
    alertCard: {
        width: 288, // w-72
        backgroundColor: COLORS.red50,
        borderWidth: 1,
        borderColor: COLORS.red100,
        borderRadius: 16,
        padding: 16,
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        height: 140, // approximate height to match content
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    alertIconBadge: {
        backgroundColor: COLORS.red100,
        padding: 6,
        borderRadius: 8,
    },
    alertBadgeText: {
        fontSize: 10, // text-xs
        fontWeight: 'bold',
        color: COLORS.red600,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    cardBody: {
        zIndex: 1,
    },
    cardTitle: {
        fontSize: 18, // text-lg
        fontWeight: 'bold',
        color: '#111827', // gray-900
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 14, // text-sm
        color: '#4b5563', // gray-600
    },
    bgIconOverlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 16,
        zIndex: 0,
    },

    // Market Cards
    marketCard: {
        width: 160, // w-40
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 16,
        gap: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        justifyContent: 'space-between',
        // shadow-sm
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    marketIconBadge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    marketLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textSecondary,
        marginBottom: 2,
    },
    marketPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    trendBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: COLORS.green100,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginTop: 4,
    },
    trendText: {
        fontSize: 10, // text-xs
        fontWeight: 'bold',
        color: COLORS.green600,
        marginLeft: 2,
    },

    // Hero Button
    sectionPadding: {
        paddingHorizontal: 20,
        marginBottom: 32,
    },
    heroButton: {
        width: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        padding: 4, // p-1 equivalent
        // shadow-lg shadow-green-200
        shadowColor: COLORS.green100,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 8,
    },
    heroContent: {
        paddingVertical: 24,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    cameraIconBg: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 12,
        borderRadius: 999,
    },
    heroTextContainer: {
        alignItems: 'center',
    },
    heroTitle: {
        fontSize: 20, // text-xl
        fontWeight: '800', // font-extrabold
        color: COLORS.textPrimary,
        letterSpacing: -0.5,
    },
    heroSubtitle: {
        fontSize: 14, // text-sm
        fontWeight: '500',
        color: 'rgba(17, 24, 17, 0.8)',
        marginTop: 4,
    },

    // Activity
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.primary,
    },
    activityCard: {
        backgroundColor: COLORS.white,
        borderRadius: 12, // rounded-xl
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        elevation: 1,
    },
    activityTop: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    activityIconBg: {
        backgroundColor: COLORS.blue100,
        padding: 8,
        borderRadius: 8,
    },
    activityInfo: {
        flex: 1,
    },
    activityTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    activityDesc: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 4,
        lineHeight: 18,
    },
    activityFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 12,
    },
    avatarGroup: {
        flexDirection: 'row',
    },
    smallAvatar: {
        width: 32, // size-8
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: COLORS.white,
        backgroundColor: '#e5e7eb',
    },
    moreAvatar: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
    },
    moreAvatarText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#6b7280',
    },
    timeText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#9ca3af',
    },

    // News Feed
    newsList: {
        gap: 16,
    },
    newsItem: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'flex-start',
    },
    newsImage: {
        width: 96, // w-24
        height: 96, // h-24
        borderRadius: 12, // rounded-xl
        backgroundColor: '#e5e7eb',
    },
    newsContent: {
        flex: 1,
        height: 96,
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    newsTag: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    newsTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        lineHeight: 20,
    },
    newsMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    newsTime: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },

    // Bottom Nav
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        height: 80, // h-16 + padding bottom approx
        paddingBottom: 20, // pb-safe
    },
    navItem: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        width: 48,
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: COLORS.textSecondary,
    },
    floatingBtnWrapper: {
        position: 'relative',
        top: -24, // -top-6
    },
    floatingBtn: {
        width: 56, // size-14
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        // ring-4
        borderWidth: 4,
        borderColor: COLORS.backgroundLight,
        // shadow-lg
        shadowColor: COLORS.green100,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 8,
    },
});