import React, {Component, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {BarcodeFormat, BrowserMultiFormatReader, DecodeHintType} from '@zxing/library';

const SupportedFormats = [
    /** Aztec 2D barcode format. */
    BarcodeFormat.AZTEC,
    /** CODABAR 1D format. */
    BarcodeFormat.CODABAR,
    /** Code 39 1D format. */
    BarcodeFormat.CODE_39,
    /** Code 93 1D format. */
    BarcodeFormat.CODE_93,
    /** Code 128 1D format. */
    BarcodeFormat.CODE_128,
    /** Data Matrix 2D barcode format. */
    BarcodeFormat.DATA_MATRIX,
    /** EAN-8 1D format. */
    BarcodeFormat.EAN_8,
    /** EAN-13 1D format. */
    BarcodeFormat.EAN_13,
    /** ITF (Interleaved Two of Five) 1D format. */
    BarcodeFormat.ITF,
    /** MaxiCode 2D barcode format. */
    BarcodeFormat.MAXICODE,
    /** PDF417 format. */
    BarcodeFormat.PDF_417,
    /** QR Code 2D barcode format. */
    BarcodeFormat.QR_CODE,
    /** RSS 14 */
    BarcodeFormat.RSS_14,
    /** RSS EXPANDED */
    BarcodeFormat.RSS_EXPANDED,
    /** UPC-A 1D format. */
    BarcodeFormat.UPC_A,
    /** UPC-E 1D format. */
    BarcodeFormat.UPC_E
];

const BarCodeScanner = ({onUpdate}) => {
    // eslint-disable-next-line no-unused-vars
    const [hints, setHints] = useState(() => {
        const newHints = new Map();
        newHints.set(DecodeHintType.POSSIBLE_FORMATS, SupportedFormats);
        return newHints;
    });

    const [CodeReader, setCodeReader] = useState(null);

    useEffect(() => {
        if (hints === null) {
            
            return;
        }
        if (CodeReader === null) {
            
            setCodeReader(new BrowserMultiFormatReader(hints));
            return;
        }

       
        CodeReader.decodeOnceFromVideoDevice(undefined, 'video')
            .then((result) => {
                /* istanbul ignore next */
                onUpdate(null, result)
            }).catch((e) => {
            onUpdate(e, undefined)
        })

        return () => {
            CodeReader.reset()
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hints, CodeReader])

    return (
        <div id="scanner-container">
            <video id="video" className="dbrScanner-video" playsInline/>
        </div>
    )
};

class Scanner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            result: 'No result',
        }

        this.handleScan = this.handleScan.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    handleScan(data) {
        
        this.setState({
            result: JSON.stringify(data),
        })
    }

    handleError(err) {
        console.error({scannerError: err})
    }

    render() {

        return (
            <div>
                <BarCodeScanner
                    onUpdate={(err, result) => {
                        
                        if (err) {
                            this.handleError(err);
                        }

                        if (result) {
                            this.handleScan(result);
                        }
                    }}
                />
                <p>{this.state.result}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    shoppingList: state.shoppingList,
});

export default connect(mapStateToProps, null)(Scanner);
