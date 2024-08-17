import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";

// Config Imports
import font from "../../config/font";
import color from "../../config/color";
import MainView from "../../components/MainView";

const TermsOfService = () => {
	return (
		<MainView>
			<ScrollView style={styles.container}>
				<Text style={styles.headerText}>Terms of Service</Text>
				<Text style={styles.lastUpdated}>Last Updated: 16 August 2024</Text>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>1. Acceptance of Terms</Text>
					<Text style={styles.paragraph}>
						By downloading, accessing, or using the GreenWorld mobile
						application ("App") and its services ("Services"), you agree to be
						bound by these Terms of Service ("Terms") and our Privacy Policy. If
						you do not agree with these Terms, you should not use the App.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>2. Eligibility</Text>
					<Text style={styles.paragraph}>
						You must be at least 13 years old to use the App. If you are under
						18, you may only use the App under the supervision of a parent or
						legal guardian who agrees to be bound by these Terms.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>3. Account Registration</Text>
					<Text style={styles.paragraph}>
						To use certain features of the App, you may be required to create an
						account. You agree to provide accurate, complete, and current
						information during registration and to keep your account information
						updated. You are responsible for maintaining the confidentiality of
						your login credentials and are fully responsible for all activities
						that occur under your account.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>4. Use of the Service</Text>
					<Text style={styles.paragraph}>
						You agree to use the App and Services in compliance with all
						applicable laws and regulations. You may not:
						{"\n"}- Use the App for any unlawful or fraudulent purposes.
						{"\n"}- Attempt to gain unauthorized access to the App or any
						related systems or networks.
						{"\n"}- Interfere with or disrupt the operation of the App.
						{"\n"}- Upload or distribute any viruses, malware, or other harmful
						code.
						{"\n"}- Impersonate any person or entity, or misrepresent your
						affiliation with a person or entity.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>5. User Content</Text>
					<Text style={styles.paragraph}>
						You may be able to upload, post, or share content through the App
						("User Content"). By submitting User Content, you grant GreenWorld a
						non-exclusive, royalty-free, worldwide, transferable, and
						sublicensable license to use, reproduce, distribute, and display
						your User Content in connection with the Services. You represent
						that you own or have the necessary rights to share the User Content.
						{"\n\n"}GreenWorld is not responsible for User Content, and we
						reserve the right to remove any User Content that violates these
						Terms or is deemed inappropriate.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>6. Privacy</Text>
					<Text style={styles.paragraph}>
						Your privacy is important to us. Please review our Privacy Policy,
						which explains how we collect, use, and protect your personal
						information.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>
						7. Modifications to the Service
					</Text>
					<Text style={styles.paragraph}>
						We reserve the right to modify, suspend, or discontinue any part of
						the App or Services at any time, with or without notice. We will not
						be liable to you or any third party for any modification,
						suspension, or discontinuation of the App or Services.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>8. Termination</Text>
					<Text style={styles.paragraph}>
						We may terminate or suspend your account and access to the App at
						any time, without notice or liability, for any reason, including if
						you violate these Terms. Upon termination, your right to use the App
						will immediately cease.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>9. Disclaimer of Warranties</Text>
					<Text style={styles.paragraph}>
						The App and Services are provided "as is" and "as available" without
						any warranties of any kind, whether express or implied. We do not
						guarantee that the App will be error-free or uninterrupted, or that
						any defects will be corrected. Your use of the App is at your sole
						risk.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>10. Limitation of Liability</Text>
					<Text style={styles.paragraph}>
						To the maximum extent permitted by law, GreenWorld shall not be
						liable for any indirect, incidental, special, consequential, or
						punitive damages, or any loss of profits or revenues, whether
						incurred directly or indirectly, arising from your use of the App or
						Services.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>11. Governing Law</Text>
					<Text style={styles.paragraph}>
						These Terms shall be governed by and construed in accordance with
						the laws of New Zealand, without regard to its conflict of law
						principles.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>12. Changes to the Terms</Text>
					<Text style={styles.paragraph}>
						We may update these Terms from time to time. If we make significant
						changes, we will notify you by updating the date at the top of this
						page. Your continued use of the App after the changes take effect
						means you accept the revised Terms.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionHeader}>13. Contact Us</Text>
					<Text style={styles.paragraph}>
						If you have any questions or concerns about these Terms, contact us
						at enquiries@greenworld.com.
					</Text>
				</View>
			</ScrollView>
		</MainView>
	);
};

export default TermsOfService;

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
