import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const AppIcon = ({ name, size = 30, color = 'black', style, library = 'MaterialIcons' }) => {
  let IconComponent;
  switch (library) {
    case 'AntDesign':
      IconComponent = AntDesign;
      break;
      case 'Fontisto':
        IconComponent = Fontisto;
        break;
    case 'Feather':
      IconComponent = Feather;
      break;
    case 'MaterialCommunityIcons':
      IconComponent = MaterialCommunityIcons;
      break;
    case 'Ionicons':
      IconComponent = Ionicons;
      break;
    case 'MaterialIcons':
    default:
      IconComponent = MaterialIcons;
      break;
  }

  return (
    <IconComponent
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
};

export default AppIcon;
