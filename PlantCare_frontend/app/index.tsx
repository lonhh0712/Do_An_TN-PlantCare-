import { MaterialIcons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
  View
} from 'react-native';

// Định nghĩa màu sắc từ config Tailwind cũ
const COLORS = {
  primary: '#13ec13',
  primaryDark: '#052e05', // Text color for button
  primaryHover: '#0fdc0f',
  backgroundLight: '#f6f8f6',
  backgroundDark: '#102210',
  slate900: '#0f172a',
  slate600: '#475569',
  slate500: '#64748b',
  slate300: '#cbd5e1',
  white: '#ffffff',
};

const { width } = Dimensions.get('window');

// Component hiển thị Text Gradient cho chữ "Instantly"
const GradientText = (props: TextProps) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={[COLORS.primary, '#16a34a']} // from-primary to-green-600
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};



export default function OnboardingScreen() {

  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />

      {/* Main Container giống max-w-lg mx-auto */}
      <View style={styles.contentContainer}>

        {/* Top Navigation / Skip */}
        <View style={styles.topNav}>
          <TouchableOpacity style={styles.skipButton} onPress={() => router.push('/(auth)/sign_up')}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable Content Area */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Image */}
          <View style={styles.heroContainer}>
            <View style={styles.imageWrapper}>
              {/* Image */}
              <Image
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOJn4m0zD7laTDMxN3jx5ZEDXQ3DAQOldASdm_WwnLP2OdqNi1tqqI0c1tlYV9lR_2LYvTaQl9YFoae_xgOOTkMPwDHc_gZTB453JTCiltpXwv-C8l8kIBRYmd52PQT0OBRDMqNXpmyGx1cRLuEaIfqQmt4TUeLfTpROuJlwM3Fgvr5EuRHxsV9Sjtj2_iqiNWrB12Vm6MgVrxEIXB45TRaA8Ym1g3rg4-HPKVCoNOYTjDnR3PKPxuPSej0pDK9s98sUnTm4I3sBMh' }}
                style={styles.image}
                resizeMode="cover"
              />

              {/* Overlay Gradient */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.2)']}
                style={styles.gradientOverlay}
                start={{ x: 0.5, y: 0.5 }} // Điều chỉnh để khớp với gradient-to-t
                end={{ x: 0.5, y: 1 }}
              />

              {/* Floating Badge */}
              <View style={styles.badge}>
                <MaterialIcons name="document-scanner" size={20} color={COLORS.primary} />
                <Text style={styles.badgeText}>AI SCANNER ACTIVE</Text>
              </View>
            </View>
          </View>

          {/* Text Content */}
          <View style={styles.textContainer}>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>
                Identify Plant Diseases{' '}
              </Text>
              {/* Text Gradient cho chữ Instantly */}
              <GradientText style={styles.title}>
                Instantly
              </GradientText>
              <Text style={styles.title}>
                {' '}with AI
              </Text>
            </View>

            <Text style={styles.description}>
              Scan your crops, analyze symptoms, and save your harvest with precision technology.
            </Text>
          </View>
        </ScrollView>

        {/* Footer Actions */}
        <View style={styles.footer}>
          {/* Page Indicators */}
          <View style={styles.indicators}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          {/* Primary Button */}
          <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={() => router.push('/insight')}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
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
    maxWidth: 512, // max-w-lg
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  // Top Nav
  topNav: {
    paddingHorizontal: 24, // px-6
    paddingTop: 10, // pt-10 (approx adjustments for SafeArea)
    paddingBottom: 8, // pb-2
    alignItems: 'flex-end',
    zIndex: 20,
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.slate500,
    letterSpacing: 0.5, // tracking-wide
  },
  // Scroll Content
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  heroContainer: {
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 8, // mt-2
    marginBottom: 24, // mb-6
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 3 / 3.5, // aspect-[3/3.5]
    borderRadius: 16, // rounded-2xl
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#e2e8f0', // placeholder bg
    // Shadow-sm equivalent
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
  badge: {
    position: 'absolute',
    bottom: 16, // bottom-4
    left: 16, // left-4
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // bg-white/90
    paddingHorizontal: 12, // px-3
    paddingVertical: 6, // py-1.5
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    // shadow-lg
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  badgeText: {
    fontSize: 12, // text-xs
    fontWeight: '700',
    color: '#1e293b', // text-slate-800
    textTransform: 'uppercase',
    letterSpacing: 0.5, // tracking-wide
    marginLeft: 8,
  },
  // Typography
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  titleWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32, // text-[32px]
    fontWeight: '800', // font-extrabold
    lineHeight: 37, // leading-[1.15]
    textAlign: 'center',
    color: COLORS.slate900,
    letterSpacing: -0.5, // tracking-tight
  },
  description: {
    fontSize: 16, // text-base (md:text-lg captured as base for mobile)
    fontWeight: '500',
    lineHeight: 26, // leading-relaxed
    textAlign: 'center',
    color: COLORS.slate600,
    maxWidth: 320, // max-w-xs
  },
  // Footer
  footer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    alignItems: 'center',
    gap: 32, // gap-8
    backgroundColor: COLORS.backgroundLight,
    zIndex: 20,
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: COLORS.slate300,
  },
  activeDot: {
    width: 32, // w-8
    backgroundColor: COLORS.primary,
  },
  button: {
    width: '100%',
    height: 56, // h-14
    backgroundColor: COLORS.primary,
    borderRadius: 12, // rounded-xl
    alignItems: 'center',
    justifyContent: 'center',
    // shadow-lg shadow-primary/25
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  buttonText: {
    color: COLORS.primaryDark,
    fontSize: 18,
    fontWeight: '800', // font-extrabold
  },
});