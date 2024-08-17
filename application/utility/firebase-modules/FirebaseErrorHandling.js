const FirebaseErrorHandling = (error) => {
	const errorCode = error.code;

	switch (errorCode) {
		case "auth/invalid-email":
			return "The email provided is invalid.";
		case "auth/email-already-in-use":
			return "An account is already registered with this email.";
		case "auth/weak-password":
			return "Your password is too weak.";
		case "auth/invalid-credential":
			return "You have entered the incorrect credentials.";
		default:
			return "An unexpected error occurred.";
	}
};

export default FirebaseErrorHandling;
