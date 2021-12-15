import React from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Platform,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { theme } from "../../../utils/theme";
import { Ionicons } from "@expo/vector-icons";
import TransactionCard from "../components/TransactionCard";
import { Datepicker } from "@ui-kitten/components";
import url from "../../../utils/url";
import { useQuery } from "react-query";

// redux
import { RootState } from "../../../store/index";
import { useSelector } from "react-redux";
import { IReturnType } from "../../../Types/ReturnType";
import { ITransaction } from "../../../Types/Transaction";

// get transactions
const getTransactions = async (id: string) => {
  const request = await fetch(`${url}transaction/all/${id}`);
  const json = (await request.json()) as IReturnType;

  if (!request.ok) {
    throw new Error("An error occured");
  }

  return json;
};

export default function Transactions() {
  const [tab, setTab] = React.useState(2);
  const [date, setDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [crypto, setCrypto] = React.useState([] as Array<ITransaction>);
  const [fiat, setFiat] = React.useState([] as Array<ITransaction>);

  const userDetails = useSelector((state: RootState) => state.userdetail.user);
  const { refetch } = useQuery(
    ["getTransactions", userDetails._id],
    () => getTransactions(userDetails._id),
    {
      onSuccess: (data) => {
        setLoading(false);
        const cry = data.data.filter(
          (item: ITransaction, inx: number) => item.type === 1
        );
        const ngn = data.data.filter(
          (item: ITransaction, inx: number) => item.type === 2
        );
        console.log(ngn);
        setCrypto(cry);
        setFiat(ngn);
        // console.log(data.data);
      },
      onError: () => {
        setLoading(false);
        setError(true);
      },
    }
  );

  const retry = async () => {
    setError(false);
    setLoading(true);
    await refetch();
  };

  const os = Platform.OS;
  return (
    <View style={{ flex: 1, backgroundColor: theme.light }}>
      <View style={{ padding: 0 }}>
        <View
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
            backgroundColor: "white",
          }}
        >
          {/* tabbar */}

          <View
            style={{
              width: "100%",
              height: 60,
              flexDirection: "row",
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                borderBottomColor:
                  tab == 1 ? theme.primaryBackgroundColor : "transparent",
                borderBottomWidth: 4,
                marginHorizontal: 0,
              }}
            >
              <Pressable
                onPress={() => setTab(1)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontWeight: os === "ios" ? "600" : "bold" }}
                  onPress={() => setTab(1)}
                >
                  Cryptocurrency
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                flex: 1,
                borderBottomColor:
                  tab == 2 ? theme.primaryBackgroundColor : "transparent",
                borderBottomWidth: 4,
                marginHorizontal: 0,
              }}
            >
              <Pressable
                onPress={() => setTab(2)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontWeight: os === "ios" ? "600" : "bold" }}>
                  FIAT
                </Text>
              </Pressable>
            </View>
          </View>

          {/* date picker */}
          {/* {!loading && !error && (
                        <Datepicker 
                        date={date}
                        onSelect={nextDate => setDate(nextDate)}
                        size="large"
                        max={new Date()}
                        />
                    )} */}

          {loading && (
            <View
              style={{
                width: "100%",
                height: 150,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator
                color={theme.primaryBackgroundColor}
                size="large"
              />
            </View>
          )}

          {!loading && error && (
            <View
              style={{
                width: "100%",
                height: 150,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ color: "black", fontSize: 18 }}>
                An Error Occured
              </Text>
              <TouchableOpacity
                onPress={retry}
                style={{
                  backgroundColor: theme.primaryBackgroundColor,
                  width: "100%",
                  height: 55,
                  borderRadius: 10,
                  marginTop: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 18 }}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}

          {!loading && !error && (
            <ScrollView style={{ marginVertical: 0 }} refreshControl={<RefreshControl refreshing={loading} colors={[theme.primaryBackgroundColor]} tintColor={theme.primaryBackgroundColor} onRefresh={retry} />}>
              {tab === 1 && (
                <View>
                  {crypto.length < 1 ? (
                    <View
                      style={{
                        width: "100%",
                        height: 150,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: 20,
                      }}
                    >
                      <Text style={{ color: "black", fontSize: 18 }}>
                        You have no Crypto Transactions
                      </Text>
                    </View>
                  ) : (
                    <>
                      <Datepicker
                        date={date}
                        onSelect={(nextDate) => setDate(nextDate)}
                        size="large"
                        max={new Date()}
                      />
                      {crypto.map((item, index) => (
                        <View style={{ paddingTop: 10 }}>
                          <TransactionCard
                            key={index.toString()}
                            transaction={item}
                          />
                        </View>
                      ))}
                    </>
                  )}
                </View>
              )}

              {tab === 2 && (
                <View>
                  {fiat.length < 1 ? (
                    <View
                      style={{
                        width: "100%",
                        height: 150,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: 20,
                      }}
                    >
                      <Text style={{ color: "black", fontSize: 18 }}>
                        You have no Fiat Transactions
                      </Text>
                    </View>
                  ) : (
                    <>
                      <Datepicker
                        date={date}
                        onSelect={(nextDate) => setDate(nextDate)}
                        size="large"
                        max={new Date()}
                      />
                      {fiat.map((item, index) => (
                        <View style={{ paddingTop: 10 }}>
                          <TransactionCard
                            key={index.toString()}
                            transaction={item}
                          />
                        </View>
                      ))}
                    </>
                  )}
                </View>
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
}
