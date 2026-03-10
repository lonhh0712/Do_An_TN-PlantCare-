import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// 1. Cấu hình màu sắc từ Tailwind config
const COLORS = {
    primary: '#13ec13',
    primaryLight: 'rgba(19, 236, 19, 0.1)',
    backgroundLight: '#f6f8f6',
    backgroundDark: '#102210',
    white: '#ffffff',
    textPrimary: '#111811',
    textSecondary: '#618961', // Màu xanh rêu nhạt cho text phụ
    textGray: '#9ca3af',
    border: '#f3f4f6', // gray-100
    gray50: '#f9fafb',
};

const { width } = Dimensions.get('window');

export default function CommunityScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* --- Sticky Header Area (Nav + Search + Filters) --- */}
            <View style={styles.stickyHeader}>

                {/* Top App Bar */}
                <View style={styles.topAppBar}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCGuMcAKaG0HkDCb7E10Lftl8ZJa2cKSkWpHjhVFn0gmgKVGLAFqBe_v7ZiTtRAKYW8FU1P00yk-r5o70mgSB69uD4aAaTMEpw83EcwsPPkN8rT-9PXhzj1jrg36aSXKVqZBqKZb4kFrDs95qOP7ukAOLqpgLIw7QP-JlMgTHSDphOkA7WNL46cWH0nBvTx2UiGy1Rtkfj-6n6ZTPok7QvNU99MsRz3rsW6G0hXX0QzRfL6nMqy7gKtgmK6IyhczXdox-gQROQOv_D' }}
                            style={styles.userAvatar}
                        />
                    </View>
                    <Text style={styles.headerTitle}>Cộng đồng</Text>
                    <TouchableOpacity style={styles.notificationBtn}>
                        <MaterialIcons name="notifications-none" size={24} color={COLORS.textPrimary} />
                        <View style={styles.redDot} />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchWrapper}>
                        <View style={styles.searchIconBox}>
                            <MaterialIcons name="search" size={24} color={COLORS.textSecondary} />
                        </View>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Tìm kiếm sâu bệnh, cây trồng..."
                            placeholderTextColor={COLORS.textSecondary}
                        />
                    </View>
                </View>

                {/* Filter Chips */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterContainer}
                >
                    {/* Active Chip */}
                    <TouchableOpacity style={[styles.chip, styles.chipActive]}>
                        <Text style={styles.chipTextActive}>Bảng tin</Text>
                    </TouchableOpacity>

                    {/* Inactive Chips */}
                    <TouchableOpacity style={styles.chip}>
                        <Text style={styles.chipText}>Ngô</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={16} color={COLORS.textPrimary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.chip}>
                        <Text style={styles.chipText}>Đậu nành</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={16} color={COLORS.textPrimary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.chip}>
                        <Text style={styles.chipText}>Miền Tây</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={16} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {/* --- Main Feed Content --- */}
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Post 1 */}
                <View style={styles.postCard}>
                    {/* Post Header */}
                    <View style={styles.postHeader}>
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBq-ymCTMp6kOvaNStcrNy6WnEBUkP_vubZT7iHmYWJbyYFRPCJ1hltZpDBURyFI58h8H7GQOTmXu1UujUyn63X3ViyQKXWBrwem0s1M2rJFv8hKDk77alvslupLj0J3yHOJqhAwF3H4GVzOE0wnEtt6G1GD8yHEFUwzUvihf8ECxFy76FId91t2WekFuxW2f6-xW6gI5l_SUnpO1Q9K19hA2TqSicLgPrI7wqo0CAYyVlbKdgBnSP8Q52AGR0dWGGsu5b-uLrzYEW_' }}
                            style={styles.postAvatar}
                        />
                        <View style={styles.postMeta}>
                            <Text style={styles.postAuthor}>Marcus Miller</Text>
                            <View style={styles.postLocationRow}>
                                <MaterialIcons name="location-on" size={12} color={COLORS.textSecondary} />
                                <Text style={styles.postLocationText}>Iowa, USA • 2 giờ trước</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.moreBtn}>
                            <MaterialIcons name="more-horiz" size={24} color={COLORS.textGray} />
                        </TouchableOpacity>
                    </View>

                    {/* Post Content */}
                    <View style={styles.postBody}>
                        <Text style={styles.postText}>
                            Tôi thấy lá ngô phía dưới bị vàng. Đây là do thiếu đạm hay bệnh gì khác? Độ ẩm đất vẫn tốt. <Text style={styles.hashtag}>#SứcKhỏeNgô #HỗTrợNôngNghiệp</Text>
                        </Text>
                    </View>

                    {/* Post Image */}
                    <Image
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsSi6gkKGycFaiA1Jqtmawia8V7IqF3ZIbYqwCSCzFET7FWMo24lj8ZCcPsQ21fad4O24xQ0TWkSh2IoE9fvQS24iA2OlDBMWnPHKrutCKjhA1wKta3y_aic1RAO231KW8B_TUd7vWZcym6_p6fSyuhIb4w4Xf_j2Ku4OH3_QCAhSqmxTxwl_9XxLQcTJQ5hiciICVt2_mqJHHV-MWagwq-mAEHGS3_l0NcKp_mnG0Po8CEvOf4F4PO6oTfq-IpbQcbXixsoRDan4D' }}
                        style={styles.postImage}
                        resizeMode="cover"
                    />

                    {/* Reaction Bar */}
                    <View style={styles.reactionBar}>
                        <TouchableOpacity style={styles.reactionBtn}>
                            <MaterialIcons name="favorite-border" size={22} color={COLORS.textGray} />
                            <Text style={styles.reactionCount}>24</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.reactionBtn}>
                            <MaterialIcons name="chat-bubble-outline" size={22} color={COLORS.textGray} />
                            <Text style={styles.reactionCount}>12</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.helpfulBtn}>
                            <MaterialIcons name="eco" size={20} color={COLORS.primary} />
                            <Text style={styles.helpfulText}>Hữu ích (8)</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Post 2 */}
                <View style={styles.postCard}>
                    {/* Post Header */}
                    <View style={styles.postHeader}>
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3buHy1a8P7zMvRM7ZU2cfAxWlyzu02m8M6HPgpP6A96RXFEO731DbCTi1En26k3Kec43RPk2v1-brpzm_dYsh66nNhrn2mlSAQEQQuVnXX5kqyvcrvYiEj-q0Y9Byfwar3AbcFbCoxFb3FwBEbicKsxrxpKYmQMK53Eh7bn9jaYfqtj0_xKqhVvcS8KTGUqzQITOsUgEvS_TStQsgEpLb8gifl8HCjmxNPRYTX3gDWSAczCfgB_GQW4J24OdFMMj3yoPfWbjDQXQi' }}
                            style={styles.postAvatar}
                        />
                        <View style={styles.postMeta}>
                            <Text style={styles.postAuthor}>Sarah Chen</Text>
                            <View style={styles.postLocationRow}>
                                <MaterialIcons name="location-on" size={12} color={COLORS.textSecondary} />
                                <Text style={styles.postLocationText}>Punjab, Ấn Độ • 5 giờ trước</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.moreBtn}>
                            <MaterialIcons name="more-horiz" size={24} color={COLORS.textGray} />
                        </TouchableOpacity>
                    </View>

                    {/* Post Content */}
                    <View style={styles.postBody}>
                        <Text style={styles.postText}>
                            Sắp đến vụ thu hoạch lúa mì. Giá cả tuần này có vẻ ổn định. Mọi người có thấy xu hướng tương tự không? <Text style={styles.hashtag}>#CậpNhậtThịTrường #MùaLúaMì</Text>
                        </Text>
                    </View>

                    {/* Post Image */}
                    <Image
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAfHuJKk1tYm_3JBPJZaMvW35S2Z6cddXphcjk9EnJk9lHK-4exQZfAlcEl2w7rbytp2bomE3ljkAq6Hs1_zo-59j9NniJ32hDZWnCW94aDpiR1tEcViwkYmh2XEpYRlxYikpjeKZEHYR6YDRcbdRrKB3x7ZIEYX_eX2izsLuuXqzeIF91bzjzn5zxnL0BGEUcxY_TwmZRtrztB8NWfcSjcMy26Id4QkVfLJe0oS8g0qGKubO6WgKPyEF2CtXU7JfHx_HAAtk1PWFo' }}
                        style={styles.postImage}
                        resizeMode="cover"
                    />

                    {/* Reaction Bar */}
                    <View style={styles.reactionBar}>
                        <TouchableOpacity style={styles.reactionBtn}>
                            <MaterialIcons name="favorite-border" size={22} color={COLORS.textGray} />
                            <Text style={styles.reactionCount}>45</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.reactionBtn}>
                            <MaterialIcons name="chat-bubble-outline" size={22} color={COLORS.textGray} />
                            <Text style={styles.reactionCount}>3</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.helpfulBtnInactive}>
                            <MaterialIcons name="eco" size={20} color={COLORS.textGray} />
                            <Text style={styles.helpfulTextInactive}>Hữu ích (2)</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Padding for FAB and Bottom Nav */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* --- Floating Action Button (FAB) --- */}
            <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
                <MaterialIcons name="add" size={32} color={COLORS.white} />
            </TouchableOpacity>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },

    // Sticky Header
    stickyHeader: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // backdrop-blur simulation
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        paddingBottom: 12,
        zIndex: 10,
    },
    topAppBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        justifyContent: 'space-between',
    },
    avatarContainer: {
        width: 40,
        height: 40,
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginLeft: 12,
    },
    notificationBtn: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    redDot: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444', // red-500
    },

    // Search
    searchContainer: {
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        // shadow-sm
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    searchIconBox: {
        paddingLeft: 16,
        justifyContent: 'center',
    },
    searchInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 8,
        fontSize: 14,
        color: COLORS.textPrimary,
    },

    // Filter Chips
    filterContainer: {
        paddingHorizontal: 16,
        gap: 8,
        paddingVertical: 4,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        paddingHorizontal: 16,
        borderRadius: 999,
        backgroundColor: COLORS.border,
        gap: 4,
    },
    chipActive: {
        backgroundColor: COLORS.primary,
    },
    chipText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textPrimary,
    },
    chipTextActive: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.white,
    },

    // Main Feed
    scrollContent: {
        padding: 16,
        gap: 16,
    },
    postCard: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        // shadow-sm
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        overflow: 'hidden',
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 12,
    },
    postAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e5e7eb',
    },
    postMeta: {
        flex: 1,
        justifyContent: 'center',
    },
    postAuthor: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        lineHeight: 18,
    },
    postLocationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
        gap: 2,
    },
    postLocationText: {
        fontSize: 11,
        fontWeight: '500',
        color: COLORS.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    moreBtn: {
        padding: 4,
    },
    postBody: {
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    postText: {
        fontSize: 14,
        color: COLORS.textPrimary,
        lineHeight: 22,
    },
    hashtag: {
        color: COLORS.primary,
        fontWeight: '500',
    },
    postImage: {
        width: '100%',
        aspectRatio: 16 / 9,
        backgroundColor: '#e5e7eb',
    },
    reactionBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 16,
    },
    reactionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        padding: 4,
    },
    reactionCount: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.textSecondary,
    },
    helpfulBtn: {
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: COLORS.primaryLight,
        borderRadius: 999,
    },
    helpfulText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    helpfulBtnInactive: {
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: COLORS.gray50,
        borderRadius: 999,
    },
    helpfulTextInactive: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#6b7280', // gray-500
    },

    // FAB
    fab: {
        position: 'absolute',
        bottom: 96, // 24px above nav (approx)
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
        zIndex: 50,
    },

    // Bottom Nav
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80, // h-20 approx
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 24, // safe area
        zIndex: 50,
    },
    navItem: {
        alignItems: 'center',
        gap: 4,
        width: 56,
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: '#9ca3af',
    },
});