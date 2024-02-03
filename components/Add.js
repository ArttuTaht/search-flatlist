import { StyleSheet, View, Button, TextInput } from 'react-native'
import React, { useState } from 'react'

export default function Add({items,setItems,storeData}) {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')

    const save = () => {
        const newPerson = {
            id: items.length + 1,
            lastname: lastname,
            firstname: firstname,
        }
        const tempItems = [...items,newPerson]
        storeData(tempItems)
        setItems(tempItems)
        setFirstname('')
        setLastname('')
    }
  return (
    <View style={styles.container}>
        <TextInput
            value={firstname}
            onChangeText={text => setFirstname(text)}
            placeholder='Firstname...'
        />
        <TextInput 
            value={lastname}
            onChangeText={text => setLastname(text)}
            placeholder='Lastname...'
        />
        <Button title='Save' onPress={save} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16
    },
})