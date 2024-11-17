import React, { useRef } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import ReactDOM from 'react-dom';
import Report from './template';

const ExportPDF = (data) => {
    const pdfExportComponent = useRef(null);

    const handleExportPDF = () => {
        pdfExportComponent.current.save();
    };

    return (
        <div>
            {ReactDOM.createPortal(
                <PDFExport ref={pdfExportComponent} paperSize="A4" >
                    <Report campaign={data.campaignData} />
                </PDFExport>,
                document.body // Thêm nội dung vào DOM mà không ảnh hưởng đến giao diện người dùng
            )}
            <button onClick={handleExportPDF}>Export PDF</button>
        </div>
    );
};

export default ExportPDF;
