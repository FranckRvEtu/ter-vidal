import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import ListePatient from "../components/listePatient";

const screens ={
    Home : {
        screen : ListePatient
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);