import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utility/firebase-modules/Firebase";
import MainView from "../../components/MainView"; // Adjust the path accordingly

const ArticlesScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const articlesCollection = collection(db, "ecoArticles");
      const articleSnapshot = await getDocs(articlesCollection);
      const articleList = articleSnapshot.docs.map((doc) => doc.data());
      setArticles(articleList);
    };

    fetchArticles();
  }, []);

  return (
    <MainView>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.articleItem}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.articleImage}
            />
            <Text style={styles.articleTitle}>{item.title}</Text>
            <Text style={styles.articleSummary}>{item.summary}</Text>
          </View>
        )}
      />
    </MainView>
  );
};

const styles = StyleSheet.create({
  articleItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff", // Ensures readability on the overlay
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  articleImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  articleSummary: {
    fontSize: 14,
    color: "#555",
  },
});

export default ArticlesScreen;
