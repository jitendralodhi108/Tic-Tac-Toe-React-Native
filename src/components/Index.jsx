import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import UserAvatar from 'react-native-user-avatar';
import Modal from "react-native-modal";



const Index = (props) => {
    // const [player1, setplayer1] = useState('')
    const [playerOneImage, setPlayerOneImage] = useState('');
    const [playerTwoImage, setPlayerTwoImage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isPlayerTwoImage, setIsPlayerTwoImage] = useState(false);


    const openModalForPlayer1 = () => {
        setIsModalVisible(true);
        setIsPlayerTwoImage(false);
    };
    const openModalForPlayer2 = () => {
        setIsModalVisible(true);
        setIsPlayerTwoImage(true);
    };


    const openGalleryHandler = () => {
        let options = {
            storageOption: {
                path: 'images',
                mediaType: 'photo',
            },
            includeBase64: true,
        };
        launchImageLibrary(options, response => {
            console.log(response, 'response');
            if (response.didCancel) {
                console.log('User cancelled image picker ');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom buttom', response.customButton);
            } else {
                const source = { uri: response.assets[0].uri };
                isPlayerTwoImage
                    ? setPlayerTwoImage(source)
                    : setPlayerOneImage(source);
            }
        });
        setIsModalVisible(false);
    };
    const openCameraHandler = () => {
        let options = {
            storageOption: {
                path: 'images',
                mediaType: 'photo',
            },
            includeBase64: true,
        };
        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker ');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom buttom', response.customButton);
            } else {
                const source = { uri: response.assets[0].uri };
                isPlayerTwoImage
                    ? setPlayerTwoImage(source)
                    : setPlayerOneImage(source);
            }
        });
        setIsModalVisible(false);
    };
    const startGame = () => {
        if (playerOneImage === '') {
            alert('Please select an image for player 1');
            return;
        } else if (playerTwoImage === '') {
            alert('Please select an image for player 2');
            return;
        }
        props.navigation.navigate('Game', {
            playerOneImage: playerOneImage.uri,
            playerTwoImage: playerTwoImage.uri,
        });
    };


    return (

        <View style={styles.mainView}>
            <View style={styles.imgbtn}>
                <View>
                    <UserAvatar style={styles.avatar} size={60} name="" bgColors={['#fff']} src={playerOneImage ? playerOneImage.uri : "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"} />
                </View>
                <Button
                    onPress={openModalForPlayer1}
                    title="Select image for Player 1"
                    accessibilityLabel="Select an image for player 1"
                    color={'#000'}
                />
            </View>
            <View style={styles.imgbtn}>
                <View>
                    <UserAvatar style={styles.avatar} size={60} name="" bgColors={['#fff']} src={playerTwoImage ? playerTwoImage.uri : "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"} />
                </View>
                <Button
                    onPress={openModalForPlayer2}
                    title="Select image for Player 2"
                    color={'blue'}
                    accessibilityLabel="Select an image for player 2"
                />
            </View>
            <TouchableOpacity onPress={startGame}>
                <Text style={styles.playBtn}>PLAY</Text>
            </TouchableOpacity>

            {isModalVisible && (
                <Modal
                    backdropOpacity={0.70}
                    style={styles.modal}
                    animationType="fade"
                    visible={isModalVisible}
                    onRequestClose={() => changeModalVisible(false)}>
                    <View style={styles.modalView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                onPress={openCameraHandler}>
                                <Text style={styles.modalText}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={openGalleryHandler}>
                                <Text style={styles.modalText}>Gallery</Text>
                            </TouchableOpacity>
                        </View>
                        <Button title="Hide modal" onPress={() => setIsModalVisible(false)} />
                    </View>
                </Modal>
            )}
        </View>
    )
}
const styles = StyleSheet.create({

    mainView: {
        marginTop: 150,
    },
    modalText: {
        color: 'black',
        padding: 5,
        marginLeft: 85,
        fontSize: 20
    },
    modalView: {
        backgroundColor: '#ffff',
        padding: 20,
    },
    avatar: {
        width: '25%',
        margin: 'auto',
        marginLeft: 90
    },
    btn: {
        backgroundColor: 'blue',
        width: 60,
        paddingLeft: 5,
        color: 'white',
        fontSize: 20,
        marginLeft: 20,
        fontWeight: 'bold'
    },
    imgbtn: {
        width: '60%',
        marginTop: 35,
        marginLeft: 70,
    },

    img: {
        width: '110%',
        height: '99%',
    },
    heading: {
        color: 'blue',
        marginTop: 100,
        fontSize: 20,
        marginLeft: 130
    },
    text1: {
        margin: 15,
        marginTop: 15,
        marginLeft: 45,
        width: '75%',
        backgroundColor: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    text2: {
        margin: 12,
        marginTop: 20,
        marginLeft: 45,
        width: '75%',
        backgroundColor: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    playBtn: {
        fontStyle: 'italic',
        marginLeft: 150,
        fontSize: 30,
        color: 'green',
        justifyContent: "center",
        padding: 16,
    }
})
export default Index;
