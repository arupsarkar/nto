import React, { Component } from 'react';

import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity, Button
} from 'react-native';


export default class ProductReview extends Component{
    constructor(props) {
        super(props);
        this.state = {
            productItem: ''
        } ;
    }

    static navigationOptions = {
        title: 'Review Details'
    };

    addReview = () => {
        this.props.navigation.navigate('AddReview',{
            item: this.state.productItem
        });
    };

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const item = this.props.navigation.getParam('item');
        console.log('Product Name', item.Product2.Name);
        console.log('Product Id', item.Product2.Id);
        console.log('Product Description', item.Product2.Description);
        return (
            <ScrollView style={styles.root}>
                <View style={styles.infoHeader}>
                    <Image
                        source={{
                            uri: item.Product2.Image_URL__c
                        }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.info}>
                    <Text style={styles.name}>{item.Product2.Name}</Text>
                    <Text style={styles.address}>{item.Product2.Description}</Text>
                    <View style={styles.edges}>
                        <Button
                            title="Add Review"
                            onPress={this.addReview}>
                        </Button>
                    </View>
                </View>
            </ScrollView>

        );
    }
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
    },
    infoHeader: {
        flexDirection: 'row'
    },
    info: {
        flex: 1,
        flexWrap: 'wrap',
        marginTop: 20,
    },
    name: {
        fontSize: 24
    },
    address: {
        color: 'grey',
        marginBottom: 5
    },
    image: {
        width: 100,
        height: 100,
        margin: 20
    },
    stars: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 5,
        minWidth: 50
    },
    button: {
        borderWidth: 1,
        borderColor: '#0066cc',
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: '#fff',
        marginTop: 10
    },
    buttonText: {
        color: '#0066cc',
        fontSize: 12,
        textAlign: 'center'
    }
});
