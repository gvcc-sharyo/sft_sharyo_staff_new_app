// import React from 'react';
import {Text,Dimensions} from 'react-native';
// import {styles} from './styles';

// import Entypo from 'react-native-vector-icons/Entypo';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Foundation from 'react-native-vector-icons/Foundation';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Octicons from 'react-native-vector-icons/Octicons';
// import Zocial from 'react-native-vector-icons/Zocial';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import AntDesignIcons from 'react-native-vector-icons/AntDesign';

// const getIconFont = type => {
//   switch (type) {
//     case 'Entypo':
//       return Entypo;
//     case 'EvilIcons':
//       return EvilIcons;
//     case 'Feather':
//       return Feather;
//     case 'Feather':
//       return Feather;
//     case 'FontAwesome':
//       return FontAwesome;
//     case 'FontAwesome5':
//       return FontAwesome5;
//     case 'Foundation':
//       return Foundation;
//     case 'Ionicons':
//       return Ionicons;
//     case 'MaterialIcons':
//       return MaterialIcons;
//     case 'MaterialCommunityIcons':
//       return MaterialCommunityIcons;
//     case 'Octicons':
//       return Octicons;
//     case 'Zocial':
//       return Zocial;
//     case 'SimpleLineIcons':
//       return SimpleLineIcons;
//     case 'AntDesign':
//       return AntDesignIcons;
//     default:
//       return FontAwesome;
//   }
// };

// const Icons = ({type, ...props}) => {
//   const FontIcon = getIconFont(type);

//   return <FontIcon {...props} />;
// };

// export default Icons;

import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export const Icons = {
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons,
    Feather,
    FontAwesome,
    FontAwesome5,
    AntDesign,
    Entypo,
    SimpleLineIcons,
    Octicons,
    Foundation,
    EvilIcons,
}


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Icon = ({ type, name, color, size = HEIGHT * 0.03, style }) => {
    const fontSize = HEIGHT * 0.03;
    const Tag = type;
    return (
        <>
            {type && name && (
                <Tag name={name} size={size || fontSize} color={color} style={style} />
            )}
        </>
    )
}

export default Icon
