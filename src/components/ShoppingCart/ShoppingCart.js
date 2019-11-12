import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, Image, TextInput, Button} from 'react-native';

export default class ShoppingCart extends Component{


    buy = () => {
        console.log('Buy button pressed.');
        const item = this.props.item;
        console.log('Buy item:', item);
    };

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const item = this.props.navigation.getParam('item');
        return (

            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',
                paddingTop: 20
            }}>
                <Text>{item.Product2.Name}</Text>
                <Text style={styles.addressText}>{item.Product2.Description}</Text>
                <Text style={styles.price}>${item.Product2.Default_Price__c}</Text>
                <View style={styles.nameAddress}>
                    <Image
                        source={{
                            uri: item.Product2.Image_URL__c,
                        }}
                        style={{
                            flex: 1,
                            height: 100,
                            alignItems: 'center'
                        }}
                        resizeMode="contain"
                    />
                </View>
                <Button
                    title="Buy"
                    onPress={this.buy}>
                </Button>
            </View>


        );
    }
}


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    edges: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        minWidth: 60
    },
    nameAddress: {
        flexDirection: 'column',
        flex: 8
    },
    addressText: {
        color: 'grey'
    },
    price:{
        color: 'red',
        fontWeight: 'bold',
        fontSize: 15,
    },
    button: {
        borderWidth: 1,
        borderColor: '#0066CC',
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: '#fff',
    },
    buttonText: {
        color: '#0066CC',
        fontSize: 12
    },
    info: {
        marginHorizontal: 40,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4
    },
    stars: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 5,
        minWidth: 50
    },
});
