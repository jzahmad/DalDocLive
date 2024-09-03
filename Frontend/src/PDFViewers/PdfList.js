import React from 'react';

export default function PdfList({ pdfFiles, handlePdfClick }) {
    return (
        <div className='pdf-list' style={styles.pdfList}>
            {pdfFiles.map((pdf, index) => (
                <div key={index} className='pdf-item' style={styles.pdfItem}>
                    <span 
                        onClick={() => handlePdfClick(pdf.url, pdf.fileName)} 
                        style={styles.pdfName}
                    >
                        {pdf.fileName}
                    </span>
                </div>
            ))}
        </div>
    );
}

const styles = {
    pdfList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', // Ensures the list takes full width of its container
    },
    pdfItem: {
        marginBottom: '10px',
        cursor: 'pointer',
        backgroundColor: '#2c2c2c', // Dark background for items
        padding: '10px',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
        color: '#e0e0e0', // Light text color for contrast
        width: '100%', // Optional: Ensures items span full width
        textAlign: 'center', // Center text within items
    },
    pdfName: {
        fontSize: '16px',
        color: '#e0e0e0', // Ensures text is readable on dark background
        textDecoration: 'none', // Removes default underline
    },
    pdfItemHover: {
        backgroundColor: '#4a4a4a', // Lighter color for hover effect
    },
};
