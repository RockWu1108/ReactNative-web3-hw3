import { StatusBar } from 'expo-status-bar';
import React,{useState , useEffect} from 'react';
import { StyleSheet, Text, View ,Button ,Image, FlatList ,TouchableOpacity} from 'react-native';
import '../global';
import Web3 from 'web3';

    var  MOCKED_DATA = [
      {
        id : '1',
        name:'Bitcoin',
        symbol:'BTC',
        image_uri:'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png'
      },
      {
        id : '2',
        name:'Ethereum',
        symbol:'ETH',
        image_uri:"https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
    },
    {
      id : '3',
      name:'Tether',
      symbol:'USDT',
      image_uri:"https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
    },
    {
      id : '4',
      name:'Litecoin',
      symbol:'LTC',
      image_uri:'https://s2.coinmarketcap.com/static/img/coins/64x64/2.png'
    }];

export default function HomeScreen(props) {

  const[EthPrice , setEthPrice] = useState(0);
  const[BtcPrice , setBtcPrice] = useState(0);

  const[listData , setListData] = useState([]);

       


  useEffect(() => {
    // const ws = new WebSocket("wss://stream.binance.com:9443/ws/symbol@trade");
    //     ws.onopen = () => {
         
    //       ws.send(
    //         JSON.stringify({
    //           method: "SUBSCRIBE",
    //           params: ["btcusdt@trade" , "ethusdt@trade"],
    //           id: 1
    //         })
    //       );
    // };
    // ws.onmessage = (evnt) => {
    //     console.log(evnt)
    //     if(JSON.parse(evnt.data).s === "ETHUSDT"){
    //       setEthPrice(JSON.parse(evnt.data).p);
    //     }
    //     else if(JSON.parse(evnt.data).s === "BTCUSDT"){
    //       setBtcPrice(JSON.parse(evnt.data).p);
    //     }
    // }
        var currency = MOCKED_DATA;
        setListData(currency);
  })

  const showDetail = (cases) => {

      props.navigation.push('ExchangeDetail',{passProps:cases});
  }



  const renderItem = (cases) => {
      return (
          <TouchableOpacity onPress={() => showDetail(cases)} >
            <View>
                <View style={styles.MainView}> 
                      <View style={{flex:1 , flexDirection:'row'}}>
                        <Image source={{uri :cases.image_uri}} style={{width:30 , height:30 , marginRight:20}}/>   
                        <Text ellipsizeMode="tail" numberOfLines={3} style={{color:'black', fontSize:15 , justifyContent:'center'}}>{cases.name} </Text>
                        <Text ellipsizeMode="tail" numberOfLines={3} style={{color:'black', fontSize:15 , justifyContent:'center'}}>{'( '+cases.symbol+' )'} </Text>
                      </View>
                </View>  
                <View style={styles.operator}/>
            </View>       
          </TouchableOpacity> 
      )
  }


  return (
    <View>
      
      <FlatList 
          data={listData}
          renderItem = {cases => renderItem(cases.item)}
          keyExtractor = {cases => cases.id}
          style={{backgroundColor:'white'}}
      />
    </View>

  );

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 350, 
    height:200, 
    
  },
 
  MainView:{
    height: 80,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    padding:8
  },
  operator:{
      height : 1, 
      backgroundColor:'#dddd'

  }
});

