import React from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import { View, StyleSheet, TouchableOpacity,Button } from "react-native";
import InputField from "../common/InputField";
//import TextInput from "../../fields/TextInput/TextInput";



class StepperForm extends React.Component {

    renderField = ({ input }) => (
          <View>
            <InputField  />
          </View>
       
      );

     renderMembers = ({ fields}) => (
        <View>
          <View>
            <Button title="add Member" onPress={() => fields.push({})}/>
          </View>
          {fields.map((member, index) => (
            <View key={index}>
              <Button
                title="Remove Member"
                onPress={() => fields.remove(index)}
              />
              <Field
                name={`${member}.firstName`}
                component={renderField}
                label="First Name"
              />
      
            </View>
          ))}
        </View>
      );  
render(){
    return(
        <View>

        <FieldArray name="members" component={this.renderMembers} />
   
      </View>
    )
}
}
export default reduxForm({
	form: "Stepper",
})(StepperForm);

