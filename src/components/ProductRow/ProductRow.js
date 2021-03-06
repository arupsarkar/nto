import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
    Button,
    TouchableOpacity, ScrollView
} from 'react-native'
import { withNavigation } from 'react-navigation';
import renderIf from "../Utils/renderIf";

export default class ProductRow extends Component{


    constructor(){
        super();
        this.state ={
            status:false
        }
    }

    infoPressed = () => {
        console.log('Review button pressed.');
        // this.setState({ showInfo: !this.state.showInfo });
        this.props.navigation.navigate('ProductReview',{
            item: this.props.item
        });
    };

    orderPressed = () => {
        this.props.navigation.navigate('ShoppingCart', {
            item: this.props.item
        });

    };

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        const {
            item,
            index
        } = this.props;

        return(
            <View key={item.name} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#F3F3F7' }}>

                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    paddingTop: 20,
                    paddingBottom: 50,
                    paddingLeft: 10,
                    paddingRight: 10
                }}>


                <View style={styles.row}>
                    <View style={styles.nameAddress}>

                        {renderIf(this.state.status)(
                            <Text>{item.Pricebook2.Id}</Text>
                        )}

                        {renderIf(this.state.status)(
                            <Text>{item.Product2.Id}</Text>
                        )}

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
                    </View>


                    {/*<View style={styles.edges}>*/}
                    {/*    <Button*/}
                    {/*        title="Review"*/}
                    {/*        onPress={this.infoPressed}>*/}
                    {/*    </Button>*/}
                    {/*</View>*/}
                    <View style={styles.edges}>
                        <TouchableHighlight
                            onPress={ this.infoPressed}
                            style={styles.button}
                            underlayColor='#5398DC'>
                            <Text style={styles.buttonText}>Review</Text>
                        </TouchableHighlight>
                    </View>
                </View>

                {/*<View style={styles.edges}>*/}
                {/*    <Button*/}
                {/*        title="Add to Cart"*/}
                {/*        onPress={this.orderPressed}>*/}
                {/*    </Button>*/}
                {/*</View>*/}
                <View style={styles.edges}>
                    <TouchableHighlight
                        onPress={ this.orderPressed}
                        style={styles.button}
                        underlayColor='#5398DC'>
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableHighlight>
                </View>
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
