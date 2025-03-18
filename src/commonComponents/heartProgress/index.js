import React from "react";
import { View } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop, ClipPath } from "react-native-svg";
import { colors } from "../../utils/colors";

const HeartProgressBar = ({ progress }) => {

  const percentage = Math.min(1, Math.max(0, progress));
  const waveHeight = 3; 
  const wavePath = `
    M 0 ${24 - percentage * 24}
    Q 4 ${24 - percentage * 24 - waveHeight}, 8 ${24 - percentage * 24}
    T 16 ${24 - percentage * 24}
    T 24 ${24 - percentage * 24}
    V 24 H 0 Z
  `;

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg width={100} height={100} viewBox="0 0 24 24">
        <Defs>
          {/* Gradient for filling the progress */}
          <LinearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={colors.red} stopOpacity="1" />
            <Stop offset="100%" stopColor="pink" stopOpacity="1" />
          </LinearGradient>

          {/* Clip path to keep the progress inside the heart */}
          <ClipPath id="clip">
            <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </ClipPath>
        </Defs>

        {/* Heart outline */}
        <Path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          stroke={colors.red}
          strokeWidth={1}
          fill="none"
        />

        {/* Wavy Progress Fill */}
        <Path
          d={wavePath}
          fill="url(#progressGradient)"
          clipPath="url(#clip)"
        />
      </Svg>
    </View>
  );
};

export default HeartProgressBar;
