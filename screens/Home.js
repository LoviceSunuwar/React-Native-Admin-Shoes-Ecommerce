import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native' // Mught have to add pressable
 
import React, { useState, useEffect} from 'react'
import { firebase } from '.firebase/firebaseConfig';
import { fontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { QuerySnapshot } from 'firebase/firestore';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Home = () => {
    const [shoes, setShoes] = useState([]);
    const shoesRef = firebase.firestore().collection('Shoes');
    const [addData, setAddData] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        shoesRef
        .orderBy('createdAt', 'desc') //<< there might be a change here keep a note 
        .onSnapshot(
            QuerySnapshot => {
                const shoes = []
                QuerySnapshot.forEach((doc) => {
                    const {heading} = doc.data()
                    shoes.push({
                        id: doc.id,
                        heading,

                    })
                })
                setShoes(shoes)
            }
        )
    }, [])

    //Delete a shoes from firestore db

    const deleteShoes = (shoes) => {
        shoesRef
            .doc(shoes.id)
            .delete()
            .then(() => {

                // Shows a alert saying it is succesfull
                alert("The shoes is removed")
            })
            .catch(error => {
                alert(error);
            })
    }


    // Adding a shoes

    const addShoes = () => {
        // Checking if we have a shoes

        if (addData && addData.length > 0){

            //Getting the timestamp

            const timestamp = firebase.firestore.FieldValue.serverTimeStamp();
            const data = {
                heading: addData,
                createdAt: timestamp

            };
            shoesRef

                .add(Data)
                .then(() => {
                    setAddData('');
                    //Release the keyboard
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    alert(error);
                })

        }

    }

    // SHowing the shoes data in flatlist for the admin
    // Might have to add in the extra data later on here 
    return(
    <View style={{flex:1}}>
            
            <View style={StyleSheet.formContainer}>
                <TextInput
                style={style.input}
                placeholder='Brand of the shoes'
                placeholderTextColor='#aaaaaa'
                onChangeText={(heading) => setAddData(heading)}
                value = {addData}
                autoCapitalize = 'none' />
                

            <TouchableOpacity style={Styles.button} onPress={addShoes}></TouchableOpacity>
            <Text style = {styles.buttonText}>
                Add
            </Text>
            </View>

            <FlatList
            data = {shoes}
            numColumns={1}
            renderItem={({item}) => (
                <View>
                    <Pressable
                        // Making the flatlist pressable so that we can navigate to the details page
                        style={style.container}
                        onPress={() => navigation.navigate('Details', {item})}
                    >

                        <fontAwesome
                            name = 'trash-o'
                            color='red'
                            onPress = {() => deleteShoes(item)}
                            style={styles.todoIcon}
                        />

                        <View
                        style={styles.innerContainer}>
                            <Text style={styles.itemHeading}>
                                {item.heading[0].toupperCase() + item.heading.slice(1)}
                            </Text>
                        </View>

                    </Pressable>


                </View>
            )}
            >

            </FlatList>
                
        </View>

    )    


}

export default Home

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius:15,
        margin:5,
        marginHorizontal:10,
        flexDirectrion:'row',
        alignItems:'center'
    },
    innerContainer:{
        alignItems:'center',
        flexDirection:'Column',
        marginLeft:45,
    },
    itemHeading:{
        fontWeight:'bold',
        fontSize:10,
        marginRight:22,
    },
    formContainer:{
        flexDirection:'',
        height:80,
        marginLeft:10,
        marginRight:10,
        marginTop:100,

    }
    //Video of 25:21

})