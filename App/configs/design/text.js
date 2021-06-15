import React from 'react';
import {Text} from 'react-native'
import ResponsiveText from '../../common/ResponsiveText';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Color from './color';

const ItemText = {
  ProfileCertified: (style = []) => <Text style={style}>profil certifié</Text>,
  Modifier: (style = []) => <Text style={style}>modifier mes informations personnelles</Text>,
  AddTag: (style = []) => <Text style={style}>Touchez la photo pour tagger une coupe</Text>,
  Revenus: (style = []) => <ResponsiveText style={style}>mes revenus</ResponsiveText>,
  Discussions: (style = []) => <ResponsiveText style={style}>mes discussions</ResponsiveText>,
  MyBenefits: (style = []) => <ResponsiveText style={style}>mes prestations</ResponsiveText>,
  MyBookings: (style = []) => <ResponsiveText style={style}>mes bookings</ResponsiveText>,
  MyPlanning: (style = []) => <ResponsiveText style={style}>mon planning</ResponsiveText>,
  ServiceAdded: (style = []) => <ResponsiveText style={style}>Votre nouvelle prestation a bien été
    ajoutée.</ResponsiveText>,
  AddService: (style = []) => <ResponsiveText style={style}>Ajouter une nouvelle prestation</ResponsiveText>,
  Sure: (style = []) => <ResponsiveText style={style}>Supprimer la conversation</ResponsiveText>,
  UpdatePersonal: (style = []) => <ResponsiveText style={style}>Mes informations personnelles</ResponsiveText>,
  UpdateCard: (style = []) => <ResponsiveText style={style}>Mon RIB</ResponsiveText>,
  Deconnexion: (style = []) => <ResponsiveText style={style}>Déconnexion</ResponsiveText>,
  Support: (style = []) => <ResponsiveText style={style}>Besoin d'aide ?</ResponsiveText>,
  CompletProfile: (style = []) => <ResponsiveText style={style}>Completer mon profil</ResponsiveText>,
  AddPicture: (style = []) => <ResponsiveText style={style}>Ajouter minimum 4 photos</ResponsiveText>,
  Request: (style = []) => <ResponsiveText style={style}>Elles recherchent une coiffeuse</ResponsiveText>,
  Validated: (style = []) => <ResponsiveText style={style}>Votre profil est en cours de validation</ResponsiveText>,
  JoinTeam: (style = []) => <ResponsiveText style={style}>Complétez votre profil et vos prestations
    afin que notre équipe puisse vous faire
    rejoindre l’équipe !</ResponsiveText>,
  SorryTextHeader: (style = []) => <ResponsiveText style={style}>Nous sommes désolés !</ResponsiveText>,
  SorryText: (style = []) => <ResponsiveText style={style}>
    Vous ne pouvez pas accéder à
    cette rubrique pour le moment.</ResponsiveText>,
  BenefitDeleteConfirmation: (style = []) =>  <ResponsiveText style={style}>Voulez-vous vraiment retirer cette prestation ?</ResponsiveText>,

};
export default ItemText;
