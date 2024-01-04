import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export const Header = () => {
    return(
        <View>
            <Text style = {styles.Header}>
                Easy Ordering
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Header:{
        marginTop:50,
        textAlign:'center',
        color:'black',
        fontSize:20
    }
})