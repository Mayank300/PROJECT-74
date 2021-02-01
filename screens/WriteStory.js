import React from 'react'
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ToastAndroid} from 'react-native'
import { TextInput } from 'react-native-paper';
import db from '../config';

const image = { uri: "https://wallpapercave.com/wp/wp2297884.jpg" };


export default class WriteStory extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      content: '',
    };
  }

  // handleTitle(event) {
  //   this.setState({title: event.target.value});
  //   console.log("title is working");
  // }

  // handleAuthor(event) {
  //   this.setState({author: event.target.value});
  //   console.log("title is author");
  // }

  // handleContent(event) {
  //   this.setState({content: event.target.value});
  //   console.log("title is content");
  // }

  submitStory = async ()=>{
    //add a story
    db.collection("writestory").add({
      title : this.state.title,
      author : this.state.author,
      content : this.state.content,
    })
    this.setState({
      title: '',
      author: '',
      content: ''
    })
    // ToastAndroid.show('Your story has been sumitted', ToastAndroid.SHORT)
  }

    render(){
      return(
        <View style={styles.container}>
          <ImageBackground source={image} style={styles.image}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
              <Text style={styles.headers}>WRITE STORY</Text>
              <TextInput 
                placeholder="Story Title"
                onChangeText= {(text)=>{
                    this.setState({
                        title: text
                    })
                }}
                placeholderTextColor='black'
                value={this.state.title}
                style={styles.textInput}
              />
              <TextInput
                placeholder="Author"
                onChangeText= {(text)=>{
                    this.setState({
                        author: text
                    })
                }}
                placeholderTextColor='black'
                value={this.state.author}
                style={styles.textInput} 
              />
              <TextInput 
                placeholder="Write your story"
                onChangeText= {(text)=>{
                    this.setState({
                        storyText: text
                    })
                }}
                placeholderTextColor='black'
                value={this.state.storyText}
                style={styles.textInput}
                multiline={true}
              />       
              <TouchableOpacity onPress={() => {this.submitStory();}}>
                <Text style={styles.buttonStyle}>SUBMIT</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
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
    marginLeft: "35%",
    marginBottom: "4%",
  },
  headers:{
    fontWeight: "bold",
    margin: "50px",
    fontSize: "40px",
    fontFamily: "Helvetica",
    border: "2px solid black",
    padding: "30px",
    textAlign: "center",
    width: "500px",
    marginLeft: "35%",
    borderRadius: "20px",
    color: "orange",
  },
  buttonStyle:{
    backgroundColor: "orange",
    padding: 10,
    margin: 10,
    width: 120,
    height: 50,
    borderRadius: "20px",
    textAlign: "center",
    justifyContent: "center",
    marginLeft: "45%",
    fontSize: "25px",
  },
});