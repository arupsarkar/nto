import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import {
    KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view'


export default class AddReview extends Component{
    state = {
        name: '',
        rating: 0,
        comment: '',
        submitting: false
    };
    close = () => {
        this.props.navigation.goBack(null)
    };

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const item = this.props.navigation.getParam('item');
        console.log(item);
        const {
            productItem
        } = this.props;
        return (
            <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
                <View style={styles.root}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.close}>
                        {/*<Icon name="close" size={30} color="#0d39ff"/>*/}

                        <TextInput
                            style={[styles.input, { height: 100 }]}
                            placeholder="Review"
                            value={this.state.comment}
                            onChangeText={comment => this.setState({ comment })}
                            multiline={true}
                            numberOfLines={5}
                        />

                    </TouchableOpacity>
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
    button: {
        paddingHorizontal: 10
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
    }
});
