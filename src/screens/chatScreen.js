import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { CommonHeader } from '../commonComponents/components';
import { colors } from '../utils/colors';
import AppIcon from '../commonComponents/Icons/Icons';

const ChatScreen = () => {
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hello! How can I assist you?', sender: 'astrologer' },
        { id: '2', text: 'I want to know about my future.', sender: 'user' },
    ]);

    const [inputText, setInputText] = useState('');

    const sendMessage = () => {
        if (inputText.trim() !== '') {
            setMessages([...messages, { id: Date.now().toString(), text: inputText, sender: 'user' }]);
            setInputText('');
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <CommonHeader name="Chat" showBackButton={true} />

            {/* Messages List */}
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.astrologerMessage]}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                inverted
            />

            {/* Message Input Box */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Type a message..."
                        placeholderTextColor={colors.grey6}
                        value={inputText}
                        onChangeText={(text) => setInputText(text)}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <AppIcon name="send" size={20} color={colors.white} library="Feather" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightgrey,
    },
    messageContainer: {
        maxWidth: '75%',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: colors.red,
    },
    astrologerMessage: {
        alignSelf: 'flex-start',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.grey4,
    },
    messageText: {
        color: colors.black,
        fontSize: 14,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderColor: colors.grey4,
    },
    textInput: {
        flex: 1,
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 15,
        backgroundColor: colors.lightgrey,
        color: colors.black,
    },
    sendButton: {
        backgroundColor: colors.red,
        padding: 10,
        borderRadius: 20,
        marginLeft: 10,
    },
});
