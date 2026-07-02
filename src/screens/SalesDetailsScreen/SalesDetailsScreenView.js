import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import Header from '../../components/Header';
import MonthsSlider from '../../components/MonthsSlider';
import styles from './SalesDetailsScreenStyles';

export default class SalesDetailsScreenView extends AbstractScreenView {
  renderItem = (item, index, isOld) => {
    const isFirst = index === 0;
    return (
      <LinearGradient
        colors={['#2D333C', '#101010']}
        start={{
          x: 1,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={[styles.item, { marginTop: isFirst ? 0 : 10 }]}>
        <View style={styles.itemTop}>
          <Text style={styles.fullName}>{`${(
            item.firstName +
            ' ' +
            item.lastName
          ).toUpperCase()} `}</Text>
          <Text style={styles.date}>
            {moment(item.date).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View style={styles.itemBottom}>
          <Text style={styles.offerName}>{item.offerName}</Text>
          <Text style={styles.amount}>
            {`${isOld ? item.paymentMethod : ''} ${item.amount}€ / ${
              item.offerAmount
            }€`}
          </Text>
        </View>
      </LinearGradient>
    );
  };
  render() {
    const {
      selectedMonth,
      totalOldAmount,
      totalNextAmount,
      oldSales,
      nextSales,
    } = this.component.state;

    return (
      <View style={styles.container}>
        <Header title="LES DÉTAILS DE VENTE" />
        <View style={styles.content}>
          <MonthsSlider
            onChange={this.controller.onMonthChange}
            date={selectedMonth}
            withYear={true}
            width={240}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.infoIndexText}>MONTANT(S) ENCAISSÉ(S)</Text>
            <Text style={styles.infoValueText}>{`${totalOldAmount}€`}</Text>
          </View>
          {!oldSales.length ? null : (
            <FlatList
              style={styles.flatList}
              data={oldSales}
              keyExtractor={(item) => Math.random(5).toString()}
              renderItem={({ item, index }) =>
                this.renderItem(item.payment, index, true)
              }
            />
          )}
          <View style={[styles.infoContainer, { marginTop: 16 }]}>
            <Text style={styles.infoIndexText}>MONTANT(S) EN ATTENTE</Text>
            <Text style={styles.infoValueText}>{`${totalNextAmount}€`}</Text>
          </View>
          {!nextSales.length ? null : (
            <FlatList
              style={styles.flatList}
              data={nextSales}
              keyExtractor={(item) => Math.random(5).toString()}
              renderItem={({ item, index }) =>
                this.renderItem(item.payment, index)
              }
            />
          )}
        </View>
      </View>
    );
  }
}
