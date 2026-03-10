import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Easing,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';



// 1. Cấu hình màu sắc
const COLORS = {
    primary: '#13ec13',
    white: '#ffffff',
    black: '#000000',
    glass: 'rgba(16, 34, 16, 0.5)', // Giả lập hiệu ứng glass-panel
};

const { width, height } = Dimensions.get('window');
const RETICLE_SIZE = width * 0.75; // Tương đương w-72 hoặc w-80

export default function CameraScannerScreen() {
    const router = useRouter();
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);



    useEffect(() => {
        if (!permission) return;
        if (!permission.granted) {
            requestPermission();
        }
    }, [permission]);
    // Animation cho tia quét (Scan Beam)
    const scanAnim = useRef(new Animated.Value(0)).current;
    // Animation cho chỉ dẫn (Bounce effect)
    const bounceAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // 1. Loop Scanning Beam
        Animated.loop(
            Animated.sequence([
                Animated.timing(scanAnim, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true, // Sử dụng transform để tối ưu
                }),
                Animated.timing(scanAnim, {
                    toValue: 0,
                    duration: 0, // Reset tức thì
                    useNativeDriver: true,
                })
            ])
        ).start();

        // 2. Loop Bounce Instruction
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, {
                    toValue: -10,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ])
        ).start();
    }, []);

    // Map giá trị 0-1 sang chiều cao của khung reticle để tia quét di chuyển
    const beamTranslateY = scanAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, RETICLE_SIZE],
    });

    if (!permission) {
        return <View style={{ flex: 1, backgroundColor: 'black' }} />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={{ color: '#fff', marginBottom: 16 }}>
                    Ứng dụng cần quyền truy cập camera
                </Text>
                <TouchableOpacity
                    onPress={requestPermission}
                    style={styles.permissionButton}
                >
                    <Text style={{ color: '#000' }}>Cấp quyền</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* --- Background (Simulated Camera Feed) --- */}
            <CameraView
                ref={cameraRef}
                style={StyleSheet.absoluteFillObject}
                facing="back"
            />
            {/* Dark Overlay */}
            <View style={styles.overlay} />

            {/* --- Top Header (HUD) --- */}
            <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={styles.header}
            >
                {/* Close Button */}
                <TouchableOpacity style={styles.glassButton}>
                    <MaterialIcons name="close" size={24} color={COLORS.white} />
                </TouchableOpacity>

                {/* Title */}
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>MÁY QUÉT</Text>
                    <View style={styles.activeBadge}>
                        <View style={styles.pulseDot} />
                        <Text style={styles.activeText}>AI ĐANG BẬT</Text>
                    </View>
                </View>

                {/* Flash Button */}
                <TouchableOpacity style={styles.glassButton}>
                    <MaterialIcons name="flash-on" size={24} color={COLORS.white} />
                </TouchableOpacity>
            </LinearGradient>

            {/* --- Main Reticle Area --- */}
            <View style={styles.reticleContainer}>
                <View style={styles.reticleBox}>

                    {/* 4 Góc (Corners) */}
                    <View style={[styles.corner, styles.cornerTL]} />
                    <View style={[styles.corner, styles.cornerTR]} />
                    <View style={[styles.corner, styles.cornerBL]} />
                    <View style={[styles.corner, styles.cornerBR]} />

                    {/* Grid Overlay */}
                    <View style={styles.gridContainer}>
                        <View style={styles.gridRow} />
                        <View style={styles.gridRow} />
                    </View>
                    <View style={[styles.gridContainer, { flexDirection: 'row' }]}>
                        <View style={styles.gridCol} />
                        <View style={styles.gridCol} />
                    </View>

                    {/* Scanning Beam Animation */}
                    <Animated.View
                        style={[
                            styles.scanBeam,
                            { transform: [{ translateY: beamTranslateY }] }
                        ]}
                    />
                </View>
            </View>
            {/* --- Bottom Footer --- */}
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']}
                style={styles.footer}
            >
                {/* Instructional Pill */}
                <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
                    <View style={styles.instructionPill}>
                        <MaterialIcons name="center-focus-strong" size={18} color={COLORS.primary} />
                        <Text style={styles.instructionText}>Giữ lá cây rõ nét trong khung</Text>
                    </View>
                </Animated.View>

                {/* Shutter Controls */}
                <View style={styles.controlsRow}>

                    {/* Gallery Button */}
                    <View style={styles.controlItem}>
                        <TouchableOpacity style={styles.glassCircleBtn}>
                            <MaterialIcons name="photo-library" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                        <Text style={styles.controlLabel}>Thư viện</Text>
                    </View>

                    {/* Main Shutter Button */}
                    <TouchableOpacity
                        style={styles.shutterContainer}
                        activeOpacity={0.8}
                        onPress={async () => {
                            console.log('Taking picture...');
                            try {
                                if (!cameraRef.current) {
                                    console.log('Camera ref is null');
                                    return;
                                }

                                const photo = await cameraRef.current.takePictureAsync({
                                    quality: 0.8,
                                    skipProcessing: false,
                                });

                                console.log('Photo taken:', photo.uri);

                                if (photo.uri) {
                                    console.log('Navigating to preview...');
                                    router.push({
                                        pathname: '/img_preview_confirm',
                                        params: { photoUri: photo.uri }
                                    });
                                }
                            } catch (error) {
                                console.error('Error taking picture:', error);
                            }
                        }}
                    >
                        <View style={styles.shutterOuterRing}>
                            <View style={styles.shutterInner} />
                        </View>
                        {/* Glow Effect */}
                        <View style={styles.shutterGlow} />
                    </TouchableOpacity>

                    {/* Recent Button */}
                    <View style={styles.controlItem}>
                        <TouchableOpacity style={styles.glassCircleBtn}>
                            <MaterialIcons name="history" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                        <Text style={styles.controlLabel}>Gần đây</Text>
                    </View>

                </View>

                {/* Home Indicator Spacer */}
                <View style={styles.homeIndicator} />
            </LinearGradient >

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    cameraFeed: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },

    // Header
    header: {
        paddingTop: Platform.OS === 'android' ? 40 : 60, // Safe Area top
        paddingBottom: 16,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 20,
    },
    glassButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.glass,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    headerTitleContainer: {
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
        letterSpacing: 0.5,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    activeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        gap: 4,
    },
    pulseDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.primary,
    },
    activeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'rgba(19, 236, 19, 0.8)', // primary/80
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

    // Reticle (Center)
    reticleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    reticleBox: {
        width: RETICLE_SIZE,
        height: RETICLE_SIZE,
        position: 'relative',
    },
    // Corners
    corner: {
        position: 'absolute',
        width: 48,
        height: 48,
        borderColor: COLORS.primary,
        // Shadow effect for glow
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 5,
    },
    cornerTL: {
        top: 0, left: 0,
        borderTopWidth: 4, borderLeftWidth: 4,
        borderTopLeftRadius: 24,
    },
    cornerTR: {
        top: 0, right: 0,
        borderTopWidth: 4, borderRightWidth: 4,
        borderTopRightRadius: 24,
    },
    cornerBL: {
        bottom: 0, left: 0,
        borderBottomWidth: 4, borderLeftWidth: 4,
        borderBottomLeftRadius: 24,
    },
    cornerBR: {
        bottom: 0, right: 0,
        borderBottomWidth: 4, borderRightWidth: 4,
        borderBottomRightRadius: 24,
    },
    // Grid
    gridContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-evenly',
    },
    gridRow: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    gridCol: {
        width: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    // Scan Beam
    scanBeam: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 10,
        opacity: 0.8,
    },

    // Footer
    footer: {
        paddingTop: 64,
        paddingBottom: 40,
        alignItems: 'center',
        zIndex: 20,
    },
    instructionPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.glass,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: 'rgba(19, 236, 19, 0.3)',
        gap: 10,
        marginBottom: 40,
    },
    instructionText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.5,
    },

    // Controls
    controlsRow: {
        width: '100%',
        paddingHorizontal: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 500,
    },
    controlItem: {
        alignItems: 'center',
        gap: 8,
    },
    glassCircleBtn: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.glass,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    controlLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.7)',
    },

    // Shutter
    shutterContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    shutterOuterRing: {
        width: 96, // w-24
        height: 96,
        borderRadius: 48,
        borderWidth: 5,
        borderColor: 'rgba(255,255,255,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    shutterInner: {
        width: 72, // 4.5rem
        height: 72,
        borderRadius: 36,
        backgroundColor: COLORS.white,
    },
    shutterGlow: {
        position: 'absolute',
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: 'rgba(255,255,255,0.1)',
        zIndex: 1,
        transform: [{ scale: 1.2 }], // Blur simulation
    },

    homeIndicator: {
        width: 128,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 2,
        marginTop: 32,
    },
    permissionContainer: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },

    permissionCard: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'rgba(16, 34, 16, 0.6)', // glass
        borderRadius: 24,
        paddingVertical: 32,
        paddingHorizontal: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(19, 236, 19, 0.3)',
        shadowColor: '#13ec13',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    },

    permissionIcon: {
        marginBottom: 16,
    },

    permissionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 0.5,
    },

    permissionDesc: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },

    permissionButton: {
        backgroundColor: '#13ec13',
        paddingVertical: 12,
        paddingHorizontal: 28,
        borderRadius: 999,
        shadowColor: '#13ec13',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 15,
        elevation: 8,
    },

    permissionButtonText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
    },

});