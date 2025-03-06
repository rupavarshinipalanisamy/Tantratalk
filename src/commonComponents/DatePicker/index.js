import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CustomWheelPicker = ({ data, selectedValue, onValueChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(data.indexOf(selectedValue));
  const scrollViewRef = useRef(null);
  const itemHeight = 40;
  const visibleItems = 5;

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / itemHeight);
    if (newIndex >= 0 && newIndex < data.length && newIndex !== selectedIndex) {
      setSelectedIndex(newIndex);
      onValueChange(data[newIndex]);
    }
  };

  const scrollToSelectedIndex = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: selectedIndex * itemHeight,
        animated: true,
      });
    }
  };

  React.useEffect(() => {
    scrollToSelectedIndex();
  }, [selectedIndex]);

  const renderItem = (item, index) => (
    <View
      key={index}
      style={[
        styles.item,
        index === selectedIndex && styles.selectedItem,
      ]}
    >
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingVertical: (visibleItems - 1) / 2 * itemHeight,
        }}
      >
        {data.map(renderItem)}
      </ScrollView>
    </View>
  );
};

const BirthDatePicker = () => {
  const [selectedDay, setSelectedDay] = useState('8');
  const [selectedMonth, setSelectedMonth] = useState('Jan');
  const [selectedYear, setSelectedYear] = useState('2025');

  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const years = Array.from({ length: 100 }, (_, i) => `${1925 + i}`);

  return (
    <View style={{ flexDirection: 'row' }}>
      <CustomWheelPicker
        data={days}
        selectedValue={selectedDay}
        onValueChange={setSelectedDay}
      />
      <CustomWheelPicker
        data={months}
        selectedValue={selectedMonth}
        onValueChange={setSelectedMonth}
      />
      <CustomWheelPicker
        data={years}
        selectedValue={selectedYear}
        onValueChange={setSelectedYear}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 3 - 30,
    height: 200,
    overflow: 'hidden',
  },
  item: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  itemText: {
    fontSize: 20,
  },
});

export default BirthDatePicker;