import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
	TextInput,
} from "react-native";
import MainView from "../../components/MainView"; // Ensure the path is correct
import { fetchProducts } from "../../services/fetchProducts"; // Update the path

const ProductScreen = () => {
	const [products, setProducts] = useState([]);
	const [query, setQuery] = useState(""); // Default search query

	useEffect(() => {
		const loadProducts = async () => {
			const result = await fetchProducts(query);
			setProducts(result);
		};

		loadProducts();
	}, [query]); // Reload products when the query changes

	return (
		<MainView>
			<Text style={styles.title}>Eco-Friendly Products</Text>

			{/* Search Bar */}
			<TextInput
				style={styles.searchBar}
				placeholder="Search for products..."
				value={query}
				onChangeText={(text) => setQuery(text)}
			/>

			{/* Product List */}

			<FlatList
				style={{ marginBottom: 20 }}
				data={products}
				keyExtractor={(item, index) => index.toString()} // Use index or a unique field
				renderItem={({ item }) => (
					<View style={styles.productItem}>
						{/* Product Image */}
						<Image
							source={{ uri: item.imageURL }}
							style={styles.productImage}
						/>
						<View style={styles.productDetails}>
							{/* Product Title */}
							<Text style={styles.productTitle}>{item.title}</Text>
							{/* Product Description */}
							<Text style={styles.productDescription}>{item.description}</Text>
							{/* Product Price */}
							<Text style={styles.productPrice}>${item.price}</Text>
						</View>
					</View>
				)}
			/>
		</MainView>
	);
};

export default ProductScreen;

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	searchBar: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 20,
	},
	productItem: {
		flexDirection: "row",
		marginBottom: 15,
		padding: 10,
		backgroundColor: "#f5f5f5",
		borderRadius: 5,
	},
	productImage: {
		width: 100,
		height: 100,
		borderRadius: 5,
		marginRight: 10,
	},
	productDetails: {
		flex: 1,
		justifyContent: "center",
	},
	productTitle: {
		fontSize: 18,
		fontWeight: "500",
		marginBottom: 5,
	},
	productDescription: {
		fontSize: 14,
		color: "#666",
		marginBottom: 5,
	},
	productPrice: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
	},
});
