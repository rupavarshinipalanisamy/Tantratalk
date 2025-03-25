import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { colors } from '../../utils/colors';
import { commonstyles } from '../commonStyles';
import { Button } from '../Button';

const { width } = Dimensions.get('window');
const ITEM_HEIGHT = 50;

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const days = Array.from({ length: 31 }, (_, i) =>
  (i + 1).toString().padStart(2, '0')
);
const years = Array.from({ length: 50 }, (_, i) => (1990 + i).toString());

const CommonDatePicker = ({
  initialDate = {
    month: months[new Date().getMonth()],
    day: new Date().getDate().toString().padStart(2, '0'),
    year: new Date().getFullYear().toString(),
  },
  onDateChange,
  buttonLabel = 'Next',
  containerStyle,
  buttonStyle,
  buttonTextStyle,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(initialDate.month);
  const [selectedDay, setSelectedDay] = useState(initialDate.day);
  const [selectedYear, setSelectedYear] = useState(initialDate.year);

  const monthRef = useRef(null);
  const dayRef = useRef(null);
  const yearRef = useRef(null);

  useEffect(() => {
    scrollToIndex(months, selectedMonth, monthRef);
    scrollToIndex(days, selectedDay, dayRef);
    scrollToIndex(years, selectedYear, yearRef);
  }, [selectedMonth, selectedDay, selectedYear]); 

  useEffect(() => {
    if (onDateChange) {
      onDateChange({ month: selectedMonth, day: selectedDay, year: selectedYear });
    }
  }, [selectedMonth, selectedDay, selectedYear]);

  const scrollToIndex = (data, selected, ref) => {
    const index = data.indexOf(selected);
    if (ref.current) {
      ref.current.scrollTo({ y: index * ITEM_HEIGHT, animated: false });
    }
  };
  const handleScrollEnd = (event, data, setSelected, scrollRef) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT); // ✅ Ensures proper snapping
    const selectedValue = data[index];
  
    setSelected(selectedValue);
  
    // ✅ Force precise scroll alignment to prevent floating-point issues
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
        ref={scrollRef} // ✅ Attach ref correctly
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={(event) => handleScrollEnd(event, data, setSelected, scrollRef)} // ✅ Pass ref
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
      <View style={{ alignSelf: "flex-start", marginLeft: 10, top: 20 }}>
        <Text style={commonstyles.inputlabel}>Please Select your BirthDate</Text>
      </View>
      <View style={styles.pickerContainer}>

        {renderPicker(months, selectedMonth, setSelectedMonth, monthRef)}
        {renderPicker(days, selectedDay, setSelectedDay, dayRef)}
        {renderPicker(years, selectedYear, setSelectedYear, yearRef)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#FFFBE8',
    alignItems: 'center',
    paddingTop: 20,
    width:"100%"
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop:30,
    // borderColor: '#FDD835',
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
    left: "10%",
    right: "10%",
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
  button: {
    marginTop: 20,
    backgroundColor: '#FDD835',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CommonDatePicker;
