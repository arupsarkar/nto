import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    AlertIOS, Image, ScrollView, Button, TouchableHighlight
} from 'react-native';
import {
    KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view'
import {oauth, net} from 'react-native-force';

export default class AddReview extends Component{


    state = {
        product: ''
    }

    state = {
        chatter: []
    }
    state = {
        body: '',
        parentid: '',
        title: '',
        submitting: false
    };


    componentDidMount(): void {
        var that = this;
        oauth.getAuthCredentials(
            (response) => {
                console.log('Add review : ', response.userId);
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


    close = () => {
        this.props.navigation.goBack(null)
    };

    post = () => {
        var that = this;
        console.log('Parent id: ', this.state.parentid);
        console.log('title: ', this.state.title);
        console.log('body: ', this.state.body);
        //create an order
        net.create('FeedItem',
            {
                "ParentId": this.state.parentid,
                "Body": this.state.body,
                "title": this.state.title
            },
            (response) => {
                console.log('post created: ', response);
                that.setState({chatter: response});
                console.log('post record : ', that.state.chatter.id);
                AlertIOS.alert(
                    'Confirmation !!!',
                    'Successfully created chatter post, Chatter Feed Id: ' + that.state.chatter.id,
                    [
                        {
                            text: 'Ok',
                            onPress: () => console.log('Ok Pressed'),
                            style: 'cancel',
                        }
                    ],
                );
            },
            (err) => {
                console.log('chatter post creation failed: ', err);
            });
    }

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const item = this.props.navigation.getParam('item');
        this.state.product = item;
        console.log('Review product:', this.state.product);
        this.state.parentid = this.state.product.Product2.Id;
        const {
            productItem
        } = this.props;
        return (
            <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
                <View style={styles.root}>
                    {/*<TouchableOpacity*/}
                    {/*    style={styles.button}*/}
                    {/*    onPress={this.close}>*/}
                        {/*<Icon name="close" size={30} color="#0d39ff"/>*/}

                        <View style={styles.infoHeader}>
                            <Image
                                source={{
                                    uri: this.state.product.Product2.Image_URL__c
                                }}
                                style={styles.image}
                                resizeMode="contain"
                            />
                            <Text style={styles.name}>{item.Product2.Name}</Text>
                        </View>

                        {/*<TextInput*/}
                        {/*    style={styles.input}*/}
                        {/*    placeholder="Title"*/}
                        {/*    value={this.state.title}*/}
                        {/*    onChangeText={title => this.setState({ title })}*/}
                        {/*/>*/}

                        <TextInput
                            style={[styles.input, { height: 100 }]}
                            placeholder="Review"
                            value={this.state.body}
                            onChangeText={body => this.setState({ body })}
                            multiline={true}
                            numberOfLines={5}
                        />
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'stretch',
                            paddingTop: 20
                        }}>
                            {/*<Button*/}
                            {/*    title="Post"*/}
                            {/*    onPress={this.post}>*/}
                            {/*</Button>*/}
                            <View style={styles.edges}>
                                <TouchableHighlight
                                    onPress={ this.post}
                                    style={styles.button}
                                    underlayColor='#5398DC'>
                                    <Text style={styles.buttonText}>Post to Chatter</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    {/*</TouchableOpacity>*/}
                </View>
            </KeyboardAwareScrollView>
        );
    }

}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20
    },
    addReview: {
        fontSize: 25,
        color: '#444',
        textAlign: 'center',
        margin: 20
    },
    input: {
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 3
    },
    rating: {
        fontSize: 20,
        color: 'grey',
        textAlign: 'center',
        marginVertical: 40
    },
    stars: {
        marginBottom: 80,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    starButton: {
        padding: 5
    },
    submitButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#578eff',
        borderRadius: 4,
        marginVertical: 10,
        marginHorizontal: 20
    },
    submitButtonText: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center'
    },
    image: {
        width: 100,
        height: 100,
        margin: 20
    },
    infoHeader: {
        flexDirection: 'row'
    },
    info: {
        flex: 1,
        flexWrap: 'wrap',
        marginTop: 20,
    },
    edges: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        minWidth: 60
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
