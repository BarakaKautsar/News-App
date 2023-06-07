import React, { useCallback, useEffect, useState } from "react";
import {
  RefreshControl,
  Text,
  useColorScheme,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NewsArticle } from "../../components/NewsArticle";
import { getNewsFeed } from "../../src/redux/actions";
import styles from "./styles";
import uuid from "react-native-uuid";

export const Feed: React.FC = () => {
  const { newsFeed } = useSelector((state: any) => state.feedReducer);
  const dispatch: Function = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getNewsFeed(setIsLoading));
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    dispatch(getNewsFeed(setIsLoading));
  }, [dispatch]);
  const backgroundColor = useColorScheme() === "dark" ? "#000" : "#fff";
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <FlatList
        keyExtractor={() => uuid.v4()?.toString()}
        showsVerticalScrollIndicator={false}
        data={newsFeed}
        renderItem={({ item }: any) => <NewsArticle post={item} />}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        style={styles.list}
      />
    </SafeAreaView>
  );
};
