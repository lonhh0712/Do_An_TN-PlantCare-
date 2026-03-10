import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    ImageBackground,
    Modal,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';



// 1. Cấu hình màu sắc
const COLORS = {
    primary: '#13ec13',
    primaryDarkText: '#003300',
    primaryHover: 'rgba(19, 236, 19, 0.1)',
    backgroundLight: '#f6f8f6',
    white: '#ffffff',
    textPrimary: '#111811',
    textSecondary: '#4b5563', // gray-600
    border: '#e5e7eb', // gray-200
    gridLine: 'rgba(255, 255, 255, 0.3)',
};

const { width } = Dimensions.get('window');

// --- CẬP NHẬT TYPESCRIPT Ở ĐÂY ---
interface ToolButtonProps {
    icon: keyof typeof MaterialIcons.glyphMap;
    label: string;
    onPress: () => void;
}

const ToolButton = ({ icon, label, onPress }: ToolButtonProps) => (
    <TouchableOpacity style={styles.toolBtnContainer} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.toolBtnCircle}>
            <MaterialIcons name={icon} size={24} color={COLORS.textSecondary} />
        </View>
        <Text style={styles.toolBtnText}>{label}</Text>
    </TouchableOpacity>
);
// --------------------------------

export default function ReviewPhotoScreen() {
    const router = useRouter();
    const { photoUri } = useLocalSearchParams();
    const imageUri = Array.isArray(photoUri) ? photoUri[0] : (photoUri || '');

    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

    const handleConfirm = () => {
        setIsAnalyzing(true);
        // Giả lập process 2 giây rồi tắt
        setTimeout(() => setIsAnalyzing(false), 2000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />

            {/* --- Header --- */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Xem lại ảnh</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* --- Main Content --- */}
            <View style={styles.mainContent}>

                {/* Image Container with Grid */}
                <View style={styles.imageContainer}>
                    <ImageBackground
                        source={{ uri: imageUri }}
                        style={styles.image}
                        resizeMode="cover"
                    >
                        {/* Grid Overlay (3x3) */}
                        <View style={styles.gridOverlay}>
                            <View style={styles.gridRow}>
                                <View style={[styles.gridCell, styles.borderRight, styles.borderBottom]} />
                                <View style={[styles.gridCell, styles.borderRight, styles.borderBottom]} />
                                <View style={[styles.gridCell, styles.borderBottom]} />
                            </View>
                            <View style={styles.gridRow}>
                                <View style={[styles.gridCell, styles.borderRight, styles.borderBottom]} />
                                <View style={[styles.gridCell, styles.borderRight, styles.borderBottom]} />
                                <View style={[styles.gridCell, styles.borderBottom]} />
                            </View>
                            <View style={styles.gridRow}>
                                <View style={[styles.gridCell, styles.borderRight]} />
                                <View style={[styles.gridCell, styles.borderRight]} />
                                <View style={styles.gridCell} />
                            </View>
                        </View>


                    </ImageBackground>
                </View>

                {/* Instructional Text */}
                <View style={styles.instructionContainer}>
                    <Text style={styles.instructionText}>
                        Dấu hiệu bệnh có rõ ràng không? Cắt hoặc xoay để tập trung vào vùng bị bệnh để có kết quả chính xác hơn.
                    </Text>
                </View>

                {/* Toolbar */}
                <View style={styles.toolbar}>
                    <ToolButton icon="crop" label="Cắt" onPress={() => { }} />
                </View>

            </View>

            {/* --- Bottom Action Area --- */}
            <View style={styles.bottomSheet}>
                <View style={styles.actionContainer}>
                    {/* Primary Action */}
                    <TouchableOpacity
                        style={styles.primaryBtn}
                        activeOpacity={0.9}
                        onPress={handleConfirm}
                    >
                        <MaterialIcons name="analytics" size={24} color={COLORS.primaryDarkText} />
                        <Text style={styles.primaryBtnText}>Xác nhận & Phân tích</Text>
                    </TouchableOpacity>

                    {/* Secondary Action */}
                    <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.7}>
                        <Text style={styles.secondaryBtnText}>Chụp lại</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* --- Loading Overlay (Modal) --- */}
            <Modal visible={isAnalyzing} transparent animationType="fade">
                <View style={styles.loadingOverlay}>
                    <View style={styles.loadingBox}>
                        <View style={styles.loadingIconWrapper}>
                            {/* Giả lập vòng quay loading bằng border */}
                            <ActivityIndicator size="large" color={COLORS.primary} />
                            <View style={styles.absoluteIcon}>
                                <MaterialIcons name="local-florist" size={24} color={COLORS.primary} />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.loadingTitle}>Đang phân tích cây...</Text>
                            <Text style={styles.loadingSubtitle}>Đang nhận diện bệnh tiềm ẩn</Text>
                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
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
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    mainContent: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        alignItems: 'center',
    },
    imageContainer: {
        width: '85%',
        aspectRatio: 4 / 5,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#e5e7eb',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    gridOverlay: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.5,
    },
    gridRow: {
        flex: 1,
        flexDirection: 'row',
    },
    gridCell: {
        flex: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    borderRight: {
        borderRightWidth: 1,
    },
    borderBottom: {
        borderBottomWidth: 1,
    },
    zoomBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    zoomText: {
        color: COLORS.white,
        fontSize: 12,
    },
    instructionContainer: {
        marginTop: 16,
        marginBottom: 8,
        paddingHorizontal: 16,
    },
    instructionText: {
        textAlign: 'center',
        color: COLORS.textSecondary,
        fontSize: 14,
        lineHeight: 20,
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        paddingVertical: 16,
    },
    toolBtnContainer: {
        alignItems: 'center',
        gap: 4,
    },
    toolBtnCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    toolBtnText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textSecondary,
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32,
    },
    actionContainer: {
        maxWidth: 400,
        width: '100%',
        alignSelf: 'center',
        gap: 12,
    },
    primaryBtn: {
        width: '100%',
        height: 56,
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryBtnText: {
        color: COLORS.primaryDarkText,
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryBtn: {
        width: '100%',
        height: 48,
        backgroundColor: 'transparent',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    secondaryBtnText: {
        color: COLORS.textSecondary,
        fontSize: 16,
        fontWeight: '600',
    },
    loadingOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    loadingBox: {
        backgroundColor: COLORS.white,
        padding: 24,
        borderRadius: 16,
        width: '100%',
        maxWidth: 300,
        alignItems: 'center',
        gap: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
    },
    loadingIconWrapper: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    absoluteIcon: {
        position: 'absolute',
    },
    loadingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        textAlign: 'center',
        marginBottom: 4,
    },
    loadingSubtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
        textAlign: 'center',
    },
});