import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function PdfViewer({ selectedPdf, fileName }) {
    // Create an instance of the defaultLayoutPlugin with toolbar options disabled
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        toolbar: {
            // Only disable specific toolbar items you want
            download: false,
            print: false,
            open: false,
            // Other toolbar items can remain enabled if needed
        },
        sidebar: {
            tabs: {
                more: false // Optionally disable the more tab if you don't need it
            }
        }
    });

    return (
        <div style={styles.pdfContainer}>
            <div style={styles.pdfWrapper}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer fileUrl={selectedPdf} plugins={[defaultLayoutPluginInstance]} />
                </Worker>
            </div>
        </div>
    );
}

const styles = {
    pdfContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Full viewport height
        width: '100%',
        padding: '20px',
        backgroundColor: '#1e1e1e', // Dark background to match theme
        overflow: 'hidden',
    },
    goBackButton: {
        backgroundColor: '#607d8b',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        marginBottom: '20px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    pdfWrapper: {
        width: '100%',
        height: 'calc(100vh - 60px)', // Adjust height to fit well with the button
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        backgroundColor: '#2c2c2c', // Match background color for consistency
    },
};
