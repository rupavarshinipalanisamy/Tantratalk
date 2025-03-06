import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

export const Button = ({
  title = 'Button',
  onPress = () => null,
  backgroundColor = '#BD2C3C',
  textColor = 'white',
  disabled = false,
  loading = false,
  fullWidth = false,
  borderRadius = 10,
  fontSize = 16,
  padding = 12,
  style = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        { backgroundColor, borderRadius, padding },
        fullWidth && { width: '100%' },
        style
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor, fontSize }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};


export const SmallBtn = ({
  title = 'Button',
  onPress = () => null,
  backgroundColor ="",
  textColor = 'white',
  disabled = false,
  loading = false,
  fullWidth = false,
  borderRadius = 8,
  fontSize = 12,
  padding = 8,
  style = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        smallbtnstyles.button,
        { backgroundColor, borderRadius, padding },
        fullWidth && { width: '50%' },
        style
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text style={[smallbtnstyles.text, { color: textColor, fontSize }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const smallbtnstyles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 12,
    borderRadius: 10,
    marginTop: 5,
  },
  text: {
    fontWeight: 'bold',
    fontSize:8
  },
});

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 12,
    borderRadius: 10,
    marginTop: 5,
  },
  text: {
    fontWeight: 'bold',
  },
});
