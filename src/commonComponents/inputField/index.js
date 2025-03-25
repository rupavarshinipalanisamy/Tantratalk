import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { styles } from './styles';

export const InputField = ({
  label = '',
  // labelFontWeight = 'normal',
  placeholder = '',
  value = '',
  borderColor = '',
  onChange = () => false,
  isError = false,
  onBlur,
  type = 'default',
  fullWidth = false,
  parentProps = {},
  disabled = false,
  KeyClick = () => null,
  isLabel = false,
  name,
  autofocus = false,
  style = {},
  multiline = false,
  onFocus = () => null,
  isUpperCase = false,
  maxLength = 1000,
  textColor = 'black',
  placeholderTextColor = '#afafaf',
  borderWidth = 1,
  secureTextEntry=false
}) => {
  return (
    <View style={{ width: '100%' }}>
      <>
        {isLabel && (
          <Text style={{ ...styles.label}}>
            {label}
          </Text>
        )}
        <TextInput
          value={value?.toString()}
          onChangeText={onChange}
          placeholder={placeholder}
          name={name}
          maxLength={maxLength}
          autoCapitalize={isUpperCase ? 'characters' : 'none'}
          keyboardType={type}
          onBlur={onBlur}
          placeholderTextColor={placeholderTextColor}
          style={{
            ...style,
            ...styles.textBox,
            ...(isError ? styles.error : null),
            ...(fullWidth ? styles.fullWidth : null),
            // borderColor: disabled
            //   ? borderColor
            //     ? borderColor
            //     : 'grey'
            //   : borderColor
            //     ? borderColor
            //     : '#ccc',
            color: textColor,
            // height: multiline,
          }}
          multiline={multiline}
          secureTextEntry={secureTextEntry}
          editable={!disabled}
          onKeyPress={KeyClick}
          autoFocus={autofocus}
          onFocus={data => onFocus(data)}
          {...parentProps}
        />
      </>
    </View>

  );
};

// size ENUM
const SIZE = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};
InputField.size = SIZE;