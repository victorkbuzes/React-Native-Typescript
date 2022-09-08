
import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { FlatList, Text, StyleSheet, View, Image } from 'react-native';
import { fetchUsers, User } from './userListSlice';

const UserList = () => {
  const dispatch = useDispatch();
  const screenState = useSelector((state: RootState) => state.userList);

  useEffect(() => {
    dispatch(fetchUsers({page: 1}));
  }, []);

  const handleOnEndReached = () =>{
    if (!screenState.loading){
      dispatch(fetchUsers({page: screenState.nexPage}));
    }

  }
  return (
    <>
      {screenState.loading && <Text>Loading</Text>}
      {screenState.error && <Text>Error</Text>}
      {!screenState.error && !screenState.loading &&<Text>Default</Text>}
      <FlatList
      data= {screenState.users}
      keyExtractor={(_, index) => {
        return index.toString();
      }}
      renderItem = {({item}) => <UserListItem user={item}/> }
      onEndReached={handleOnEndReached}
      ></FlatList>
      
     </>
  )
}

const UserListItem:FunctionComponent <{user: User}>   = ({ user}) => {
  return (
    <View style = {styles.container}>
      <Text style= {styles.nameText}  >{user.name.first}</Text>
  
      <Image style = {styles.thumbnail} source={{ uri: user.picture.thumbnail}} />
    </View>
    
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',

  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: 'purple',
    borderWidth: 3

  },
  nameText: {
    padding: 15,

  }
})




  





export default UserList;


