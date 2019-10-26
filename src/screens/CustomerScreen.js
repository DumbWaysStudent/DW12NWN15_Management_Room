import React, { Component } from 'react'
import { Modal, Image, ScrollView, ActivityIndicator, View, StatusBar, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

import { connect } from 'react-redux'

import Header from '../components/Header'
import colors from '../assets/colors'
import { getCustomer } from '../_redux/_actions/customer'
import Axios from 'axios'
import config from '../configs/config'

class CustomerScreen extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Header title="Customer" />
        {this.props.customer.isLoading === true ? (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.body}>
            {this.props.customer.data.map((item) => (
              <View key={item.id} style={styles.customerBox}>
                <View style={styles.profile}>
                  <Image style={styles.img} source={{uri: item.image}} />
                </View>
                <View style={styles.desc}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.sub}>{item.identity_number}</Text>
                  <Text style={styles.sub}>{item.phone}</Text>
                </View>
              </View>
            ))}

            
          </ScrollView>
        )}
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    )
  }

  async componentDidMount() {
    this._getCustomer()
  }

  _getCustomer = async () => {
    await this.props.dispatch(getCustomer(this.props.user.token))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  body: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  customerBox: {
    borderWidth: 2,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 10,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  profile: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    marginRight: 10,
    overflow: 'hidden',
    backgroundColor: colors.sub
  },
  img: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2
  },

  desc: {
    flex: 1,
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 18
  },
  fab: {
    position: 'absolute',
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50 / 2,
    bottom: 20,
    right: 30
  },
  fabText: {
    color: colors.white,
    fontSize: 22,
  }
})

const mapStateToProps = (state) => ({
  user: state.user,
  customer: state.customer
})

export default connect(mapStateToProps)(CustomerScreen)