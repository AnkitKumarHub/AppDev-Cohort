import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

const USERS = [
    { id: "1", name: 'John Doe', email: 'john@example.com' },
    { id: "2", name: 'Jane Doe', email: 'jane@example.com' },
    { id: "3", name: 'Jim Doe', email: 'jim@example.com' },
    { id: "4", name: 'Jill Doe', email: 'jill@example.com' },
    { id: "5", name: 'Jack Doe', email: 'jack@example.com' },
    { id: "6", name: 'Jill Doe', email: 'jill@example.com' },
]

const HomeScreen = () => {
    return (
        <FlatList
        style={{backgroundColor: 'slategray'}}  // this will cover the whole screen
            data={USERS}
            // numColumns={2} // this will render the list in a grid of 2 columns
            // horizontal={true} // this will render the list in a horizontal direction
            // showsHorizontalScrollIndicator={false} // this will hide the scroll indicator
            keyExtractor={(item) => item.id}
            contentContainerStyle={{padding: 20, backgroundColor: 'lightblue'}} //this will cover only the rendered items
            renderItem={({ item }) => <Text>{item.name} - {item.email}</Text>}
            ItemSeparatorComponent={() => (
                <View style={{height: 1, backgroundColor: 'grey'}} />
            )}
        />

    )
}

export default HomeScreen

const styles = StyleSheet.create({})

// FlatList --> performance optimized list component that is used to render a list of items --> its render only that items which is in the view port(jo ki screen pe dikha de rahe) and not the whole list --> infinite scroll/ lazy load

// sectionList --> used to render a list of items in a section --> it is a more efficient way to render a list of items in a section.

//whereas scrollView will render the whole list for eg 2000 items which are not completely visible on the screen. 