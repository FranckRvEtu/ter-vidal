import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import ListePatient from "../components/listePatient";
import Ordonnance from "../screens/ordonnance";
import Flavio from "../screens/flavio";
import HomePage from "../screens/home";

const screens = {
    Home : {
        screen : HomePage
    },
    Ordonnance : {
        screen : Ordonnance
    },
    Juif : {
        screen : Flavio
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);