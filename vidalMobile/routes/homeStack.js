import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import ListePatient from "../components/listePatient";
import Ordonnance from "../screens/ordonnance";
import HomePage from "../screens/home";
import ListeRDV from "../screens/listeRDV";


const screens = {
    Home : {
        screen : HomePage
    },
    Ordonnance : {
        screen : Ordonnance
    },
    Patients : {
        screen : ListePatient
    },
    RDV : {
        screen : ListeRDV
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);