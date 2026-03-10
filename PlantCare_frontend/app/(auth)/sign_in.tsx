import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
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

// Cấu hình màu sắc từ Tailwind config gốc
const COLORS = {
    primary: '#13ec13',
    primaryHover: '#0fd60f',
    backgroundLight: '#f6f8f6',
    backgroundDark: '#102210',
    white: '#ffffff',
    textDark: '#111811',
    textLight: '#ffffff',
    borderLight: '#dbe6db',
    borderDark: '#2a4d2a',
    placeholderLight: '#8ba38b',
    placeholderDark: '#4a6b4a',
    iconColor: '#618961',
    iconColorDark: '#5a8a5a',
};

export default function LoginScreen() {
    const router = useRouter();
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.contentContainer}>

                    {/* --- Header Image Section --- */}
                    <View style={styles.headerContainer}>
                        {/* Background Image */}
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJeFO-vfCET7ffkblHCKM7p0vWR7wuCsDTJELvNGCNLGuoizHyZFWLSbZnmjUt3dr5SZYtD90ftYYlU31MqLC6kPDAmOXm-OtkXKTHqVY01wUUErCIZzMx2QFVbJ36TZ4zImQX6o7h1erLjeTcNYkqqFiv95wH8YqRWibGB7epueXVmcSSMtd8dLOh_Fqwn5lrlB-lWWb-O1NzCu8yn6PU1Nmv1Ai-ZxqWEEKocNbpkoEqafkS5gOJofRYUYgm0OkL5jqBb3PElIDt' }}
                            style={styles.headerImage}
                            resizeMode="cover"
                        />

                        {/* Gradient Overlay */}
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.6)']}
                            style={styles.gradientOverlay}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                        />

                        {/* Header Text (Translated) */}
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.welcomeText}>Chào mừng trở lại</Text>
                            <Text style={styles.subText}>Theo dõi cây trồng và cập nhật tin tức thị trường.</Text>
                        </View>
                    </View>

                    {/* --- Form Section --- */}
                    <View style={styles.formContainer}>

                        {/* Input: Phone/Email */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Số điện thoại hoặc Email</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập email hoặc số điện thoại"
                                    placeholderTextColor={COLORS.placeholderLight}
                                />
                                <View style={styles.iconLeft}>
                                    <MaterialIcons name="mail-outline" size={20} color={COLORS.iconColor} />
                                </View>
                            </View>
                        </View>

                        {/* Input: Password */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Mật khẩu</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={[styles.input, { paddingRight: 48 }]}
                                    placeholder="Nhập mật khẩu"
                                    placeholderTextColor={COLORS.placeholderLight}
                                    secureTextEntry={!isPasswordVisible}
                                />
                                <View style={styles.iconLeft}>
                                    <MaterialIcons name="lock-outline" size={20} color={COLORS.iconColor} />
                                </View>

                                <TouchableOpacity
                                    style={styles.iconRight}
                                    onPress={() => setPasswordVisible(!isPasswordVisible)}
                                >
                                    <MaterialIcons
                                        name={isPasswordVisible ? "visibility" : "visibility-off"}
                                        size={20}
                                        color={COLORS.iconColor}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.forgotPasswordContainer}>
                                <TouchableOpacity>
                                    <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Login Button */}
                        <TouchableOpacity style={styles.loginButton} activeOpacity={0.9} onPress={() => router.replace('/(tabs)/home')}>
                            <Text style={styles.loginButtonText}>Đăng nhập</Text>
                        </TouchableOpacity>

                        {/* Divider */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.dividerLine} />
                            <View style={styles.dividerTextWrapper}>
                                <Text style={styles.dividerText}>Hoặc tiếp tục với</Text>
                            </View>
                        </View>

                        {/* Social Buttons */}
                        <View style={styles.socialGrid}>
                            {/* Google */}
                            <TouchableOpacity style={styles.socialButton}>
                                {/* Sử dụng Icon thay cho SVG phức tạp để code gọn gàng */}
                                <MaterialCommunityIcons name="google" size={24} color="#4285F4" />
                                <Text style={styles.socialText}>Google</Text>
                            </TouchableOpacity>

                            {/* Apple */}
                            <TouchableOpacity style={styles.socialButton}>
                                <MaterialCommunityIcons name="apple" size={24} color={COLORS.textDark} />
                                <Text style={styles.socialText}>Apple</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    {/* --- Footer --- */}
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>
                            Bạn chưa có tài khoản?{' '}
                            <Text style={styles.signupText} onPress={() => router.push('/sign_up')}>Đăng ký ngay</Text>
                        </Text>
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
    scrollContainer: {
        flexGrow: 1,
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        maxWidth: 448, // max-w-md
        alignSelf: 'center',
        backgroundColor: COLORS.white,
        // Shadow-xl approximation
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.25,
        shadowRadius: 25,
        elevation: 10,
        paddingBottom: 24,
        minHeight: 884, // min-h from CSS
    },

    // Header Styles
    headerContainer: {
        width: '100%',
        height: 320,
        borderBottomLeftRadius: 40, // rounded-b-[2.5rem]
        borderBottomRightRadius: 40,
        overflow: 'hidden',
        position: 'relative',
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    gradientOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 10,
    },
    headerTextContainer: {
        position: 'absolute',
        bottom: 32, // bottom-8
        left: 24, // left-6
        right: 24, // right-6
        zIndex: 20,
    },
    welcomeText: {
        color: COLORS.white,
        fontSize: 30, // text-3xl
        fontWeight: '700', // font-bold
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    subText: {
        color: 'rgba(255, 255, 255, 0.9)', // text-white/90
        fontSize: 16, // text-base
        fontWeight: '500', // font-medium
    },

    // Form Styles
    formContainer: {
        flex: 1,
        paddingHorizontal: 24, // px-6
        paddingTop: 32, // pt-8
        paddingBottom: 24, // pb-6
        gap: 20, // gap-5
    },
    inputGroup: {
        gap: 8, // space-y-2
    },
    label: {
        color: COLORS.textDark,
        fontSize: 14, // text-sm
        fontWeight: '700', // font-bold
        marginLeft: 4, // ml-1
    },
    inputWrapper: {
        position: 'relative',
        height: 56, // h-14
    },
    input: {
        flex: 1,
        height: '100%',
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        borderRadius: 12, // rounded-xl
        paddingLeft: 48, // pl-12
        paddingRight: 16,
        fontSize: 16,
        color: COLORS.textDark,
    },
    iconLeft: {
        position: 'absolute',
        left: 16, // left-4
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconRight: {
        position: 'absolute',
        right: 16, // right-4
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        paddingTop: 4,
    },
    forgotPasswordText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.primary,
    },

    // Button
    loginButton: {
        marginTop: 16,
        height: 56, // h-14
        backgroundColor: COLORS.primary,
        borderRadius: 999, // rounded-full
        alignItems: 'center',
        justifyContent: 'center',
        // shadow-lg shadow-primary/20
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    loginButtonText: {
        color: '#102210',
        fontSize: 18, // text-lg
        fontWeight: '700', // font-bold
        letterSpacing: 0.2,
    },

    // Divider
    dividerContainer: {
        position: 'relative',
        paddingVertical: 32, // py-8
        alignItems: 'center',
        justifyContent: 'center',
    },
    dividerLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: COLORS.borderLight,
    },
    dividerTextWrapper: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 16,
    },
    dividerText: {
        fontSize: 14,
        color: COLORS.iconColor,
        fontWeight: '500',
    },

    // Social Grid
    socialGrid: {
        flexDirection: 'row',
        gap: 16, // gap-4
    },
    socialButton: {
        flex: 1,
        height: 56, // h-14
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        borderRadius: 12, // rounded-xl
    },
    socialText: {
        color: COLORS.textDark,
        fontSize: 14,
        fontWeight: '700',
    },

    // Footer
    footerContainer: {
        paddingHorizontal: 24,
        paddingBottom: 32,
        marginTop: 'auto', // mt-auto
        alignItems: 'center',
    },
    footerText: {
        color: COLORS.iconColor,
        fontSize: 14,
        fontWeight: '500',
    },
    signupText: {
        color: COLORS.primary,
        fontWeight: '700',
        marginLeft: 4,
    },
});