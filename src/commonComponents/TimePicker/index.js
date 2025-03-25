import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors } from '../../utils/colors';
import { commonstyles } from '../commonStyles';
import { Button } from '../Button';

const { width } = Dimensions.get('window');
const ITEM_HEIGHT = 50;

const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
const meridians = ['AM', 'PM'];

const CommonTimePicker = ({
  initialTime = { hour: '12', minute: '00', meridian: 'AM' },
  onTimeChange,
  buttonLabel = 'Next',
  containerStyle,
  buttonStyle,
  buttonTextStyle,
}) => {
  const [selectedHour, setSelectedHour] = useState(initialTime.hour);
  const [selectedMinute, setSelectedMinute] = useState(initialTime.minute);
  const [selectedMeridian, setSelectedMeridian] = useState(initialTime.meridian);

  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const meridianRef = useRef(null);

  useEffect(() => {
    if (onTimeChange) {
      onTimeChange({ hour: selectedHour, minute: selectedMinute, meridian: selectedMeridian });
    }
    if (hourRef.current) {
      scrollToIndex(hours, selectedHour, hourRef);
    }
    if (minuteRef.current) {
      scrollToIndex(minutes, selectedMinute, minuteRef);
    }
    if (meridianRef.current) {
      scrollToIndex(meridians, selectedMeridian, meridianRef);
    }
  }, [selectedHour, selectedMinute, selectedMeridian]);
  
  useEffect(() => {
    setTimeout(() => {
      scrollToIndex(hours, selectedHour, hourRef);
      scrollToIndex(minutes, selectedMinute, minuteRef);
      scrollToIndex(meridians, selectedMeridian, meridianRef);
    }, 100); // ✅ Add slight delay to prevent flicker
  }, []);
  

  const scrollToIndex = (data, selected, ref) => {
    const index = data.indexOf(selected);
    if (ref.current) {
      ref.current.scrollTo({ y: index * ITEM_HEIGHT, animated: true });
    }
  };

  const handleScrollEnd = (event, data, setSelected, scrollRef) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const selectedValue = data[index];
  
    setSelected(selectedValue);
  
    // ✅ Force precise alignment after scroll stops
    setTimeout(() => {
      if (scrollRef?.current) {
        scrollRef.current.scrollTo({ y: index * ITEM_HEIGHT, animated: false });
      }
    }, 50);
  };
  

  const renderPicker = (data, selected, setSelected, scrollRef) => (
    <View style={styles.picker}>
      <View style={styles.selectedOverlay} />
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={(event) => handleScrollEnd(event, data, setSelected, scrollRef)}
      >
        <View style={{ height: ITEM_HEIGHT }} />
        {data.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={[styles.itemText, item === selected && styles.selectedText]}>
              {item}
            </Text>
          </View>
        ))}
        <View style={{ height: ITEM_HEIGHT }} />
      </ScrollView>
    </View>
  );
  

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{ alignSelf: 'flex-start', marginLeft: 10, top: 20 }}>
        <Text style={commonstyles.inputlabel}>Please Select your BirthTime</Text>
      </View>
      <View style={styles.pickerContainer}>
        {renderPicker(hours, selectedHour, setSelectedHour, hourRef)}
        {renderPicker(minutes, selectedMinute, setSelectedMinute, minuteRef)}
        {renderPicker(meridians, selectedMeridian, setSelectedMeridian, meridianRef)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20,
    width: '100%',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
    gap: 12,
    height: ITEM_HEIGHT * 3,
  },
  picker: {
    width: width / 4,
    height: ITEM_HEIGHT * 3,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
  },
  selectedOverlay: {
    position: 'absolute',
    top: ITEM_HEIGHT,
    left: '10%',
    right: '10%',
    height: ITEM_HEIGHT,
    borderColor: colors.red,
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 14,
    color: '#999',
  },
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CommonTimePicker;