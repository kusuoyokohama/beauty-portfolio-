import { AppRegistry } from "react-native";
import App from "./App";

AppRegistry.registerComponent("atelierSixApp", () => App);
AppRegistry.runApplication("atelierSixApp", {
  rootTag: document.getElementById("root"),
});
