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

install:
	npm install

clean:
	rm -rf node_modules
	rm -rf .expo
	rm -rf .expo-shared
	rm -rf dist
	rm -rf build

update:
	npx expo upgrade

build:
	npx expo export

publish:
	npx expo publish

login:
	npx expo login

logout:
	npx expo logout

doctor:
	npx expo doctor

makenew:
	npx create-expo-app@latest