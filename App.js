/**
1. Container, View가 이미 Flex Container
- Flex Direction 기본값은 모두 Column

웹
- 웹에서는 Flex Direction의 기본 값은 Row

모바일
- 모바일에서 Flex Direction의 기본값은 Column
- Overflow되어도 가로 스크롤이 안된다. -> 브라우저가 아니기 때문

2. 너비와 높이에 기반해서 레이아웃을 만들지 않음
- 수 많은 스크린에서 동일한 방식으로 보이는 레이아웃을 만드는 것에 대해 생각해봐야 된다.
- width, height를 사용하지 않는다.

- 콘솔에 r누르면 전체 어플리케이션이 Refreshed가 된다.
- 콘솔에 d누르면 develioer tools(개발자 도구)를 볼 수 있다.
**/
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Location from "expo-location";

import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "317eb535e8ab6157652cc6cfc8ae8500";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    // 위치 권한 허가
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) {
      setOk(false);
    }

    // 유저 위치 정보
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    // console.log(location);
    setCity(location[0].district);

    // 현재 날씨 데이터
    const resCurrentWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const jsonCurrentWeather = await resCurrentWeather.json();
    // console.log("1번:", jsonCurrentWeather);

    // 3시간씩 5일 데이터(하루에 총 8번데이터 -> 리스트 총40개)
    const res5Day3HourForecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const json5Day3HourForecast = await res5Day3HourForecast.json();
    console.log("2번:", json5Day3HourForecast.list[0]);
    // console.log("데이터 나와랏");
    setDays(json5Day3HourForecast.list);

    // 5일 날씨 데이터의 날짜별로 최저, 최고 온도로 데이터 가공하기
    // 00:00:00시간의 데이터만 가져오기
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={styles.container}>
        <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
        </View>

        <ScrollView
          pagingEnabled // 페이지네이션 같이 넘겨짐
          horizontal
          showsHorizontalScrollIndicator={false} // 스크롤하면 scroll indicatior가 없어짐
          contentContainerStyle={styles.weather} // flex해지
        >
          {days.length === 0 ? (
            <View style={{ ...styles.day, alignItems: "center" }}>
              <ActivityIndicator
                color="white"
                style={{ marginTop: 10 }}
                size="large"
              />
            </View>
          ) : (
            days.map((day, index) => (
              <View key={index} style={styles.day}>
                <Text>{day.dt_txt}</Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    width: "100%",
                  }}
                >
                  <Text style={styles.temp}>
                    {parseFloat(day.main.temp).toFixed(1)}
                  </Text>
                  <Fontisto
                    name={icons[day.weather[0].main]}
                    size={68}
                    color="black"
                  />
                </View>

                <Text style={styles.description}>{day.weather[0].main}</Text>
                <Text style={styles.tinyText}>
                  {day.weather[0].description}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    padding: 20,
    // alignItems: "center",
  },
  temp: {
    // marginTop: 50,
    fontSize: 100,
  },
  description: {
    marginTop: -30,
    fontSize: 40,
  },
  tinyText: {
    fontSize: 20,
  },
});
