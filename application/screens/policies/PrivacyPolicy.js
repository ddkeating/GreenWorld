import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";

// Config Imports
import font from "../../config/font";
import color from "../../config/color";
import MainView from "../../components/MainView";

const PrivacyPolicy = () => {
	return (
		<MainView>
			<ScrollView style={styles.container}>
				<Text style={styles.headerText}>Privacy Policy</Text>
				<Text style={styles.lastUpdated}>Last Updated: 16 August 2024</Text>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>1. Introduction</Text>
					<Text style={styles.paragraph}>
						At GreenWorld, we respect your privacy and are committed to
						protecting the personal information you share with us through the
						use of our mobile application ("App"). This Privacy Policy explains
						how we collect, use, and protect your information.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>2. Information We Collect</Text>
					<Text style={styles.paragraph}>
						We collect the following types of information when you use our App:
					</Text>
					<Text style={styles.paragraph}>
						- **Personal Information**: When you register for an account, we
						collect personal information such as your name, email address, and
						any other information you voluntarily provide.
						{"\n"}- **Usage Data**: We collect information about your
						interactions with the App, such as your IP address, device
						information, and usage patterns.
						{"\n"}- **Cookies and Similar Technologies**: We may use cookies and
						similar tracking technologies to track the activity on our App and
						hold certain information.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>
						3. How We Use Your Information
					</Text>
					<Text style={styles.paragraph}>
						We use the information we collect for various purposes, including:
					</Text>
					<Text style={styles.paragraph}>
						- To provide, maintain, and improve our App and Services.
						{"\n"}- To manage your account and provide customer support.
						{"\n"}- To communicate with you about updates, offers, and
						promotions.
						{"\n"}- To analyze usage patterns and improve the App's performance
						and user experience.
						{"\n"}- To detect, prevent, and address technical issues and
						security risks.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>4. Sharing of Information</Text>
					<Text style={styles.paragraph}>
						We do not share your personal information with third parties except
						in the following cases:
					</Text>
					<Text style={styles.paragraph}>
						- **With Your Consent**: We may share your information with third
						parties when you explicitly give us permission to do so.
						{"\n"}- **Service Providers**: We may share your information with
						third-party service providers who assist us in providing the App and
						Services. These providers are required to protect your information
						and only use it for the services they provide to us.
						{"\n"}- **Legal Requirements**: We may disclose your information if
						required by law, regulation, or legal process, or to protect the
						rights, property, or safety of GreenWorld, our users, or others.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>5. Data Security</Text>
					<Text style={styles.paragraph}>
						We take appropriate security measures to protect your information
						from unauthorized access, alteration, disclosure, or destruction.
						However, please note that no method of transmission over the
						internet or method of electronic storage is completely secure, and
						we cannot guarantee absolute security.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>6. Your Privacy Rights</Text>
					<Text style={styles.paragraph}>
						Depending on your location, you may have the following rights
						regarding your personal information:
					</Text>
					<Text style={styles.paragraph}>
						- **Access**: You can request access to the personal information we
						hold about you.
						{"\n"}- **Correction**: You can request that we correct or update
						inaccurate information.
						{"\n"}- **Deletion**: You can request that we delete your personal
						information, subject to certain exceptions.
						{"\n"}- **Opt-Out**: You can opt-out of receiving marketing
						communications from us.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>7. Third-Party Links</Text>
					<Text style={styles.paragraph}>
						Our App may contain links to third-party websites or services that
						are not operated by us. If you click on a third-party link, you will
						be directed to that third party's site. We have no control over and
						assume no responsibility for the content, privacy policies, or
						practices of any third-party sites or services.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>8. Children's Privacy</Text>
					<Text style={styles.paragraph}>
						Our App is not intended for children under the age of 13. We do not
						knowingly collect personal information from children under 13. If
						you are a parent or guardian and believe that your child has
						provided us with personal information, please contact us, and we
						will take steps to delete such information.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>
						9. Changes to This Privacy Policy
					</Text>
					<Text style={styles.paragraph}>
						We may update this Privacy Policy from time to time. We will notify
						you of any changes by posting the new Privacy Policy on this page
						and updating the "Last Updated" date. Your continued use of the App
						after any changes take effect will constitute your acceptance of the
						revised Privacy Policy.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>10. Contact Us</Text>
					<Text style={styles.paragraph}>
						If you have any questions or concerns about this Privacy Policy or
						our data practices, please contact us at enquiries@greenworld.com.
					</Text>
				</View>
			</ScrollView>
		</MainView>
	);
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerText: {
		fontSize: 32,
		fontWeight: "bold",
		color: color.primary,
		marginBottom: 20,
		textAlign: "center",
		fontFamily: font.fontFamily,
	},
	lastUpdated: {
		fontSize: 14,
		color: color.black,
		textAlign: "center",
		marginBottom: 20,
		fontFamily: font.fontFamily,
	},
	section: {
		marginBottom: 20,
	},
	sectionHeader: {
		fontSize: 20,
		fontWeight: "bold",
		color: color.primary,
		marginBottom: 10,
		fontFamily: font.fontFamily,
	},
	paragraph: {
		fontSize: 16,
		lineHeight: 24,
		color: color.black,
		fontFamily: font.fontFamily,
	},
});
