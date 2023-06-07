# Weather App

노마드코더의 **왕초보를 위한 React Native101**을 보고 만들었습니다.

[왕초보를 위한 React Native101 링크](https://nomadcoders.co/react-native-for-beginners)

</br></br>

# 프로젝트 설명

### **React-Native 기초를 다지기 위한 프로젝트**

React-Native로 **날씨 앱** 만들어보았습니다.

</br></br>

# 프로젝트 실행

```
1. git clone https://github.com/yyoumi4854/nwitter.git
2. npm install
3. expo start
```

</br></br>

# 기술스택

<div>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/ReactNative-61DAFB?style=flat-square&logo=React&logoColor=white"/>
</div>

expo

- expo-location

API : openWeather

- [Current Weather Data](https://openweathermap.org/current)
- [5 day weather forecast](https://openweathermap.org/forecast5) -> 이것만 사용

</br></br>

# 구현 기능

![image](https://github.com/yyoumi4854/nwitter/assets/64270940/5b3cd7d0-7eb4-4a62-956d-e328eb7e9b35)

1. '앱 사용 중에만 허용'으로 앱을 사용하는 중에만 앱에서 위치를 사용하여 현재 위치(위도, 경도)를 가지고 와 현재 위치 찾음
2. 5일 3시간 예보(총 40개) 데이터의 시간, 온도, 날씨 데이터를 가지고 오고 적용 -> 가로 스크롤로 확인 가능
3. expo-icons로 해당 날씨에 알맞은 아이콘 적용
