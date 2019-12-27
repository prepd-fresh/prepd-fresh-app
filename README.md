# prepdfresh-react-app

Mobile app for Prep'd Fresh, made with `react-native` and `redux`. Most of the app lives here, minus the Stripe / WooCommerce connections and order validation (the Heroku app acts as a proxy to these services), and the Stripe credit card field (served through a Stripe iFrame in a WebView to remain PCI compliant).

The app is configured to use a remote server, so you can now preview it by downloading the Expo client app, and adding the app URL `https://exp.host/@dustin.gaudet/prepdfresh-react-app`. This is convenient for sharing in-progress app updates with key stakeholders. Keep in mind that the final app will run quicker, as this preview version has to run through the Expo client.

## Available Scripts

In the project directory, you can run:

### `expo start`

Starts the Expo server locally. If you open a device via Android Studio, you can then run an emulated version of the app by pressing `a` in the terminal. You can also run a simulated iOS version on OS X by pressing `i` in the terminal.

### `expo android`

Starts the Expo server locally. If you have an Android device open, it will emulate the app on your emulated device automatically.

### `expo ios`

Starts the Expo server locally. If you are on OS X, it will simulate the app on iOS automatically.

### Publishing for the App Store / Google Play

1. Install Expo CLI<br>
   `npm install -g expo-cli`<br>
   (If you haven't created an Expo account before, you'll be asked to create one when running the build command.)

2. Configure `app.json` basics as specified [here](https://docs.expo.io/versions/v36.0.0/distribution/building-standalone-apps/#2-configure-appjson) (this should be done already).

3. Review [Configuration with app.json](https://docs.expo.io/versions/v36.0.0/workflow/configuration/) to learn about more configuration options.

4. Review [recommendations for App Store metadata](https://docs.expo.io/versions/v36.0.0/distribution/app-stores/).

5. Follow the instructions for [starting the build](https://docs.expo.io/versions/v36.0.0/distribution/building-standalone-apps/#3-start-the-build).

6. Once you have the binaries downloaded, you can publish new updates to the app through the `expo publish` command.

7. If you would like to continue development on the app, you can use release channels to publish to a staging channel instead of the live app's channel.

## Learn More

- You can learn more about Expo in the [Expo documentation](https://docs.expo.io/versions/latest/).

- To learn React, check out the [React documentation](https://reactjs.org/).

- To learn React Native, check out the [React Native documentation](https://facebook.github.io/react-native/).
