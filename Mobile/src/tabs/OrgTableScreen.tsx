import * as React from 'react';
import { Text, View, Item, FlatList, TouchableOpacity, Linking } from 'react-native';
import mockdata from './mock';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const OrgTableScreen = React.memo(( { route }) => {
    
    let defaultCategory = "Healthcare";
    const [category, setCategory] = useState(defaultCategory);

    React.useEffect(() => {
        if (route && route.params) {
            const { selectedCategory } = route.params;
            setCategory(selectedCategory);
        }
    })
    
    const orgList = () => {
        const list = mockdata.data.filter(org => {
            // console.log('org category' + org.category.toLowerCase())
            // console.log(' category' + category.toLowerCase())
            return org.category == null ? false : org.category.toLowerCase() === category.toLowerCase()
        });

        return list;
    };

    const renderItem = ({ item }) => (
        <View style={{ flex: 1, height: 70, margin: 20, marginBottom: 0, flexDirection: 'row', alignItems: 'center', }}>
            <View style={{ flex: 8, }}>
                <View>
                    <Text numberOfLines={1} style={{ fontSize: 16 }}>
                        {item.org_name}
                    </Text>
                </View>

                <View style={{ marginTop: 5, marginLeft: 20, marginRight: 20, flexDirection: 'row' }}>
                    <Text numberOfLines={1} style={{ marginRight: 20 }}>
                        {item.website ? item.website : 'No Data'}
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1, width: 30, flexDirection: 'row', justifyContent: 'flex-end' }}>
                {
                    item.website &&
                    <TouchableOpacity style={{}}
                        onPress={() => Linking.openURL(item.website)}
                    >
                        <Ionicons name={'open-outline'} size={16} color='black' />
                    </TouchableOpacity>
                }
            </View>
        </View >
    );


    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', paddingTop: 80 }}>
            <DropDownPicker
                items={mockdata.categories}
                defaultValue={category}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: '#fafafa', width: '100%' }}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={item => setCategory(item.value)}
            />

            <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
                <FlatList
                    style={{ width: '100%' }}
                    data={orgList()}
                    renderItem={renderItem}
                    keyExtractor={item => item.org_name + item.city}
                />
            </View>
        </View>
    )
});