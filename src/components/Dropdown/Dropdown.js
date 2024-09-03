import React from "react";
import { Modal, Text, TouchableOpacity, View, ScrollView } from "react-native";

const Dropdown = ({ list, lebel, value, callback, otherfun = null }) => {
  //   const [modalMapVisible, setmodalMapVisible] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const containerStyle = {
    backgroundColor: "red",
    padding: 20,
    margin: 20,
    borderRadius: 25,
  };
  return (
    <>
      <View style={{}}>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={containerStyle}
          style={{ height: 300, width: 300 }}
          transparent={true}
          animationType={"slide"}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setVisible(false);
          }}
        >
          <View
            style={{
              height: 500,
              backgroundColor: "#6CBB45",
              justifyContent: "center",
              margin: 40,
              marginTop: 100,
              borderRadius: 20,
              //   flexDirection:
            }}
          >
            <View style={{flexDirection:'row',width:'100%', justifyContent:'space-between',alignItems:'center', backgroundColor:'#0D7A3D'}}>
              <Text
                style={{
                  marginBottom: 10,
                  textAlign: "center",
                  padding: 10,
                  fontSize: 17,
                  color: "#fff",
                  borderBottomColor: "#0D7A3D",
                }}
              >
                {lebel ? lebel : ""}
              </Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={{ fontSize: 25, color: "#fff",marginLeft:'auto' , right: 0 , alignItems:'flex-end', paddingRight:10}}>X</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {list.map((item,key) => (
                <TouchableOpacity
                  key={JSON.stringify(key)}
                  onPress={() => {
                    setVisible(false);
                    callback(item);
                    if (otherfun){otherfun(item);}
                  }}
                >
                  <Text
                    style={{
                      marginBottom: 10,
                      textAlign: "center",
                      fontSize: 18,
                      color: "#fff",
                    }}
                  >
                    {item.value}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 30,
          marginLeft: 3,
          borderBottomWidth: 1,
          borderBottomColor: "#0D7A3D",
        }}
        onPress={() => setVisible(true)}
      >
        <Text style={{ padding: 10, paddingBottom: 15, borderBottomColor: "#0D7A3D",  }}>
          {value == "" ? lebel : value.value}
        </Text>
      </TouchableOpacity>
    </>
  );
};
export default Dropdown;
