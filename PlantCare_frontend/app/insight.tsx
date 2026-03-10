import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// 1. Cấu hình màu sắc từ Tailwind config của bạn
const COLORS = {
    primary: '#13ec13',
    primaryDarkText: '#052e05',
    backgroundLight: '#f6f8f6',
    backgroundDark: '#102210',
    slate900: '#0f172a',
    slate600: '#475569',
    slate500: '#64748b',
    slate300: '#cbd5e1', // Màu cho indicator chưa active
    white: '#ffffff',
};

const { width } = Dimensions.get('window');

export default function OnboardingScreenStep2() {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />

            {/* Container chính giới hạn chiều rộng giống max-w-md */}
            <View style={styles.contentContainer}>


                {/* --- Scrollable/Content Area --- */}
                <View style={styles.mainContent}>

                    {/* Illustration Section */}
                    <View style={styles.imageSection}>
                        <View style={styles.imageWrapper}>
                            {/* Background Image */}
                            <Image
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmyRiJfxag_SKyCWAmvjI9h7WOlKwjyT983ALdaNvuc5tGqjjvbix7o-YeQ-tx2-QK4QCfYq5GIKF-05V3Hx6WANupQHaDWT_kIi2xFxQhuLjAvlBSZKlo13vIuQ43QQYcOT0vYtIyU62NvTidFPajPjukN4CHot24hG3hjUeFvauJXIUuZJClB-2ZO-r89omRKu-yEEKSiq1P7JtVz6BBR6GQJAk7kgWW1YYoNRftvsellQ_lrNct9ZEThC5h48099OPtlpJucf5W' }}
                                style={styles.image}
                                resizeMode="cover"
                            />

                            {/* Gradient Overlay (tạo chiều sâu bottom-up) */}
                            <LinearGradient
                                colors={['transparent', 'rgba(246, 248, 246, 0.4)']} // from-background-light/40
                                style={styles.gradientOverlay}
                                start={{ x: 0.5, y: 0.5 }}
                                end={{ x: 0.5, y: 1 }}
                            />
                        </View>
                    </View>

                    {/* Text Section */}
                    <View style={styles.textSection}>
                        <Text style={styles.headline}>
                            Stay Updated with Disease Alerts & Market Prices
                        </Text>
                        <Text style={styles.bodyText}>
                            Connect with local experts to stop spread early. Monitor market fluctuations to sell your crops at the perfect time.
                        </Text>
                    </View>

                    {/* Spacer để đẩy nội dung dưới xuống nếu màn hình dài */}
                    <View style={styles.spacer} />

                    {/* --- Bottom Actions Section --- */}
                    <View style={styles.bottomSection}>

                        {/* Page Indicators */}
                        <View style={styles.indicatorsContainer}>
                            {/* Dot 1 (Inactive) */}
                            <View style={styles.dotInactive} />

                            {/* Dot 2 (Active - Elongated) */}
                            <View style={styles.dotActive} />

                            {/* Dot 3 (Inactive) */}
                            <View style={styles.dotInactive} />
                        </View>

                        {/* Primary Button (Get Started) */}
                        <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={() => router.push('/(auth)/sign_up')}>
                            <Text style={styles.buttonText}>Get Started</Text>
                            <MaterialIcons name="arrow-forward" size={24} color={COLORS.primaryDarkText} />
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        maxWidth: 448, // max-w-md (tương đương 28rem)
        alignSelf: 'center',
        flexDirection: 'column',
        // shadow-2xl equivalent
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 25 },
        shadowOpacity: 0.25,
        shadowRadius: 50,
        elevation: 5,
    },

    // --- Top Nav ---
    topNav: {
        paddingHorizontal: 24, // px-6
        paddingTop: 12, // pt-12 (có thể chỉnh tùy device)
        paddingBottom: 8, // pb-2
        alignItems: 'flex-end',
        zIndex: 10,
    },
    skipButton: {
        // group class logic
        flexDirection: 'row',
        alignItems: 'center',
    },
    skipText: {
        color: COLORS.slate500,
        fontSize: 16, // text-base
        fontWeight: '700', // font-bold
        letterSpacing: 0.24, // tracking-[0.015em]
    },

    // --- Main Content ---
    mainContent: {
        flex: 1,
        width: '100%',
    },

    // Image Section
    imageSection: {
        width: '100%',
        paddingHorizontal: 24, // px-6
        paddingVertical: 16, // py-4
        alignItems: 'center',
    },
    imageWrapper: {
        width: '100%',
        aspectRatio: 4 / 3, // aspect-[4/3]
        borderRadius: 16, // rounded-2xl
        backgroundColor: '#e2e8f0', // fallback color
        overflow: 'hidden',
        position: 'relative',
        // shadow-sm
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    // Text Section
    textSection: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 24, // px-6
        marginTop: 8, // mt-2
    },
    headline: {
        color: COLORS.slate900,
        fontSize: 32, // text-[32px]
        fontWeight: '800', // font-extrabold
        lineHeight: 38, // leading-[1.2]
        textAlign: 'center',
        paddingBottom: 16, // pb-4
        paddingTop: 8, // pt-2
        letterSpacing: -0.8, // tracking-tight
    },
    bodyText: {
        color: COLORS.slate600,
        fontSize: 18, // text-lg
        fontWeight: '500', // font-medium
        lineHeight: 28, // leading-relaxed
        textAlign: 'center',
        maxWidth: 320, // max-w-[320px]
    },

    spacer: {
        flexGrow: 1,
        minHeight: 20,
    },

    // --- Bottom Section ---
    bottomSection: {
        width: '100%',
        paddingHorizontal: 24, // px-6
        paddingBottom: 40, // pb-10
        paddingTop: 16, // pt-4
        gap: 32, // gap-8
        alignItems: 'center',
        backgroundColor: COLORS.backgroundLight,
    },

    // Indicators
    indicatorsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12, // gap-3
    },
    dotInactive: {
        height: 10, // h-2.5
        width: 10, // w-2.5
        borderRadius: 5, // rounded-full
        backgroundColor: COLORS.slate300,
    },
    dotActive: {
        height: 10, // h-2.5
        width: 32, // w-8
        borderRadius: 5, // rounded-full
        backgroundColor: COLORS.primary,
        // shadow-[0_0_12px_rgba(19,236,19,0.4)]
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 5,
    },

    // Button
    button: {
        width: '100%',
        height: 56, // h-14
        backgroundColor: COLORS.primary,
        borderRadius: 12, // rounded-xl
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8, // gap-2
        // shadow-lg shadow-primary/20
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 4,
    },
    buttonText: {
        color: COLORS.primaryDarkText,
        fontSize: 18, // text-lg
        fontWeight: '700', // font-bold
        letterSpacing: 0.45, // tracking-wide
    },
});