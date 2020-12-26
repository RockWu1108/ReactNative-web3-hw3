import { StatusBar } from 'expo-status-bar';
import React,{useState , useEffect} from 'react';
import { StyleSheet, Text, View ,Button ,Image } from 'react-native';
import '../global';
import Web3 from 'web3';


export default function HomeDetailScreen(props) {

    const passProps = props.route.params.passProps || 'nothing'

    const [price , setPrice]= useState(0);
    const [quantity , setQuantity] = useState(0); 
    useEffect(() => {
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${passProps.symbol}USDT@trade`);

            ws.onopen = () => {
              ws.send(
                JSON.stringify({
                  method: "SUBSCRIBE",
                  params: [`${passProps.symbol.toLowerCase()}usdt@trade`],
                  id: 1
                })
              );
        };
        ws.onmessage = (evnt) => {
            console.log(evnt)
            setPrice(JSON.parse(evnt.data).p);
            setQuantity(JSON.parse(evnt.data).q)

        }
        return () => {
            ws.close();
        }
      },[])

    return (
        <View style={styles.container}>
             <Image source={{uri :passProps.image_uri}} style={{width:200, height:200 , margin:30}}/>   

                   <Text style={styles.text}>{"貨幣名稱:\t"+passProps.name}</Text>
                   <Text style={styles.text}>{"目前價格:\t"+ price}</Text>
                   <Text style={styles.text}>{"交易量:\t"+ quantity}</Text>
        </View>
    );

    }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 350, 
    height:200, 
    
  },
  text :{

    marginTop: 20,
    backgroundColor:'white',
    color:'black',
    fontSize: 25
 }
});

