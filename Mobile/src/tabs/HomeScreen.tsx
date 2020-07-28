import * as React from 'react';
import { Text, View } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { getLanguage } from '../localization/selectors';
import { updateLanguage } from '../localization/actions';
import { SupportedLanguage, Localizer } from '../localization/Localizer';
import { StringId } from '../localization/stringIds';

export const HomeScreen = React.memo(() => {
    const language = useSelector(getLanguage);
    const dispatch = useDispatch();
    
    const onChange = React.useCallback((language: SupportedLanguage) => {
        dispatch(updateLanguage(language))
    },[]);

    const changeLanguage: string = Localizer.getString(language, StringId.Change_Language);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <DropDownPicker
                items={[
                    {label: SupportedLanguage.English.toString(), value: SupportedLanguage.English},
                    {label: SupportedLanguage.Espanol.toString(), value: SupportedLanguage.Espanol}
                ]}
                defaultValue={language}
                placeholder={changeLanguage}
                containerStyle={{height: 40, width: 200}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => onChange(item.value)}
            />
            <Text>{language}</Text>
        </View>
    )
});