<!-- Title -->

<p align="center">
  <a href="https://github.com/expo/examples">
    <img alt="create-react-native-app" src="./.gh-assets/banner.svg">
    <h1 align="center"> React Native App</h1>
  </a>
</p>

<!-- Header -->

<p align="center">
  <b>IOT Smart Cradle Project</b>
  <br />

  <p align="center">
    <!-- iOS -->
    <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-000.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
    <!-- Android -->
    <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-000.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
    <!-- Web -->
    <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-000.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
  </p>
  <p align="center">
    <a href="https://packagephobia.now.sh/result?p=create-react-native-app">
      <img alt="the best way to bootstrap a react native app" longdesc="the best way to create a react native app" src="https://flat.badgen.net/packagephobia/install/create-react-native-app" />
    </a>
  </p>
  
</p>

<p align="center">
  <img align="center" alt="Product: demo" src="./.gh-assets/crna.gif" />
</p>

<!-- Body -->


## Hệ thống gồm các thành phần:


### Controller: 
   - Là các thiết bị ngoại vi có thể điều khiển được từ MCU

### Sensor: 
  - là các cảm biến sẽ thu thập dữ liệu và gửi cho MCU
  
### MCU (Vi điều khiển): 
  - là phần lõi của sản phẩm – kết nối với các controller và sensor, kết nối Wifi, gửi lại dữ liệu thu được từ controller và sensor cho Backend Server thông qua giao thức MQTT
   
### Back-end Server: 
  - là một web server application, cung cấp REST API cho web clients và Mobile App, nhận dữ liệu từ MCU thông qua giao thức MQTT. Ngoài ra, backend sẽ kết nối tới Mobile App qua giao thức websocket (ws) để truyền và nhận dữ liệu thời gian thực.
  
### Web Client: 
  - Web dành cho người quản trị (ở bối cảnh này là nhà cung cấp sản phẩm), xem được thống kê người dùng, thống kê thiết bị đang sử dụng.
  
### Mobile App: 
- Dành cho người dùng, là ứng dụng giúp người dùng theo dõi cũng như điều khiển thiết bị từ xa.

