import React from 'react';
import {Dimensions} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const styles = {
  loginContainer: {
    // flex: 1,
    height: '100%',
    // backgroundColor: "#D4FCF8",
    //
  },
  inputPaper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7691f5',
    height: HEIGHT * 0.08,
    fontSize: HEIGHT * 0.02,
    overflow: 'hidden',
    marginVertical: HEIGHT * 0.01,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    // justifyContent:"center"
  },
  buttonContainer: {
    borderColor: '#0D7A3D',
    borderWidth: 1,
  },
  modalViewAddStaff: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  modalView: {
    // width:'100%' ,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  // modalView: {
  //   margin: 20,
  //   backgroundColor: 'white',
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },

  cameraGalleryView: {
    // flexDirection: 'row',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  addServiceBox: {
    marginVertical: WIDTH * 0.01,
    marginHorizontal: WIDTH * 0.05,
    borderRadius: 10,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowColor: '#2144C1',
    elevation: 4,
    backgroundColor: 'white',
  },
};
