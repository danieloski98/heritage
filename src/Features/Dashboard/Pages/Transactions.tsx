import React, { useCallback } from "react";
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
import { MotiView, AnimatePresence } from 'moti'
import * as Permissions from 'expo-permissions'
import * as Haptics from 'expo-haptics';

// redux
import { RootState } from "../../../store/index";
import { useSelector } from "react-redux";
import { IReturnType } from "../../../Types/ReturnType";
import { ITransaction } from "../../../Types/Transaction";
import TransactionModal from "../components/TransactionModal";

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
  const [tab, setTab] = React.useState(1);
  const [date, setDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [crypto, setCrypto] = React.useState([] as Array<ITransaction>);
  const [fiat, setFiat] = React.useState([] as Array<ITransaction>);
  const [transaction, setTransaction] = React.useState({} as ITransaction);
  const [showModal, setShowModal] = React.useState(false);


  const userDetails = useSelector((state: RootState) => state.userdetail.user);
  const { refetch } = useQuery(
    ["getTransactions", userDetails._id],
    () => getTransactions(userDetails._id),
    {
      onSuccess: (data) => {
        setLoading(false);
        if (data.data.length < 1) {
          return;
        } else {
          const cry = data.data.filter(
            (item: ITransaction, inx: number) => item.type === 1
          );
          const ngn = data.data.filter(
            (item: ITransaction, inx: number) => item.type === 2
          );
          setCrypto(cry);
          setFiat(ngn);
        }
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

  const setTrans = (trans: ITransaction) => {
    setTransaction(trans);
    setShowModal(true);
  }

  const changeTab = useCallback((tab: number) => {
    Haptics.selectionAsync();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTab(tab);
  }, []);

  const closeModal = () => {
    // setTransaction({} as ITransaction);
    setShowModal(false);
  }

  const os = Platform.OS;
  return (
    <View style={{ flex: 1, backgroundColor: 'whitesmoke' }}>

      {/* Modal */}
      <TransactionModal transaction={transaction} open={showModal} close={closeModal} />

      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <View
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
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
                onPress={() => changeTab(1)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontFamily: 'Inter-SemiBold', color: tab === 1 ? 'black': 'lightgrey', fontSize: 16 }}
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
               onPress={() => changeTab(2)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontFamily: 'Inter-SemiBold', color: tab === 2 ? 'black': 'lightgrey', fontSize: 16 }}>
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
              <Text style={{ color: "black", fontSize: 18, fontFamily: 'Inter-Regular' }}>
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
                      <Text style={{ color: "black", fontSize: 18, fontFamily: 'Inter-Regular' }}>
                        You have no Crypto Transactions
                      </Text>
                    </View>
                  ) : (
                    <AnimatePresence>
                      {/* <Datepicker
                        date={date}
                        onSelect={(nextDate) => setDate(nextDate)}
                        size="large"
                        max={new Date()}
                      /> */}
                      {crypto.map((item, index) => (
                        <MotiView 
                        from={{ opacity: 0, top: 300 }}
                        animate={{ opacity: 1, top: 0 }}
                        exit={{ opacity: 0, top: 200 }}
                        transition={{
                          delay: parseInt(`${index}00`),
                          type: 'spring',
                          // repeat: 4,
                          // repeatReverse: false,
                        }}
                        key={index.toString()} 
                        style={{ paddingTop: 10 }}>
                          <TransactionCard
                            transaction={item}
                            setActive={setTrans}
                          />
                        </MotiView>
                      ))}
                    </AnimatePresence>
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
                    <AnimatePresence>
                      {/* <Datepicker
                        date={date}
                        onSelect={(nextDate) => setDate(nextDate)}
                        size="large"
                        max={new Date()}
                      /> */}
                      {fiat.map((item, index) => (
                        <MotiView 
                        from={{ opacity: 0, top: 300 }}
                        animate={{ opacity: 1, top: 0 }}
                        exit={{ opacity: 0, top: 200 }}
                        transition={{
                          delay: parseInt(`${index}00`),
                          type: 'spring',
                          // repeat: 4,
                          // repeatReverse: false,
                        }}
                        key={index.toString()} 
                        style={{ paddingTop: 10 }}>
                          <TransactionCard
                            transaction={item}
                            setActive={setTrans}
                          />
                        </MotiView>
                      ))}
                    </AnimatePresence>
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
