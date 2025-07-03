import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import React from 'react';
import { CommonHeader } from '../commonComponents/components';
import { colors } from '../utils/colors';
import { tantraBooksData } from '../utils/Datas/tantrabooks';

const { width } = Dimensions.get('window');

const TantraBooks = () => {
  const renderBookItem = ({ item }) => (
    <View style={styles.card}>
      {item.image && <Image source={item.image} style={styles.image} />}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>{item.author}</Text>
      <Text style={styles.description}>{item.description}</Text>

      {item.pdfUrl && (
        <TouchableOpacity
          style={styles.readButton}
          onPress={() => Linking.openURL(item.pdfUrl)}
        >
          <Text style={styles.readButtonText}>Read PDF</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <CommonHeader name="Tantra Books" />
      <FlatList
        data={tantraBooksData}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightgrey,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: width - 64,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 6,
  },
  author: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.darkGrey,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: colors.black,
    marginBottom: 12,
  },
  readButton: {
    backgroundColor: colors.red,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  readButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TantraBooks;
