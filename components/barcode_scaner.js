
import React, { Component } from 'react';
import { Button, Text, View, AsyncStorage } from 'react-native';
import { RNCamera } from 'react-native-camera';

import Barcode from 'react-native-barcode-builder';

class BarcodeScannerExample extends Component {

  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
        barcodeFinderVisible: true,
        cardnumber: ''
      }
    };
  }

  onBarCodeRead(scanResult) {
    //  console.warn(scanResult.type);
    //  console.warn(scanResult.data);
    if (scanResult.data != null) {
      if (!this.barcodeCodes.includes(scanResult.data)) {
        this.setState({
          cardnumber: scanResult.data
        })
        /*/
                   AsyncStorage.getItem('UID123', (err, result) => {
                      let newstate = JSON.parse(result);
                      if (newstate != undefined) {
                        newstate.modalVisible = false;
                        newstate.cardnumber = scanResult.data;
                        AsyncStorage.setItem('UID123', JSON.stringify(newstate));
                        this.props.changelistpage(3);
                      }
                    });
        */
      }
    }
    return;
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      // console.log(data.uri);
    }
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Waiting</Text>
      </View>
    );
  }

  render() {
    return (
      < View style={{ flex: 1 }}>
        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
            barcodeFinderWidth={280}
            barcodeFinderHeight={220}
            barcodeFinderBorderColor="white"
            barcodeFinderBorderWidth={2}
            defaultTouchToFocus
            flashMode={this.state.camera.flashMode}
            mirrorImage={false}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            onFocusChanged={() => { }}
            onZoomChanged={() => { }}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            style={styles.preview}
            type={this.state.camera.type}
          />
          <View style={[styles.overlay, styles.topOverlay]}>
            <Text style={styles.scanScreenMessage}> Скан . . . </Text>
          </View>
          {!(
            this.state.cardnumber == undefined ||
            this.state.cardnumber == ''
          ) ? (
              <Barcode
                // height={Dimensions.get('window').width/2}
                //  width = {Dimensions.get('window').width - 20} 
                //width = {100}  
                value={this.state.cardnumber}
                format="CODE128"
                text={this.state.cardnumber}
              />
            ) : (
              <View />
            )}
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
};



export default BarcodeScannerExample;



