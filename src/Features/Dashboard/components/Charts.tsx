import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import { ICoin } from '../../../types/CoinType'
import { theme } from '../../../utils/theme';
import { currencyFormatterD } from '../../../utils/currencyConverter';
import { Feather, FontAwesome5 } from '@expo/vector-icons'
import {LineChart} from 'react-native-svg-charts'
// import {
//     LineChart,
//     BarChart,
//     PieChart,
//     ProgressChart,
//     ContributionGraph,
//     StackedBarChart
//   } from "react-native-chart-kit";

interface IProps {
    coin: ICoin;
}


export default function Charts({ coin }: IProps) {
    const [labels, setLabels] = React.useState([] as Array<any>);
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

    React.useEffect(() => {
        coin.sparkline_in_7d.price.map((item, index) => {
            const label = index * 3600;
            setLabels((prev) => [...prev, label])
        })
    }, [coin])

    const chevron = (value: number) => {
        if (value < 0) {
            return <FontAwesome5 name="caret-down" color="red" size={18} style={{ marginRight: 5, }} />
        } else {
            return <FontAwesome5 name="caret-up" color="green" size={18} style={{ marginRight: 5, }} />
        }
    }

    const percentageColor = (p: number) => {
        if (p > 0) {
            return 'green';
        } else {
            return 'red';
        }
    }

    return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '30%', paddingHorizontal: 20 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: coin.image }} resizeMode="contain" style={{ width: 40, height: 40 }} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontSize: 16, color: theme.textColor, fontWeight: '700' }}>{coin.name}</Text>
                            <Text style={{ fontSize: 14, color: theme.darkText, fontWeight: '300', textTransform: 'uppercase', marginTop: 5 }}>{coin.symbol}</Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, color: theme.textColor, fontWeight: '700' }}>${currencyFormatterD(coin.current_price)}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                            {chevron(coin.price_change_percentage_24h)}
                            <Text style={{ fontSize: 14, color: percentageColor(coin.price_change_percentage_24h), fontWeight: '600', textTransform: 'uppercase' }}>{coin.price_change_percentage_24h.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ width: '100%', height: 120}}>
                <LineChart
                    style={{ height: 200 }}
                    data={coin.sparkline_in_7d.price}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={{ top: 20, bottom: 20 }}
                    >
                    {/* <Grid /> */}
                </LineChart>
                <Text style={{ textAlign: 'center', fontFamily: theme.fontFamily['Inter-SemiBold'], fontSize: 18}}>7Days Price Change</Text>
                </View>

        
            </View>
    )
}