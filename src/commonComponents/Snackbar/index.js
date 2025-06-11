import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import {View, Text, Animated, TouchableOpacity, StyleSheet} from 'react-native';
// import {Icon} from '@ui-kitten/components';

const SnackbarContext = createContext();

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  return context;
};

export const SnackbarProvider = ({children}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWarning, setisWarning] = useState(false);
  const [time, setTime] = useState(1000);
  const slideUpAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideUpAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(slideUpAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setIsVisible(false));
        }, time);
      });
    }
  }, [isVisible, slideUpAnimation]);

  const showSnackbar = snackbarProps => {
    setMessage(snackbarProps?.text);
    setIsVisible(true);
    setTime(snackbarProps?.time);
    if (snackbarProps?.status === 'success') {
      setIsSuccess(true);
      setisWarning(false);
    } else if (snackbarProps?.status === 'error') {
      setIsSuccess(false);
      setisWarning(false);
    } else if (snackbarProps?.status === 'warning') {
      setIsSuccess(false);
      setisWarning(true); // You can set the color and icon for warning as needed.
    }
  };

  const snackbar = {
    isVisible,
    message,
    status: isSuccess ? 'success' : 'error',
    showSnackbar,
  };

  function CustomIcon(props) {
    return (
      <Icon
        style={{
          width: 25,
          height: 21,
        }}
        fill={'white'}
        name={props?.iconName}
      />
    );
  }

  return (
    <SnackbarContext.Provider value={snackbar}>
      {children}
      {isVisible && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}>
          <Animated.View
            style={{
              position: 'absolute',
              transform: [
                {
                  translateY: slideUpAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                  }),
                },
              ],
              left: 0,
              right: 0,
              bottom: 50,
              paddingVertical: 12,
              alignItems: 'center',
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: isSuccess
                  ? '#4e9a51'
                  : isWarning
                  ? '#E08021' // Use your preferred color for warnings
                  : '#dc5a5a',
                borderColor: isSuccess
                  ? '#00AE07'
                  : isWarning
                  ? '#EBD8CC' // Use your preferred border color for warnings
                  : '#ebccd1',
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                elevation: 10,
                maxWidth: '85%',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 5,
                }}>
                {/* <CustomIcon iconName="alert-circle-outline" /> */}
              </View>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '500',
                    paddingLeft: 2,
                    paddingRight: 10,
                    maxWidth: 250,
                  }}>
                  {message}
                </Text>
              </View>
              <View style={{paddingHorizontal: 5}}>
                <TouchableOpacity
                  onPress={() => {
                    Animated.timing(slideUpAnimation, {
                      toValue: 0,
                      duration: 300,
                      useNativeDriver: true,
                    }).start(() => setIsVisible(false));
                  }}>
                  {/* <CustomIcon iconName="close-outline" /> */}
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      )}
    </SnackbarContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent', // Make the overlay transparent
  },
  // ... (existing styles remain the same)
});
