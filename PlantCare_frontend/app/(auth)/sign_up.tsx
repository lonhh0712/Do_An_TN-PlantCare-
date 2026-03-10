import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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

// Định nghĩa màu sắc từ Tailwind config
const COLORS = {
    primary: '#13ec13',
    backgroundLight: '#f6f8f6',
    white: '#ffffff',
    textDark: '#111811',
    textGray: '#618961',
    border: '#dbe6db',
    placeholder: '#8ba38b',
    bgInput: '#ffffff',
    bgIcon: '#f0f4f0',
};

const { width } = Dimensions.get('window');

interface CropItemProps {
    id: string;
    iconLib: 'MCI' | 'MI';
    iconName: any;
    label: string;
}

export default function RegistrationScreen() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedCrops, setSelectedCrops] = useState<string[]>(['rice', 'fruit']);

    const toggleCrop = (cropId: string) => {
        if (selectedCrops.includes(cropId)) {
            setSelectedCrops(selectedCrops.filter(id => id !== cropId));
        } else {
            setSelectedCrops([...selectedCrops, cropId]);
        }
    };

    const CropItem = ({ id, iconLib, iconName, label }: CropItemProps) => {
        const isSelected = selectedCrops.includes(id);
        const IconComponent = iconLib === 'MCI' ? MaterialCommunityIcons : MaterialIcons;

        return (
            <TouchableOpacity
                style={[
                    styles.cropCard,
                    isSelected ? styles.cropCardSelected : styles.cropCardUnselected
                ]}
                onPress={() => toggleCrop(id)}
                activeOpacity={0.8}
            >
                <View style={styles.cropHeader}>
                    <View style={[styles.cropIconCircle, isSelected ? { backgroundColor: COLORS.white } : { backgroundColor: COLORS.backgroundLight }]}>
                        <IconComponent name={iconName} size={24} color={COLORS.textDark} />
                    </View>

                    {isSelected ? (
                        <View style={styles.checkCircleSelected}>
                            <MaterialIcons name="check" size={16} color="#102210" style={{ fontWeight: 'bold' }} />
                        </View>
                    ) : (
                        <View style={styles.checkCircleUnselected} />
                    )}
                </View>
                <Text style={[styles.cropLabel, isSelected && { fontWeight: 'bold' }]}>{label}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* --- Sticky Header --- */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Đăng ký</Text>
                <View style={{ width: 48 }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Title Section */}
                <View style={styles.section}>
                    <Text style={styles.mainTitle}>Tạo tài khoản của bạn</Text>
                    <Text style={styles.subTitle}>
                        Giúp chúng tôi tùy chỉnh cảnh báo dịch bệnh và tin tức thị trường cho trang trại của bạn.
                    </Text>
                </View>

                {/* Upload Photo Section */}
                <View style={styles.avatarSection}>
                    <TouchableOpacity style={styles.avatarWrapper} activeOpacity={0.8}>
                        <View style={styles.avatarPlaceholder}>
                            <MaterialIcons name="person" size={48} color={COLORS.textGray} />
                        </View>
                        <View style={styles.cameraBadge}>
                            <MaterialIcons name="add-a-photo" size={18} color="#102210" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.avatarText}>Tải ảnh lên</Text>
                </View>

                {/* Form Fields */}
                <View style={styles.formSection}>

                    {/* Password */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mật khẩu</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={[styles.input, { paddingLeft: 48, paddingRight: 48 }]}
                                placeholder="Tạo mật khẩu"
                                placeholderTextColor={COLORS.placeholder}
                                secureTextEntry={!showPassword}
                            />
                            <View style={styles.inputIconLeft}>
                                <MaterialIcons name="lock-outline" size={20} color={COLORS.textGray} />
                            </View>
                            <TouchableOpacity
                                style={styles.inputIconRight}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <MaterialIcons
                                    name={showPassword ? "visibility" : "visibility-off"}
                                    size={20}
                                    color={COLORS.textGray}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Confirm Password */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Xác nhận mật khẩu</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={[styles.input, { paddingLeft: 48, paddingRight: 48 }]}
                                placeholder="Nhập lại mật khẩu"
                                placeholderTextColor={COLORS.placeholder}
                                secureTextEntry={!showConfirmPassword}
                            />
                            <View style={styles.inputIconLeft}>
                                <MaterialCommunityIcons name="lock-reset" size={20} color={COLORS.textGray} />
                            </View>
                            <TouchableOpacity
                                style={styles.inputIconRight}
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <MaterialIcons
                                    name={showConfirmPassword ? "visibility" : "visibility-off"}
                                    size={20}
                                    color={COLORS.textGray}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Full Name */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Họ và tên</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập họ và tên của bạn"
                            placeholderTextColor={COLORS.placeholder}
                        />
                    </View>

                    {/* Mobile Number */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Số điện thoại</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={[styles.input, { paddingLeft: 48 }]}
                                placeholder="(090) 000-0000"
                                placeholderTextColor={COLORS.placeholder}
                                keyboardType="phone-pad"
                            />
                            <View style={styles.inputIconLeft}>
                                <MaterialIcons name="phone" size={20} color={COLORS.textGray} />
                            </View>
                        </View>
                    </View>

                    {/* Farm Location */}
                    <View style={styles.inputGroup}>
                        <View style={styles.locationHeader}>
                            <Text style={styles.label}>Vị trí trang trại</Text>
                            <TouchableOpacity style={styles.useCurrentBtn}>
                                <MaterialIcons name="my-location" size={18} color={COLORS.primary} />
                                <Text style={styles.useCurrentText}>Sử dụng vị trí hiện tại</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={[styles.input, { paddingRight: 48 }]}
                                placeholder="Tìm kiếm khu vực hoặc thành phố"
                                value="Fresno, California"
                                placeholderTextColor={COLORS.placeholder}
                            />
                            <View style={styles.inputIconRight}>
                                <MaterialIcons name="arrow-drop-down" size={24} color={COLORS.textDark} />
                            </View>
                        </View>

                        {/* Map Preview */}
                        <View style={styles.mapContainer}>
                            <Image
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0jh4VcC7VHncV6jMy2bZ5dIF3EGQpejKFyfzhKlfeLDEV5dUhvbL5PzyLxix7fyNVxc5BtA0XFfTML5v3x0R9ayf4CmD_95muKM3M8J8L0aaJZN2GgwOjVFe65ubPZI_ahOv6rMbKxKnXPo_zMQkMZxrhYYMioVd62nPFpQOcuOA4pODCMlojpZKo6fgTEWxbGlb1q0RI3M9Dcp6nxERKuwZl_-lrXa7-rpXGFo7_6U8oVeAzDN9f3VdN-RaktUNn0YkqP4eAnuxz' }}
                                style={styles.mapImage}
                            />
                            <View style={styles.mapOverlay}>
                                <View style={styles.pinCircle}>
                                    <MaterialIcons name="location-on" size={24} color={COLORS.primary} />
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Crop Selection */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Bạn trồng loại cây gì?</Text>
                        <Text style={styles.helperText}>Chọn tất cả các loại phù hợp</Text>

                        <View style={styles.gridContainer}>
                            <CropItem id="rice" iconLib="MCI" iconName="grass" label="Lúa" />
                            <CropItem id="coffee" iconLib="MCI" iconName="coffee" label="Cà phê" />
                            <CropItem id="corn" iconLib="MCI" iconName="corn" label="Ngô" />
                            <CropItem id="fruit" iconLib="MCI" iconName="nutrition" label="Cây ăn quả" />
                            <CropItem id="wheat" iconLib="MCI" iconName="barley" label="Lúa mì" />
                            <CropItem id="other" iconLib="MCI" iconName="dots-horizontal" label="Khác" />
                        </View>
                    </View>

                    {/* Terms Text */}
                    <View style={styles.termsContainer}>
                        <Text style={styles.termsText}>
                            Bằng cách tiếp tục, bạn đồng ý với <Text style={styles.linkText}>Chính sách quyền riêng tư</Text> và <Text style={styles.linkText}>Điều khoản dịch vụ</Text> của chúng tôi.
                        </Text>
                    </View>

                </View>
            </ScrollView>

            {/* --- Sticky Bottom Button --- */}
            <View style={styles.footer}>
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>Bạn đã có tài khoản?</Text>
                    <Text style={styles.signupText} onPress={() => router.push('/sign_in')}>Đăng nhập</Text>
                </View>
                <TouchableOpacity style={styles.createButton} activeOpacity={0.9}>
                    <Text style={styles.createButtonText}>Tạo tài khoản</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    scrollView: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    scrollContent: {
        paddingBottom: 24,
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: 'transparent',
    },
    backButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
        textAlign: 'center',
    },

    // Section Generic
    section: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        backgroundColor: COLORS.white,
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 8,
    },
    subTitle: {
        fontSize: 16,
        color: COLORS.textGray,
        marginBottom: 24,
    },

    // Avatar
    avatarSection: {
        backgroundColor: COLORS.white,
        alignItems: 'center',
        paddingBottom: 24,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 12,
    },
    avatarPlaceholder: {
        width: 112,
        height: 112,
        borderRadius: 56,
        backgroundColor: COLORS.bgIcon,
        borderWidth: 2,
        borderColor: COLORS.border,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.primary,
        padding: 8,
        borderRadius: 999,
        borderWidth: 3,
        borderColor: COLORS.white,
        elevation: 2,
    },
    avatarText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textDark,
    },

    // Form Section
    formSection: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 16,
        paddingBottom: 16,
        gap: 20,
    },
    inputGroup: {
        marginBottom: 4,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.textDark,
        marginBottom: 8,
    },
    helperText: {
        fontSize: 14,
        color: COLORS.textGray,
        marginBottom: 16,
    },
    inputWrapper: {
        position: 'relative',
        height: 56,
    },
    input: {
        flex: 1,
        height: 56,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: COLORS.textDark,
    },
    inputIconLeft: {
        position: 'absolute',
        left: 16,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    inputIconRight: {
        position: 'absolute',
        right: 16,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },

    // Location Special
    locationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 8,
    },
    useCurrentBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingVertical: 4,
    },
    useCurrentText: {
        color: COLORS.primary,
        fontWeight: '600',
        fontSize: 14,
    },
    mapContainer: {
        height: 128,
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        position: 'relative',
    },
    mapImage: {
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pinCircle: {
        backgroundColor: COLORS.white,
        padding: 8,
        borderRadius: 999,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    // Grid
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    cropCard: {
        width: '48%',
        padding: 16,
        borderRadius: 12,
        flexDirection: 'column',
        gap: 12,
        borderWidth: 1,
    },
    cropCardSelected: {
        backgroundColor: 'rgba(19, 236, 19, 0.1)',
        borderColor: COLORS.primary,
        borderWidth: 2,
    },
    cropCardUnselected: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.border,
    },
    cropHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cropIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
    },
    checkCircleSelected: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkCircleUnselected: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.border,
    },
    cropLabel: {
        fontSize: 14,
        color: COLORS.textDark,
        fontWeight: '500',
    },

    // Terms
    termsContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    termsText: {
        textAlign: 'center',
        fontSize: 12,
        color: COLORS.textGray,
        lineHeight: 18,
    },
    linkText: {
        textDecorationLine: 'underline',
    },

    // Footer
    footer: {
        backgroundColor: COLORS.white,
        padding: 16,
        paddingBottom: 32,
        borderTopWidth: 1,
        borderTopColor: COLORS.bgIcon,
    },
    footerContainer: {
        paddingHorizontal: 24,
        paddingBottom: 16,
        marginTop: 'auto', // mt-auto
        alignItems: 'center',
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
    },
    footerText: {
        color: COLORS.textGray,
        fontSize: 14,
        fontWeight: '500',
    },
    signupText: {
        color: COLORS.primary,
        fontWeight: '700',
        marginLeft: 4,
    },
    createButton: {
        height: 56,
        backgroundColor: COLORS.primary,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    createButtonText: {
        color: '#102210',
        fontSize: 16,
        fontWeight: 'bold',
    },
});