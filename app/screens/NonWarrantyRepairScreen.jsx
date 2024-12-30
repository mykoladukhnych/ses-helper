import React, { useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

const NonWarrantyRepairScreen = () => {
	const [isLoading, setIsLoading] = useState(true);
	const handleShouldStartLoad = (event) => {
		if (!event.url.includes('https://www.samsung.com/ua/support/out-of-warranty/')) {
			return false;
		}
		return true;
	};

  	return (
		<View style={styles.container}>
			{isLoading && (
				<ActivityIndicator
					style={styles.spinner}
					size="large"
					color="#0000ff"
					animating={isLoading}
				/>
			)}

			<WebView
				style={styles.webView}
				source={{ uri: 'https://www.samsung.com/ua/support/out-of-warranty/' }}
				onLoadStart={() => setIsLoading(true)}
				onLoad={() => setIsLoading(false)}
				onShouldStartLoadWithRequest={handleShouldStartLoad}
				injectedJavaScript={`
					document.querySelector("#component-id").style.display = "none";
					document.querySelectorAll(".static-content").forEach((item, i) => {
						if (i === 0) return;
						item.style.display = "none";
					})
					document.querySelector(".iparsys").style.display = "none";
					document.querySelector(".fn-g-service-location-map").style.display = "none";
					document.querySelector("footer").style.display = "none";
				`}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinner: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webView: {
    flex: 1,
  },
});

export default NonWarrantyRepairScreen;