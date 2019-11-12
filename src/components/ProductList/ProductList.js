import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, Image, TextInput} from 'react-native';
import axios from 'axios';
import {oauth, net} from 'react-native-force';
import ProductRow from "../ProductRow/ProductRow";
import nto from "../../images/nto.png";
export default class ProductList extends Component{




    state = {
        search: null,
        product: []
    };
    componentDidMount(): void {
        var that = this;
        oauth.getAuthCredentials(
            () => that.fetchData(), // already logged in
            () => {
                oauth.authenticate(
                    () => that.fetchData(),
                    (error) => console.log('Failed to authenticate:' + error)
                );
            });
    }
    fetchData() {
        var that = this;
        let queryString = 'SELECT Product2.Id, Product2.Name,Product2.Description, ' +
            'Product2.Default_Price__c, Product2.Image_URL__c,Product2.Rating__c, Product2.Inventory__c ' +
            'FROM PriceBookEntry ' +
            'WHERE Pricebook2.Name = \'Northern Trails Outfitters\' ' +
            'AND (Product2.Image_URL__c != null AND  Product2.Default_Price__c != null) '+
            'ORDER BY Product2.Name';
        net.query(queryString,
            (response) => that.setState({product: response.records})
        );
    }

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#FFFFFF'
            }}>

                {/*<View style={{*/}
                {/*    marginTop: 40,*/}
                {/*    alignItems: 'center'*/}
                {/*}}>*/}
                {/*    <Image source={nto} />*/}
                {/*</View>*/}
                <TextInput
                    style = {styles.input}
                    placeholder = "Search"
                    onChangeText = { text => {
                        this.setState({search: text})
                    }}
                    value = {this.state.search}
                />

                <FlatList
                    //data={this.state.data}
                    data={
                        this.state.product.filter(item => {
                            console.log('data() item name : ', item.Product2.Name);
                            return !this.state.search ||
                                item.Product2.Name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
                        })
                    }
                    renderItem={({item, index}) =>
                        <ProductRow item={item} index={index} navigation={this.props.navigation} />
                    }
                    keyExtractor={(item, index) => 'key_' + index}
                    initialNumToRender={16}
                />
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: 'white',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});
