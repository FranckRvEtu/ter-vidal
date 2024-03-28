import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

function QRScanner() {
    const [result, setResult] = useState('');
    const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false);

    const handleScan = data => {
        if (data) {
            setResult(data);
        }
    }

    const handleError = err => {
        console.error(err);
        if (err.name === 'NotAllowedError') {
            setCameraPermissionDenied(true);
        }
    }

    const requestCameraPermission = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(() => setCameraPermissionDenied(false))
            .catch(err => console.error(err));
    }

    return (
        <div>
            {cameraPermissionDenied ? (
                <div>
                    <p>La permission d'accéder à la caméra est refusée.</p>
                    <button onClick={requestCameraPermission}>Autoriser l'accès à la caméra</button>
                </div>
            ) : (
                <div>
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '100%' }}
                    />
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
}

export default QRScanner;
