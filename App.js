/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [
                  [0, 0, 0],
                  [0, 0, 0],
                  [0, 0, 0]
      ],
      currentPlayer: 1,
    };
  }
  componentDidMount(): * {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState: [
                  [0, 0, 0],
                  [0, 0, 0],
                  [0, 0, 0]
      ],
      currentPlayer: 1,
    });
  }
  getWinner = () => {
    //player 1 wins if 1 else -1 else 0(no winner)
    let sum;
    const SUM_TILES = 3;
    let arr = this.state.gameState;

    //check the rows
    for (let i = 0; i < SUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    //check the cols
    for (let i = 0; i < SUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }
    //check the diagonals
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }
    //A draw, no winner,
    return 0;
  };

  onTilePress = (row, col) => {
    // Avoid changing an already clicked tile
    let value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }

    // Get current player
    let currentPlayer = this.state.currentPlayer;

    // set the correct tile
    let arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    // switch to other player
    let nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});
    // check for winner

    let winner = this.getWinner();
    if (winner == 1) {
      Alert.alert('Player 1 wins');
      this.initializeGame();
    }else if (winner== -1){
      Alert.alert('Player 2 wins')
      this.initializeGame();
    }
  };

  renderIcon = (row, col) => {
    let value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="ios-add-circle" style={styles.tileX} />;
      case -1:
        return <Icon name="ios-add-circle-outline" style={styles.tileY} />;
      default:
        return <View />;

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}>Tic Tac Toe</Text>

        <View style={{marginTop: 20}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 0)}
              style={[styles.tile, {borderLeftWidth: 2, borderTopWidth: 2}]}>
              {this.renderIcon(0, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 1)}
              style={styles.tile}>
              {this.renderIcon(0, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 2)}
              style={[styles.tile, {borderLeftWidth: 2, borderTopWidth: 2}]}>
              {this.renderIcon(0, 2)}
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 0)}
              style={[styles.tile, {borderLeftWidth: 2, borderTopWidth: 2}]}>
              {this.renderIcon(1, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 1)}
              style={styles.tile}>
              {this.renderIcon(1, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 2)}
              style={[styles.tile, {borderLeftWidth: 2, borderTopWidth: 2}]}>
              {this.renderIcon(1, 2)}
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 0)}
              style={[styles.tile, {borderLeftWidth: 2, borderTopWidth: 2}]}>
              {this.renderIcon(2, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 1)}
              style={styles.tile}>
              {this.renderIcon(2, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 2)}
              style={[styles.tile, {borderLeftWidth: 2, borderTopWidth: 2}]}>
              {this.renderIcon(2, 2)}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingTop: 50}} />
        <Button
          title="New Game"
          onPress={() => {
            this.initializeGame();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 5,
    height: 100,
    width: 100,
  },
  tileX: {
    color: 'red',
    fontSize: 60,
  },
  tileY: {
    color: 'green',
    fontSize: 60,
  },
});
