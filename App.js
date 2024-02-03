import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import { DATA } from './Data';
import Row from './components/Row';
import Search from './components/Search';
import { useEffect, useState } from 'react';
import Add from './components/Add';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@persons_key'

export default function App() {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  
  useEffect(() => {
    //AsyncStorage.clear()
    //setItems(DATA);
    getData()
  }, [])
  
  const executeSearch = (search) => {
    const searchArray = DATA.filter((item) => item.lastname.startsWith(search) || item.firstname.startsWith(search));
    setItems(searchArray);
  }

  const select = (id) => {
    setSelectedId(id);
  }

  const getData = async() => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      const json = JSON.parse(value)
      if (json === null) {
        json = []
      }
      console.log(json)
      setItems(json)
    } catch (ex) {
      console.log(ex)
    }
  }

  const storeData = async(value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(STORAGE_KEY,jsonValue)
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Search executeSearch={executeSearch} />
      <Add items={items} setItems={setItems} storeData={storeData}/>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        renderItem = {({item}) => (
          <Row person={item} selectedId={selectedId} select={select}/>
        )}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
});
