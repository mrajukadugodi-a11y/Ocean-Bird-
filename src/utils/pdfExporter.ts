// PDF and Print Export Generator Utility for OceanBird Digital Bookings, E-Tickets & Bills of Lading

export interface PdfDocumentData {
  documentType: 'E-TICKET' | 'AIR_WAYBILL' | 'BILL_OF_LADING' | 'TAX_INVOICE';
  bookingId: string;
  title: string;
  operatorName: string;
  passengerOrCargoName: string;
  passportOrCustomsCode: string;
  origin: string;
  destination: string;
  departureDate: string;
  allocatedSpace: string;
  paymentMethod: string;
  paymentTxHash?: string;
  basePriceUSD: number;
  totalPriceUSD: number;
  currencyCode: string;
  formattedTotalPrice: string;
  issueTimestamp: string;
  qrPayload: string;
}

export const generateAndDownloadPdf = (data: PdfDocumentData) => {
  // Generate formatted HTML for printing / PDF saving
  const printableHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${data.documentType} - ${data.bookingId}</title>
        <style>
          @page { size: A4; margin: 15mm; }
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #0f172a;
            background: #ffffff;
            margin: 0;
            padding: 20px;
            font-size: 12px;
            line-height: 1.5;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 3px solid #0284c7;
            padding-bottom: 15px;
            margin-bottom: 20px;
          }
          .logo-text {
            font-size: 24px;
            font-weight: 900;
            color: #0284c7;
            letter-spacing: -0.5px;
          }
          .doc-type {
            font-size: 14px;
            font-weight: 800;
            background: #0284c7;
            color: #ffffff;
            padding: 6px 14px;
            border-radius: 6px;
            text-transform: uppercase;
          }
          .meta-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          }
          .meta-item strong {
            display: block;
            font-size: 10px;
            color: #64748b;
            text-transform: uppercase;
          }
          .meta-item span {
            font-size: 13px;
            font-weight: 700;
            color: #0f172a;
          }
          .route-box {
            background: #f1f5f9;
            border-left: 4px solid #0ea5e9;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
          }
          .route-title {
            font-size: 16px;
            font-weight: 800;
            color: #0369a1;
            margin-bottom: 5px;
          }
          .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .details-table th, .details-table td {
            border: 1px solid #cbd5e1;
            padding: 10px;
            text-align: left;
          }
          .details-table th {
            background: #e2e8f0;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            color: #334155;
          }
          .qr-section {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #f8fafc;
            border: 1px dashed #94a3b8;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
          }
          .qr-image {
            width: 120px;
            height: 120px;
            border-radius: 6px;
            border: 2px solid #cbd5e1;
          }
          .footer-note {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
            padding-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo-text">OCEANBIRD WORLDWAYS</div>
            <div style="font-size: 10px; color: #64748b; font-weight: bold;">INTERNATIONAL AIRWAYS & MARITIME LOGISTICS</div>
          </div>
          <div class="doc-type">${data.documentType.replace(/_/g, ' ')}</div>
        </div>

        <div class="route-box">
          <div class="route-title">${data.title}</div>
          <div style="font-size: 12px; font-weight: bold; color: #334155;">
            ROUTE: ${data.origin} ➔ ${data.destination}
          </div>
        </div>

        <div class="meta-grid">
          <div class="meta-item">
            <strong>DOCUMENT / REFERENCE ID</strong>
            <span>${data.bookingId}</span>
          </div>
          <div class="meta-item">
            <strong>ISSUED DATE / TIME</strong>
            <span>${data.issueTimestamp}</span>
          </div>
          <div class="meta-item">
            <strong>PASSENGER / SHIPPER NAME</strong>
            <span>${data.passengerOrCargoName}</span>
          </div>
          <div class="meta-item">
            <strong>PASSPORT / CUSTOMS DUTY CODE</strong>
            <span>${data.passportOrCustomsCode}</span>
          </div>
          <div class="meta-item">
            <strong>DEPARTURE DATE</strong>
            <span>${data.departureDate}</span>
          </div>
          <div class="meta-item">
            <strong>ALLOCATED CABIN / SEAT / CONTAINER</strong>
            <span>${data.allocatedSpace}</span>
          </div>
        </div>

        <table class="details-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Operator</th>
              <th>Payment Gateway</th>
              <th>Total Amount Paid (${data.currencyCode})</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>${data.title}</strong></td>
              <td>${data.operatorName}</td>
              <td>${data.paymentMethod}</td>
              <td><strong style="color: #059669; font-size: 14px;">${data.formattedTotalPrice}</strong></td>
            </tr>
          </tbody>
        </table>

        ${data.paymentTxHash ? `
          <div style="background: #ecfdf5; border: 1px solid #10b981; padding: 10px; border-radius: 6px; font-family: monospace; font-size: 10px; color: #047857; margin-bottom: 15px;">
            <strong>VERIFIED DIGITAL PAYMENT TX HASH:</strong> ${data.paymentTxHash}
          </div>
        ` : ''}

        <div class="qr-section">
          <div>
            <div style="font-size: 14px; font-weight: 800; color: #0f172a;">VALIDATED DIGITAL QR PASS</div>
            <div style="font-size: 11px; color: #64748b; margin-top: 4px; max-w: 300px;">
              Scan at airport gate, port customs terminal, or ship gangway for instant board pass verification & satcom manifest check-in.
            </div>
            <div style="font-size: 10px; font-family: monospace; color: #0284c7; margin-top: 8px;">
              SHA-256 ENCRYPTED MANIFEST HASH
            </div>
          </div>
          <img class="qr-image" src="${data.qrPayload}" alt="QR Validation Code" />
        </div>

        <div class="footer-note">
          OceanBird Worldways Ltd • SatCom NavNet System • Document Generated Digitally • Valid Without Physical Stamp
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
          };
        </script>
      </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(printableHtml);
    printWindow.document.close();
  } else {
    alert('Please allow popups to export the PDF/Print E-Ticket document.');
  }
};
