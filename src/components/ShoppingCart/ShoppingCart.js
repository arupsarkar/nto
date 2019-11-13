import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, Image, TextInput, Button, TouchableHighlight} from 'react-native';
import {oauth, net} from 'react-native-force';
import getPBEId from "../Utils/getPriceBookEntryId";

export default class ShoppingCart extends Component{

    constructor(props) {
        super(props);
        this.state = {
            productItem: ''
        } ;
    }
    state = {
        user: []
    };
    state = {
        account: []
    };
    state = {
        order: []
    }
    state = {
        orderItem: []
    }
    state = {
        pbeId: ''
    }
    componentDidMount(): void {
        var that = this;
        oauth.getAuthCredentials(
            (response) => {
                console.log('Shopping cart : ', response.userId);
                that.fetchUserName(response.userId);
            }, // already logged in
            () => {
                oauth.authenticate(
                    (response) => {
                        console.log('oauth.authenticate: ', response);
                    },
                    (error) => console.log('Failed to authenticate:' + error)
                );
            });
    }
    fetchUserName(userId) {
        var that = this;
        console.log('fetchUserName: Start');
        let queryString = 'SELECT Id, Name FROM User WHERE Id = \'' + userId + '\'';

        net.query(queryString,
            (response) => {
                that.setState({user: response.records})
                let queryAccountString = 'SELECT Id, Name FROM Account WHERE Name = \'' + this.state.user[0].Name + '\'';
                //get the account id
                net.query(queryAccountString,
                    (response) => {
                    that.setState({account: response.records})
                },
                    (err) => {
                        console.log('Error:', err);
                    });


            }
        );
        console.log('fetchUserName: End');
    }

    createOrderItem = () => {
        var that = this;
        //create an order item
        net.create('OrderItem',
            {
                "OrderId": that.state.order.id,
                "Product2Id": this.state.productItem.Product2.Id,
                "Quantity": 1,
                "UnitPrice": this.state.productItem.Product2.Default_Price__c,
                "PricebookEntryId": that.state.pbeId
            },
            (response) => {
                console.log('Order Item record created: ', response);
                that.setState({orderItem: response})
                console.log('Order Item record : ', that.state.orderItem.id);
            },
            (err) => {
                console.log('OrderItem record creation failed: ', err);
            });
    }

    buy = () => {
        var that = this;
        console.log('Buy button pressed.');
        console.log('user name :', this.state.user[0].Name);
        console.log('account name :', this.state.account[0].Name);
        console.log('account Id :', this.state.account[0].Id);
        console.log('product :', this.state.productItem);
        console.log('product :', this.state.productItem.Product2.Name);
        console.log('pbe url :', this.state.productItem.attributes.url);
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        let effectiveDate = new Date(today);
        //get the PBE Id
        let priceBookEntryId = getPBEId(this.state.productItem.attributes.url);
        that.state.pbeId = priceBookEntryId;
        console.log('pbe id', that.state.pbeId);
        console.log('pb id', this.state.productItem.Pricebook2.Id);

        //create an order
        net.create('Order',
            {
                "AccountId": this.state.account[0].Id,
                "OwnerId": this.state.user[0].Id,
                "Pricebook2Id": this.state.productItem.Pricebook2.Id,
                "EffectiveDate": effectiveDate,
                "Status": "Draft"
            },
            (response) => {
                console.log('Order record created: ', response);
                that.setState({order: response})
                console.log('Order record : ', that.state.order.id);
                that.createOrderItem();
            },
            (err) => {
                console.log('Order record creation failed: ', err);
            });

    };

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const item = this.props.navigation.getParam('item');
        this.state.productItem = item;
        return (

            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',
                paddingTop: 20,
                paddingBottom: 50
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
                {/*<Button*/}
                {/*    title="Buy"*/}
                {/*    onPress={this.buy}>*/}
                {/*</Button>*/}
                <View style={styles.edges}>
                    <TouchableHighlight
                        onPress={ this.buy}
                        style={styles.button}
                        underlayColor='#5398DC'>
                        <Text style={styles.buttonText}>Buy</Text>
                    </TouchableHighlight>
                </View>
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
