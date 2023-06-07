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
import { NewsTags } from "../../components/NewsTags";
import { getNewsFeed } from "../../src/redux/actions";
import styles from "./styles";
import uuid from "react-native-uuid";
import { NewsCategory } from "../../src/constants";

export const Feed: React.FC = () => {
  const { newsFeed } = useSelector((state: any) => state.feedReducer);
  const dispatch: Function = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    NewsCategory.business
  );

  useEffect(() => {
    dispatch(getNewsFeed(setIsLoading, selectedCategory));
  }, [dispatch, selectedCategory]);

  const handleRefresh = useCallback(() => {
    dispatch(getNewsFeed(setIsLoading, selectedCategory));
  }, [dispatch, selectedCategory]);
  const backgroundColor = useColorScheme() === "dark" ? "#000" : "#fff";
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <NewsTags
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
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
