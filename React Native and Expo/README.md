# DAY 3 — React Native + Expo

This is where you start becoming dangerous. 😄
Learn the differences between:

	React
	React Native
	React Native Web
	Expo
	Expo Router

React Native uses components such as:

	<View>
	<Text>
	<Pressable>
	<ScrollView>
	<Image>
	<TextInput>

rather than normal DOM elements.

React Native Web allows many of those components to target the browser; Expo describes RN Web as wrapping React DOM primitives and enabling significant code reuse across platforms. [Expo documentation](https://docs.expo.dev/workflow/web/)

## Understand

                 Shared code
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
      iOS / Android          Web
          │                   │
    React Native        React Native Web

### Then learn:
- Platform
- .ios.tsx
- .android.tsx
- .web.tsx
- .native.tsx
- permissions
- native modules
- app lifecycle
- deep links
- environment configuration
- Expo Go vs development builds
- native builds