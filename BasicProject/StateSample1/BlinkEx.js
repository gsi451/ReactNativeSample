
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const BlinkEx = (props) => {
    const [isShowingText, setIsShowingText] = useState(true);

    useEffect(() => {
        const toggle = setInterval(() => {
            setIsShowingText(!isShowingText);
        }, 1000);

        return () => clearInterval(toggle);
    });

    if (!isShowingText) {
        return null;
    }

    return (
        <Text style={[props.style, {color: props.color}]}>{props.text}</Text>
    );
};

export default BlinkEx;