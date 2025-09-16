# Makefile for Expo React Native Project

.PHONY: start android ios web install clean update build publish login logout

start:
	npx expo start

android:
	npx expo run:android

ios:
	npx expo run:ios

web:
	npx expo start --web

pre:
	npx expo prebuild

makenew:
	npx create-expo-app@latest

build-android:
	eas build --platform android --profile preview

after-update-expo-version:
	npx expo install --fix

expo-update-preview:
	eas update --platform android --message "test" --channel preview

expo-update-bmt:
	eas update --platform ${PLAT} --message "${MSG}" --channel build-and-maestro-test

bundle-release:
	cd android && ./gradlew clean && ./gradlew bundleRelease