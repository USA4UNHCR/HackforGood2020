import * as React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { getLanguage } from '../localization/selectors';
import { updateLanguage } from '../localization/actions';
import { SupportedLanguage, Localizer } from '../localization/Localizer';
import { StringId } from '../localization/stringIds';
import mockdata from './mock';
import { OrgTableScreen } from './OrgTableScreen';

const styles = StyleSheet.create({
    language: {
        flexDirection: "row",
        alignItems: "center"
    },
    text: {
        marginRight: 8
    },
    headerText: {
        fontSize: 24,
        marginBottom: 10
    },
    gridContainer: {
        paddingVertical: 20,
        alignItems: "center"
    },
    cellText: {
        textAlign:'center',
        color:'#fff',
        fontSize:24
    },
    separator: {
        height: 15,
        width: 5
    }
});

const backgroundColors = [
    "#54bd20", "#ff7400", "#00f", "#f0f"
];

const CELL_WIDTH = 300;
const CELL_HEIGHT = 40;

export const HomeScreen = React.memo(( { navigation }) => {
    const language = useSelector(getLanguage);
    const dispatch = useDispatch();
    
    const onChange = React.useCallback((language: SupportedLanguage) => {
        dispatch(updateLanguage(language))
    },[]);

    const changeLanguage: string = Localizer.getString(language, StringId.Change_Language);

    const categories: string[] = mockdata.categories.map(category => category.value);

    const dataSource = categories.map((category, index): Cell => {
        return {
            category,
            backgroundColor: backgroundColors[index % backgroundColors.length],
            key: index
        } 
    });

    return (
        <View style={{ flex: 1, paddingTop: 30, paddingHorizontal: 15 }}>
            <View style={styles.language}>
                <Text style={styles.text}>{Localizer.getString(language, StringId.Change_Language)}</Text>
                <DropDownPicker
                    items={[
                        {label: SupportedLanguage.English.toString(), value: SupportedLanguage.English},
                        {label: SupportedLanguage.Espanol.toString(), value: SupportedLanguage.Espanol}
                    ]}
                    defaultValue={language}
                    placeholder={changeLanguage}
                    containerStyle={{height: 40, flexGrow: 1}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => onChange(item.value)}
                />
            </View>
            <View style={styles.gridContainer}>
                <Text style={styles.headerText}>{Localizer.getString(language, StringId.Choose_Assistance_Category)}</Text>
                <FlatList
                    data={dataSource}
                    numColumns={1}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate(Localizer.getString(language, StringId.Service_Tab), { selectedCategory: item.category })} 
                        >
                        <View style={{width:CELL_WIDTH, height:CELL_HEIGHT,justifyContent:'center',backgroundColor:item.backgroundColor}} >
                            <Text style={styles.cellText} >
                                {item.category}
                            </Text>
                        </View>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={styles.separator} />
                    )}
                />
            </View>
        </View>
    )
});

type Cell = {
    category: string;
    backgroundColor: string;
    key: number
}
