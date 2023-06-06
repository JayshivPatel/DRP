import React, { SetStateAction, useState } from "react";
import { View, Text} from "react-native";
import { Searchbar } from "react-native-paper";

export default function SearchBarList() {
    const [searchQueries, setSearchQueries] = useState(['', '', '']);
    const fields = ['First Name', 'Surname', 'Region']

    const onChangeSearch = (query: string, index: number) => {
        const updatedQueries = [...searchQueries];
        updatedQueries[index] = query;
        setSearchQueries(updatedQueries);
    };

    return (
        <View style={{flexDirection: "column", justifyContent:"center", alignItems: "center"}}>
            <Text style={{fontWeight: "bold", fontSize: 20}}>Patient Search</Text>

            <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                {searchQueries.map((query, index) => {
                    return (
                        <View style={{flexDirection: "row", margin: 20}}>
                            <Text style={{marginHorizontal: 10}}> {fields[index]}</Text>
                            <Searchbar
                                key={index}
                                placeholder="Search"
                                value={query}
                                onChangeText={(text) => onChangeSearch(text, index)}
                            />
                        </View>
                    );
                })}
            </View>
        </View>
    )
}