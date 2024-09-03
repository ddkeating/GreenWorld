import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import MainView from "../../components/MainView";
import NavigationBackBtn from "../../components/NavigationBackBtn";

const ArticleViewScreen = ({ route, navigation }) => {
  const { articleData } = route.params;

  console.log("Article Data:", articleData); // Debugging line

  if (!articleData) {
    return <Text>Loading...</Text>;
  }

  return (
    <MainView>
      <View style={styles.container}>
        <View style={styles.header}>
          <NavigationBackBtn navigation={navigation} />
        </View>
        <Image source={{ uri: articleData.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{articleData.title}</Text>
        <Text style={styles.content}>{articleData.content}</Text>
      </View>
    </MainView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    marginBottom: 20, // Adjust as needed to ensure space for the back button
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    color: "#333",
  },
});

export default ArticleViewScreen;
