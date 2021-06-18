import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Field ,FieldArray, reduxForm } from 'redux-form'
import { TextInput } from "react-native-gesture-handler";

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

export default class AddSpecialities extends React.Component{


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

  RenderDegrees = ({ fields, meta: { error } }) => {
		return (
			<View>
				{fields.map((degrees, index) => (
					<View key={index} >
						<TextInput
							name={`${degrees}.degrees`}
							label="Degrees"
							component={TextInput}

						/>
						<TouchableOpacity
							onPress={() => fields.remove(index)}
						
						>
							<Icon name="trash"  />
						</TouchableOpacity>
					</View>
				))}
				<Button
					light
					iconLeft
					small
					rounded
					onPress={() => fields.push({ aroma: "" })}
				>
					<Icon name="add" />
					<Text>Add aroma</Text>
				</Button>
			</View>
		);
	};



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
          label="Payment"
          onNext={this.onPaymentStepComplete}
          onPrevious={this.onPrevStep}
          scrollViewProps={this.defaultScrollViewProps}
        >
          <View style={{ alignItems: 'center' }}>
            <Text>DIPLÔME</Text>
          
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