import React from 'react';
import {View, Text, ImageBackground, StyleSheet, TouchableOpacity,KeyboardAvoidingView } from 'react-native'
import { SearchBar } from 'react-native-elements';
import '../ReadStory.css';
import db from '../config';

const image = { uri: "https://miro.medium.com/max/4574/1*b1T9PtMK3bxboKvnSctNmg.jpeg" };

export default class ReadStory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          search: '',
          readstory: {
            title: '',
            author: '',
            content: '',
          }
        };
        this.listname1 = db
          .collection("readstory")
          .doc("RS001")
          .onSnapshot( doc => {
            this.setState({
              readstory: {
                title: doc.data().title,
                author: doc.data().author,
                content: doc.data().content
              }
            })
        });
    }

    updateSearch = (search) => {
        this.setState({ search });
    };

    // retriveStories = async () => {
    //   const bookRef = await db
    //     .collection("readstory")
    //     // .doc()
    //     .where("author", "==", this.state.text)
    //     .get();
    //     console.log(this.state.text);
    //     console.log(bookRef);
    // };

    render() {
      const { search } = this.state;
      return (
        <View>
          <ImageBackground ImageBackground source={image} style={styles.image}>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Text style={styles.headers}>READ STORY</Text>
            <div className="search-bar-dropdown">
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                />
            </div>
            <div className="allStories">
              <div className="storyList1">
                <TouchableOpacity onPress={this.retriveStories}>
                  <Text className="buttonText"> Title: {this.state.readstory.title} </Text>
                  <Text className="buttonText"> Author: {this.state.readstory.author} </Text>
                  <Text className="buttonText"> Content: {this.state.readstory.content} </Text>
                </TouchableOpacity>
              </div>
            </div>
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
    justifyContent: "center",
    height: '100vh',
  },
  headers:{
    fontWeight: 'bold',
    marginTop: '15px',
    fontSize: '40px',
    fontFamily: 'Helvetica',
    border: '4px solid black',
    padding:'20px',
    textAlign: 'center',
    width: '500px',
    marginLeft: '670px',
    borderRadius: '20px',
    color: 'pink',
    marginBottom: '50px',
  },
  searchstyle:{
    width: '100px',
  },
});