import { View, Text } from 'react-native';
import React, { useState } from 'react';

import Accordion from '../components/Accordion';
import Input from '../components/Input';

const WarrantyScreen = ({ route }) => {
    const { data } = route.params;
    const [devicePrice, setDevicePrice] = useState(0);

    return (
    <View>
        <Input placeholder={'Введіть вартість пристрою...'} keyboardType='numeric' setOutsideState={setDevicePrice}/>
        {
            data.list.map((item, i) => <Accordion data={item} value={devicePrice} key={i} />)
        }
    </View>
    )
}

export default WarrantyScreen