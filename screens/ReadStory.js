import React from 'react';
import {View, Text, ImageBackground, StyleSheet, TouchableOpacity,KeyboardAvoidingView, FlatList, TextInput } from 'react-native'
import '../ReadStory.css';
import db from '../config';
import { ScrollView } from 'react-native-gesture-handler';

const image = { uri: "https://miro.medium.com/max/4574/1*b1T9PtMK3bxboKvnSctNmg.jpeg" };

export default class ReadStory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          search: '',
          allStories:[],
          lastVisibleStory: null,
        };
    }

    fetchMoreStories = async ()=>{
      var text = this.state.search.toUpperCase()
      var enteredText = text.split("")

      
      if (enteredText[0].toUpperCase() ==='B'){
      const query = await db.collection("readstory").where('title','==',text).startAfter(this.state.lastVisibleStory).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allStories: [...this.state.allStories, doc.data()],
          lastVisibleStory: doc
        })
      })
    }
      else if(enteredText[0].toUpperCase() === 'S'){
        const query = await db.collection("readstory").where('bookId','==',text).startAfter(this.state.lastVisibleStory).limit(10).get()
        query.docs.map((doc)=>{
          this.setState({
            allStories: [...this.state.allStories, doc.data()],
            lastVisibleStory: doc
          })
        })
      }
  }


  searchStory= async(text) =>{
    var enteredText = text.split("")  
    if (enteredText[0].toUpperCase() ==='R'){
      const readstory =  await db.collection("readstory").where('bookId','==',text).get()
      readstory.docs.map((doc)=>{
        this.setState({
          allStories:[...this.state.allStories,doc.data()],
          lastVisibleStory: doc
        })
      })
    }
    else if(enteredText[0].toUpperCase() === 'S'){
      const readstory = await db.collection('readstory').where('bookId','==',text).get()
      readstory.docs.map((doc)=>{
        this.setState({
          allStories:[...this.state.allStories,doc.data()],
          lastVisibleStory: doc
        })
      })
    }
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



    componentDidMount = async ()=>{

      if(this.search === null){
        // const query = await db.collection("readstory").limit(10).get()
        query.docs.map((doc)=>{
          this.setState({
            allStories: [],
            lastVisibleStory: doc
          })
        })
      }else if(this.search !== null){
        this.retrieveStories();
      }
        
      }


    render() {
      return (
        <View  style={styles.container}>
          <ImageBackground ImageBackground source={image} style={styles.image}>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Text style={styles.headers}>READ STORY</Text>
            <View style={styles.searchBar}>
              <TextInput 
                style ={styles.bar}
                placeholder = "Enter Title of The Book"
                onChangeText={(text)=>{this.setState({search:text})}}/>
                <TouchableOpacity
                  style = {styles.searchButton}
                  onPress={()=>{this.searchStory(this.state.search)}}
                >
                  <Text>Search</Text>
                </TouchableOpacity>
            </View>

            <View>

              <FlatList
                data={this.state.allStories}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <View style={{borderBottomWidth: 2}}>
                      <Text>{"Book Id: " + item.bookId}</Text>
                      <Text>{"Title:" + item.title}</Text>
                      <Text>{"Author:" + item.author}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                onEndReached ={this.fetchMoreStories}
                onEndReachedThreshold={0.7}
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
  searchBar:{
    flexDirection:'row',
    marginLeft: '36%',
    height:80,
    width:450,
    borderWidth:3,
    borderRadius: '20px',
    alignItems:'center',
    backgroundColor:'pink',
  },
  bar:{
    marginLeft: '11%',
    borderWidth:2,
    height:45,
    width:300,
    paddingLeft:10,
    borderWidth:3,
    borderRadius: '20px',
  },
  searchButton:{
    marginLeft: '1%',
    borderWidth:3,
    borderRadius: '20px',
    height:45,
    width:60,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white'
  }
});