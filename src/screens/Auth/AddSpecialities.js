import React from "react";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-navigation";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Field ,FieldArray, reduxForm } from 'redux-form'
import { TextInput } from "react-native-gesture-handler";
import InputField from "../../common/InputField";
import Stepper from "../../components/Stepper";

export default class AddSpecialities extends React.Component{

  state = {
    degreesText:'',
    degrees: [],
    specialities:[],
    xp: '',
    gymPlace: '',
    avatar: '',
  };

  static navigationOptions = {
    header: null
  };

  defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center'
    }
  };

  RenderDegrees = (/*{ fields, meta: { error } }*/) => {
    const {degrees, degreesText} = this.state
    console.log(this.state.degreesText);
		return (
			<View>
				{degrees.map((degrees, index) => (
					<View key={index} >
						<TextInput
							name={`${degrees}.degrees`}
							label="Degrees"
							component={TextInput}

						/>
						<TouchableOpacity
							onPress={() => degrees.remove(index)}
						
						>
							{/* <Icon name="trash"  /> */}
						</TouchableOpacity>
					</View>
				))}
				<Button
					light
					iconLeft
					small
					rounded
					onPress={() => degrees.push({aroma:"toto" })}
				>
					{/* <Icon name="add" /> */}
					<Text>Add arooooma</Text>
				</Button>
			</View>
		);
    
	};

  onDegreesChange(degreesText) {
    this.setState({degreesText})
  }

   onNextStep = () => {
    console.log('called next step');
  };

  onPaymentStepComplete = () => {
    alert('Payment step completed!');
  };

  onPrevStep = () => {
    console.log('called previous step');
  };

  onSubmitSteps = () => {
    console.log('called on submit step.');
  };

render() {
  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <ProgressSteps>
        <ProgressStep
          label="Degrees"
          onNext={this.handleDegrees}
          onPrevious={this.onPrevStep}
          scrollViewProps={this.defaultScrollViewProps}
        >
          <View style={{ alignItems: 'center' }}>
            <Text>DIPLÔME</Text>
            <Stepper onSubmit={this.handleBeerAddFormSubmit}
					initialValues={this.state.degrees}
			
            />

            <InputField
            //={Icons.PersonAuth({width: wp('5%'), resizeMode: 'contain', tintColor: '#BCBCBC'})}
              keyboardType={'default'}
              placeholder='Identifiant'
              value={this.state.degreesText}
              onChangeText={this.onDegreesChange.bind(this)}
            />
            <Button title='add degrees'onPress={this.RenderDegrees.bind(this)}></Button>
            {/* <FieldArray
            name="degrees"
						component={this.RenderDegrees}/>
           */}

          </View>
        </ProgressStep>
        <ProgressStep
          label="Shipping Address"
          onNext={this.onNextStep}
          onPrevious={this.onPrevStep}
          scrollViewProps={this.defaultScrollViewProps}
        >
          <View style={{ alignItems: 'center' }}>
            <Text>ANNEE D'EXPERIENCE</Text>
          </View>
        </ProgressStep>
        <ProgressStep
          label="Billing Address"
          onNext={this.onNextStep}
          onPrevious={this.onPrevStep}
          scrollViewProps={this.defaultScrollViewProps}
        >
          <View style={{ alignItems: 'center' }}>
            <Text>SPECIALITE(S)</Text>
          </View>
        </ProgressStep>
        <ProgressStep
          label="Confirm Order"
          onPrevious={this.onPrevStep}
          onSubmit={this.onSubmitSteps}
          scrollViewProps={this.defaultScrollViewProps}
        >
          <View style={{ alignItems: 'center' }}>
            <Text>LIEU D'EXPERIENCE</Text>
          </View>
        </ProgressStep>
        <ProgressStep
          label="Confirm Order"
          onPrevious={this.onPrevStep}
          onSubmit={this.onSubmitSteps}
          scrollViewProps={this.defaultScrollViewProps}
        >
          <View style={{ alignItems: 'center' }}>
            <Text>PHOTO DE PROFIL</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}
}