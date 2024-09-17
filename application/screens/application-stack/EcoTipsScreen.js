import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import color from "../../config/color";
import font from "../../config/font";

// Components Import
import MainView from "../../components/MainView";

// Images Import
import transportationImg from "../../assets/images/transportation-tips.jpg";
import dietImg from "../../assets/images/dietary-tips.jpg";
import solarImg from "../../assets/images/energy-tips.jpg";
import lifeStyleImg from "../../assets/images/lifestyle-tips.jpg";
import NavigationBackBtn from "../../components/NavigationBackBtn";

// This function is responsible for controlling the nested navigation stack for the EcoTips screen.
export const EcoTipsStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="EcoTipsMain"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="EcoTipsMain" component={EcoTips} />
      <Stack.Screen name="TransportationTips" component={TransportationTips} />
      <Stack.Screen name="EnergyTips" component={EnergyTips} />
      <Stack.Screen name="LifestyleTips" component={LifestyleTips} />
      <Stack.Screen name="DietaryTips" component={DietaryTips} />
    </Stack.Navigator>
  );
};

const EcoTips = ({ navigation }) => {
  return (
    <MainView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("TransportationTips")}
        >
          <Image
            source={transportationImg}
            alt="An image of a car"
            style={styles.transportImg}
          />
          <Text>Transportation</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("EnergyTips")}>
          <Image
            source={solarImg}
            alt="An image of a car"
            style={styles.transportImg}
          />
          <Text>Energy Usage</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("LifestyleTips")}>
          <Image
            source={lifeStyleImg}
            alt="An image of a car"
            style={styles.transportImg}
          />
          <Text>Life Style Tips</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("DietaryTips")}>
          <Image
            source={dietImg}
            alt="An image of a car"
            style={styles.transportImg}
          />
          <Text>Dietary</Text>
        </TouchableOpacity>
      </View>
    </MainView>
  );
};

const TransportationTips = ({ navigation }) => {
  return (
    <MainView>
      <ScrollView>
        <View style={styles.headerContainer}>
          <NavigationBackBtn navigation={navigation} color={color.primary} />
          <Text style={styles.headerText}>Transportation Tips</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            Opt for Public Transportation
          </Text>
          <Text style={styles.paragraph}>
            Use buses, trains, and trams to reduce your carbon footprint. Public
            transport emits far less CO2 per person than driving a car.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Carpool or Ride-Share</Text>
          <Text style={styles.paragraph}>
            Share rides with friends, colleagues, or use ride-sharing services.
            Carpooling reduces the number of vehicles on the road, cutting down
            on emissions.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Cycle Instead of Driving</Text>
          <Text style={styles.paragraph}>
            Whenever possible, use a bicycle for short trips. Cycling is a
            zero-emission way to get around and also promotes a healthy
            lifestyle.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            Support Green Transportation Initiatives
          </Text>
          <Text style={styles.paragraph}>
            Advocate for and support local initiatives aimed at improving and
            expanding eco-friendly transportation options in your community,
            such as bike lanes and electric bus networks.
          </Text>
        </View>
      </ScrollView>
    </MainView>
  );
};

const EnergyTips = ({ navigation }) => {
  return (
    <MainView>
      <ScrollView>
        <View style={styles.headerContainer}>
          <NavigationBackBtn navigation={navigation} color={color.primary} />
          <Text style={styles.headerText}>Energy Tips</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Lighting:</Text>
          <Text style={styles.paragraph}>
            Switch to LED Bulbs: Replace incandescent or CFL bulbs with
            energy-efficient LED bulbs, which use up to 75% less energy and last
            longer. Utilize Natural Light: Open blinds and curtains during the
            day to maximize natural light, reducing the need for artificial
            lighting. Turn Off Lights: Make it a habit to turn off lights when
            leaving a room.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Renewable Energy:</Text>
          <Text style={styles.paragraph}>
            Consider Solar Panels: If feasible, install solar panels to generate
            your own renewable energy and reduce reliance on the grid. Use a
            Solar Water Heater: Solar water heaters can significantly reduce
            energy usage for heating water.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            Insulation and Home Improvements:
          </Text>
          <Text style={styles.paragraph}>
            Improve Home Insulation: Properly insulate your attic, walls, and
            floors to reduce the need for heating and cooling. Install
            Energy-Efficient Windows: Replace single-pane windows with double or
            triple-pane windows to improve insulation. Use Ceiling Fans: Ceiling
            fans can help distribute heat in the winter and provide cooling in
            the summer, reducing reliance on HVAC systems.
          </Text>
        </View>
      </ScrollView>
    </MainView>
  );
};

const LifestyleTips = ({ navigation }) => {
  return (
    <MainView>
      <ScrollView>
        <View style={styles.headerContainer}>
          <NavigationBackBtn navigation={navigation} color={color.primary} />
          <Text style={styles.headerText}>Life Style Tips</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Reduce, Reuse, Recycle:</Text>
          <Text style={styles.paragraph}>
            Focus on reducing waste, reusing items whenever possible, and
            recycling materials. Avoid single-use plastics and opt for reusable
            alternatives.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            Use Eco-Friendly Cleaning Products:
          </Text>
          <Text style={styles.paragraph}>
            Choose cleaning products that are biodegradable and free from
            harmful chemicals.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Educate and Advocate: </Text>
          <Text style={styles.paragraph}>
            Stay informed about environmental issues and advocate for
            sustainable practices within your community.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            Choose Sustainable Products:{" "}
          </Text>
          <Text style={styles.paragraph}>
            Support brands and products that prioritize sustainability, such as
            those made from recycled materials or produced with minimal
            environmental impact.
          </Text>
        </View>
      </ScrollView>
    </MainView>
  );
};

const DietaryTips = ({ navigation }) => {
  return (
    <MainView>
      <ScrollView>
        <View style={styles.headerContainer}>
          <NavigationBackBtn navigation={navigation} color={color.primary} />
          <Text style={styles.headerText}>Dietary Tips</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            Choose Local and Seasonal Produce:{" "}
          </Text>
          <Text style={styles.paragraph}>
            Buy fruits and vegetables that are in season and grown locally. This
            reduces the need for long-distance transportation and supports local
            farmers.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Eat More Plant-Based Foods: </Text>
          <Text style={styles.paragraph}>
            Incorporate more fruits, vegetables, legumes, nuts, and grains into
            your diet. Plant-based foods typically have a lower carbon footprint
            compared to meat and dairy products.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Drink Tap Water: </Text>
          <Text style={styles.paragraph}>
            Instead of buying bottled water, use a reusable water bottle and
            drink tap water or filtered water. This reduces plastic waste and
            energy used in bottling and transportation.
          </Text>
        </View>
      </ScrollView>
    </MainView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  transportImg: {
    width: Dimensions.get("window").width / 2.5,
    height: Dimensions.get("window").width / 2.5,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    color: color.primary,
    flexGrow: 1,
    fontSize: 24,
    fontFamily: font.fontFamily,
    marginLeft: 5,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: color.primary,
    marginBottom: 10,
    fontFamily: font.fontFamily,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: color.black,
    fontFamily: font.fontFamily,
    marginBottom: 30,
  },
});
