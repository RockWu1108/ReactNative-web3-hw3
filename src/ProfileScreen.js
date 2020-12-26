import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,TextInput} from 'react-native';
import Web3 from 'web3';
import { BigNumber } from "bignumber.js";

export default function ProfileScreen(props) {

 const[balance , setbalance] = useState(0);
 const [text , setText] = useState("");
 const [value , setValue] = useState(0);
 const [hash , setHash] = useState("");
 const ethAccount = "0x7FF972A8769417bc3870664fcc2D8190d4Af23dD";
 const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/60884cd048a04f8ca58104fb188b2f91"));
  web3.eth.getBalance(ethAccount).then((result) =>{
    setbalance(Web3.utils.fromWei(result, 'ether'));
  });

  const transferEth =  () =>{
    const Tx = require('ethereumjs-tx').Transaction
    const privateKey = Buffer.from('d6b49f21f223ad504a65285312b4e112715c4420f5a595e341d65c14e61f7206', 'hex');
    web3.eth.getTransactionCount(ethAccount).then(_nonce => {
     
      
      console.log("value: " + value);
      console.log("text: " + text);

      const money = web3.utils.toWei(value.toString() , 'ether')
      console.log("money: " + money);
      console.log("hexmoney: " +  web3.utils.toHex(money));

      const txParams = {
        gasPrice: web3.utils.toHex(20000000000),
        gasLimit: web3.utils.toHex(2300000),
          to: text,
          from: ethAccount,
          nonce: web3.utils.toHex((_nonce)),
          value: web3.utils.toHex(money)
        };
    
        const tx = new Tx(txParams, {'chain':'ropsten'});

        tx.sign(privateKey); // Transaction Signing here
    
        const serializedTx = tx.serialize();
    
        web3.eth.sendSignedTransaction('0x'+serializedTx.toString('hex')).then((result) =>{
            console.log(result);
            setHash(result.transactionHash);
           
        })

        web3.eth.getBalance(ethAccount).then((result) =>{
          setbalance(Web3.utils.fromWei(result, 'ether'));
        });

      })
  }

    

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Eth Address : {"\n\n" +ethAccount}</Text>
      <Text style={styles.text}>Eth Balance : {"\n\n" +balance + " ETH"}</Text>

      <TextInput style = {styles.inputText} placeholder="輸入轉入帳戶地址" onChangeText = {(text)=>{ setText(text)}}></TextInput>
      <TextInput style = {styles.inputText} placeholder="輸入轉入金額" onChangeText = {(value)=>{ setValue(value)}}></TextInput>
      <TouchableOpacity style={styles.touchableOpacity} onPress={() =>{transferEth()}}>
                <Text style={{textAlign:'center' , fontSize:20, color: 'white'}}>交易ETH</Text>
      </TouchableOpacity>
      {hash !=='' ? <Text style={styles.text}>交易hash值：{hash}</Text> : <Text></Text>}
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
    width: 400, 
    height:200, 
  },
  text :{
    width: 350, 
    height:100,
    textAlign:'left',
    margin: 10,
    borderRadius:5,
    borderWidth:1,
    backgroundColor:'white',
    color:'black',
    fontSize: 15,
    padding:10
  },
  inputText : {
    width : 350,
    height : 40 ,
    textAlign : 'center',
    color :'black',
    borderColor : 'black',
    borderWidth : 2 ,
    borderRadius : 8,
    margin :20
},
touchableOpacity :{

  width: 350,
  height : 40,
  backgroundColor :'#0080FF',
  borderWidth:2,
  borderColor:'black',
  borderRadius: 10,
  marginTop :10,
  justifyContent: 'center'
}
});

