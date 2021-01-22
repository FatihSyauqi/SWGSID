import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import { StyleSheet, View, FlatList, Text, TouchableHighlight} from 'react-native';
import {ListItem} from 'native-base';
import {_} from 'lodash';

var tempData = [];
for (let i = 1; i <= 100; ++i){
  tempData.push({ "id": i, no_kk: "320104171297000"+i, lat: "-6.418454"+""+i.toString(), lon: "106.776544"+""+i.toString(), alamat: "Alamat lengkap penduduk akan tampil disini" });
}
const itemList = tempData;

const MenuA = ({navigation,route}) => {
  const flatListRef = useRef(null);

  const [limit] = useState(10);
  const [page, setPage] = useState(1);
  const [clientData, setClientData] = useState([]);
  const [serverData, serverDataLoaded] = useState([]);
  const [pending_process, setPending_process] = useState(true);
  const [loadmore, setLoadmore] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const ApiRequest = async thePage => {
    await setTimeout(() => {}, 1500);
    return itemList.slice((thePage - 1) * limit, thePage * limit);
  };

  const requestToServer = async thePage => {
    let data = await ApiRequest(thePage);
    //console.log('data', data);
    serverDataLoaded(data);
  };

  useEffect(() => {
    console.log('requestToServer');
    requestToServer(page);
  }, []);

  useEffect(() => {
    console.log('obtained serverData', serverData);
    if (serverData.length > 0) {
      setRefresh(false);
      setClientData([...clientData, ...serverData]);
      setLoadmore(serverData.length == limit ? true : false);
      setPending_process(false);
    } else {
      setLoadmore(false);
    }
  }, [serverData]);

  useEffect(() => {
    console.log('load more with page', page);
    if (serverData.length == limit || page == 1) {
      setPending_process(true);
      requestToServer(page);
    }
  }, [page]);

  const handleLoadMore = () => {
    console.log('loadmore', loadmore);
    console.log('pending_process', pending_process);
    if (loadmore && !pending_process) {
      setPage(page + 1);
    }
  };

  const onRefresh = () => {
    setClientData([]);
    setPage(1);
    setRefresh(true);
    setPending_process(false);
  };

  const renderRow = ({item}) => {
    return (
        <ListItem onPress={() => navigation.navigate("MenuB",{
            url:item.no_kk,
            header_title: item.no_kk+" - "+item.no_kk
        })}>
        <View>
          <Text style={{color: '#000000'}}>
          <Text style={{color:"black", fontSize:25}}>{item.no_kk}</Text>
          {"\n"} 
          <Text style={{color:"black",fontWeight:"bold"}}>Alamat</Text> : {item.alamat} 
          {"\n"} 
          <Text style={{color:"black",fontWeight:"bold"}}>Longitude</Text> : {item.lon} 
          {"\n"} 
          <Text style={{color:"black",fontWeight:"bold"}}>Latitude</Text> : {item.lat}
          </Text>
        </View>
      </ListItem>
    );
  };

  return (
    <>
      <View style={styles.rowStyle}>
        <View style={styles.col6}>
          <TouchableHighlight
              style={[styles.button,{backgroundColor: '#2aabd2'}]}
              onPress={() => navigation.replace('MainApp')}
              >
              <Text style={styles.buttonText}> RESET DATA</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.col6}>
          <TouchableHighlight
              style={[styles.button,{backgroundColor: '#0060b1'}]}
              onPress={() => navigation.replace('MainApp')}
              >
              <Text style={styles.buttonText}> KIRIM KE SERVER</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.col12}>
          <TouchableHighlight
              style={[styles.button,{backgroundColor: 'green'}]}
              onPress={() => navigation.replace('MenuB')}
              >
              <Text style={styles.buttonText}> TAMBAH DATA SURVEY</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={[styles.container, styles.bg_white]}>
        <FlatList
          ref={flatListRef}
          refreshing={refresh}
          data={clientData}
          renderItem={renderRow}
          keyExtractor={(v, i) => i.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          onRefresh={() => onRefresh()}
        />
      </View>
    </>
  );
};

export default MenuA;

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  },
  bg_white: {
    backgroundColor: "white"
  },
  col12: {
    width: "100%",
    padding:5 
  },
  col6: {
    width: "50%", 
    padding:5
  },
  button: {
    padding: 10,
    margin: 0,
    height: 40,
  },
  buttonText:{
    color: 'white',
    textAlign:'center'
  }
})
