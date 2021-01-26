import React from 'react';
import {View, Text, ImageBackground, StyleSheet, TouchableOpacity,KeyboardAvoidingView, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements';
import '../ReadStory.css';
import db from '../config';

const image = { uri: "https://miro.medium.com/max/4574/1*b1T9PtMK3bxboKvnSctNmg.jpeg" };

export default class ReadStory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          search: '',
          allStories:[]
        };
    }

    componentDidMount(){
      this.retrieveStories()
    }

    retrieveStories=()=>{
      try {
        var allStories= []
        var readstory = db.collection("readstory")
          .get().then((querySnapshot)=> {
            querySnapshot.forEach((doc)=> {
                allStories.push(doc.data())
                console.log('story is visible',allStories)
            })
            this.setState({allStories})
          })
      }
      catch (error) {
        console.log(error);
      }
    };

    render() {
      const { search } = this.state;
      return (
        <View>
          <ImageBackground ImageBackground source={image} style={styles.image}>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Text style={styles.headers}>READ STORY</Text>
            <div className="search-bar-dropdown">
              <SearchBar
                placeholder="Search Story"
                onChangeText= {(text)=>{
                    this.setState({
                        title: text
                    })
                }}
                placeholderTextColor='white'
                value={this.state.title}
              />
            </div>
            <View>
              <FlatList
                data={this.state.allStories}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Text>Title: {item.title}</Text>
                    <Text>Author : {item.author}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
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
  itemContainer: {
    marginTop: '20px',
    height: 80,
    width:'70%',
    borderWidth: 2,
    borderColor: 'pink',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white'
  },
});