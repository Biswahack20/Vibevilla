import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';

// Require assets (assuming user moves them to assets folder)
const backgroundImage = require('../../assets/background.png');
const logoImage = require('../../assets/logo vibevilla.png');

export default function IndexScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          // Using a built-in font for fallback if user hasn't downloaded GreatVibes yet
          'GreatVibes': require('../../assets/fonts/GreatVibes-Regular.ttf'),
        });
        setFontsLoaded(true);
      } catch (e) {
        console.log('Custom font not found, proceeding with system font.', e);
        setFontsLoaded(true); 
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View style={styles.container} />; // Blank screen while loading
  }

  const { height: screenHeight } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={backgroundImage} 
        style={styles.bgImage} 
        imageStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}
      >
        <StatusBar style="light" />
        
        {/* Dynamic overlay using flex to adapt to any phone height */}
        <View style={[styles.overlay, { paddingTop: screenHeight * 0.1 }]}>
        
        {/* Top Logo Section */}
        <View style={styles.logoContainer}>
          <Image source={logoImage} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Typography Section */}
        <View style={styles.typographyContainer}>
          <Text style={styles.scriptLarge}>Where connections</Text>
          <Text style={styles.scriptSmall}>feel like a getaway</Text>
        </View>

        <View style={styles.spacer} />

        {/* Buttons Section */}
        <View style={styles.buttonsContainer}>
          
          <Pressable style={({pressed}) => [styles.btnWrapper, pressed && styles.btnPressed]}>
            <LinearGradient
              colors={['#e34c9c', '#942ea3']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.btnPrimary}
            >
              <Ionicons name="home-outline" size={24} color="white" />
              <Text style={styles.btnText}>ENTER VIBEVILLA</Text>
            </LinearGradient>
          </Pressable>

          <Pressable style={({pressed}) => [styles.btnSecondary, pressed && styles.btnPressed]}>
            <FontAwesome5 name="users" size={20} color="white" />
            <View style={styles.btnTextGroup}>
              <Text style={styles.btnTitle}>JOIN AS AUDIENCE</Text>
              <Text style={styles.btnSubtitle}>Watch. Vote. Support.</Text>
            </View>
          </Pressable>

        </View>

        {/* Heart Footer */}
        <View style={styles.footerContainer}>
          <Ionicons name="heart" size={20} color="#f75591" />
        </View>

      </View>
    </ImageBackground>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    paddingHorizontal: width * 0.06, // 6% of screen width for padding
    paddingBottom: height * 0.05,    // 5% of screen height for bottom
    justifyContent: 'flex-start',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.04, // Push down slightly to handle top overlap
    marginBottom: height * 0.08, // Extra large margin to prevent overlapping text below
  },
  logo: {
    width: width,
    height: height * 0.32,
    transform: [{ scale: 2.2 }], // Pushing the zoom multiplier up massively
  },
  typographyContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scriptLarge: {
    fontSize: 38,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    marginBottom: 5,
    fontStyle: 'italic', // Fallback
  },
  scriptSmall: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 0.5,
    fontWeight: '400',
  },
  spacer: {
    flex: 1,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
    marginBottom: 30,
  },
  btnWrapper: {
    width: '100%',
    borderRadius: 35,
    overflow: 'hidden',
  },
  btnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    gap: 10,
  },
  btnSecondary: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    gap: 15,
    backgroundColor: 'rgba(20, 20, 25, 0.65)', 
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  btnTextGroup: {
    alignItems: 'flex-start',
  },
  btnTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  btnSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginTop: 2,
  },
  footerContainer: {
    alignItems: 'center',
  },
});
