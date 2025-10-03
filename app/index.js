import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, View } from "react-native";

function useAppFonts() {
    const [fontsLoaded] = useFonts({
        'Allura': require('../assets/fonts/Allura-Regular.ttf'),
        'AnonymousPro': require('../assets/fonts/AnonymousPro-Regular.ttf'),
    });
    return fontsLoaded;
}

export default function SplashScreen() {
    const fontsLoaded = useAppFonts();
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        if (!fontsLoaded) {
            return null;
        }

        // Start animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),

            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 800,
                easing: Easing.elastic(1),
                useNativeDriver: true,
            }),

            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 1000,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            })
        ]).start();

        // Navigation timer
        const timer = setTimeout(() => {
            // Exit animation before navigating
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1.2,
                    duration: 500,
                    useNativeDriver: true,
                })
            ]).start(() => {
                router.replace("/");
            });
        }, 3000);

        return () => clearTimeout(timer);
    });

    return (
        <View style={styles.container}>
            <Animated.View 
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [
                            { scale: scaleAnim },
                            { translateY: slideAnim }
                        ]
                    }
                ]}
            >

                {/* Logo */}
                <Animated.View style={styles.logoContainer}>
                    <Animated.View style={styles.logoInner}>
                        <Image 
                            source={require('../assets/images/girliesgram logo.png')}
                            style={styles.logoImage}
                        />
                    </Animated.View>
                </Animated.View>

                {/* App Name */}
                <Animated.Text style={[styles.appName, styles.appNameWithFont]}>
                    Girliesgram
                </Animated.Text>

                {/* Tagline */}
                <Animated.Text style={styles.tagline}>
                    A creative app specially made for girls
                </Animated.Text>

                {/* Loading dots */}
                <View style={styles.loadingDots}>
                    {[0, 1, 2].map((index) => (
                        <Animated.View
                            key={index}
                            style={[
                                styles.dot,
                                {
                                    transform: [{
                                        scale: fadeAnim.interpolate({
                                        inputRange: [0, 0.5, 1],
                                        outputRange: [0.3, 1, 0.3],
                                        })
                                    }]
                                }
                            ]}
                        />
                    ))}
                </View>
            </Animated.View>

            {/* Background decorative elements */}
            <View style={styles.backgroundCircle1} />
            <View style={styles.backgroundCircle2} />
            <View style={styles.backgroundCircle3} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF1F3",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    
    content: {
        alignItems: "center",
    },

    logoContainer: {
        marginBottom: 14,
    },

    logoInner: {
        justifyContent: "center",
        alignItems: "center",
    },

    logoImage: {
        width: 140,
        height: 140,
        borderRadius: 28,
    },

    appName: {
        fontSize: 48, 
        fontWeight: "400",
        marginBottom: 12,
        color: "#000000",
        letterSpacing: 1.4,
    },

    appNameWithFont: {
        fontFamily: "Allura",
    },

    tagline: {
        fontSize: 16,
        color: "#000000",
        textAlign: "center",
        marginBottom: 30,
        lineHeight: 22,
        paddingHorizontal: 20,
        fontFamily: "System",
        fontStyle: "normal",
    },

    taglineWithFont: {
        fontFamily: "AnonymousPro",
    },

    loadingDots: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ff416c",
        marginHorizontal: 4,
    },

    backgroundCircle1: {
        position: "absolute",
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "rgba(255, 65, 108, 0.1)",
        top: -50,
        left: -50,
        zIndex: 1,
    },

    backgroundCircle2: {
        position: "absolute",
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "rgba(255, 107, 0, 0.1)",
        bottom: -30,
        right: -30,
        zIndex: 1,
    },

    backgroundCircle3: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "rgba(255, 75, 43, 0.1)",
        top: "30%",
        right: "10%",
        zIndex: 1,
    },
});