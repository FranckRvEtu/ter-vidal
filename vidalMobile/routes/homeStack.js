import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import ListePatient from "../components/listePatient";
import Ordonnance from "../screens/ordonnance";
const screens = {
    Home : {
        screen : ListePatient
    },
    Ordonnance : {
        screen : Ordonnance
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);