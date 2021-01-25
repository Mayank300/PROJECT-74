import React from 'react'
import {ImageBackground, View, Text, StyleSheet,TouchableOpacity, Image} from 'react-native'

const image = { uri: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/3bf09552415479.59106033e0bf2.jpg" };

export default class HomeScreen extends React.Component{
    render(){
        return (
            <View style={styles.container}>
                <ImageBackground source={image} style={styles.image}>
                    <Text style={styles.headers}>PUBLISH YOUR STORY OR YOU CAN READ A STORY</Text>
                </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    textInput:{
      width: 500,
      marginLeft: '35%',
      marginBottom: '4%',
    },
    headers:{
      fontWeight: 'bold',
      margin: '50px',
      fontSize: '50px',
      fontFamily: 'Helvetica',
      border: '5px solid black',
      padding:'30px',
      textAlign: 'center',
      width: '800px',
      marginLeft: '30%',
      borderRadius: '20px',
      color: '#07fff8',
    },
    buttonStyle:{
      backgroundColor: 'orange',
      padding: 10,
      margin: 10,
      width: 120,
      height: 50,
      borderRadius: '20px',
      textAlign: 'center',
      justifyContent: 'center',
      marginLeft: '45%',
      fontSize: '25px',
    },
    buttonText:{
      fontSize: 30,
    },
    check:{
      fontSize: 30, 
  
    }
  });