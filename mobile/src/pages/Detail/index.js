import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import { useNavigation, useRoute } from '@react-navigation/native';

import logoImg from '../../assets/logo.png';

import styles from './style';

export default function Detail(){
  const route = useRoute();
  const incident = route.params.incident;
  const navigation = useNavigation();
  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" no valor de ${Intl.NumberFormat('pt-BR', 
  {style: 'currency', currency: 'BRL'})
  .format(incident.value)}`

  

  function navigateBack(){
    navigation.goBack()
  }

  function sendMail(){
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }
  
  function sendWhasapp(){
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
  }

  return(
    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={logoImg}/>

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
      </View>  

      <View style={styles.incident}>
            <Text style={[styles.incidentProperty, {marginTop:0}]}>ONG de {incident.city}/{incident.uf} :</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>Valor</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', 
              {style: 'currency', currency: 'BRL'})
              .format(incident.value)}</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
        
        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhasapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  )
}