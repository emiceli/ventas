// import jsPDF from 'jspdf';

// const generatePDF = (data: any) => {
//   const doc = new jsPDF();
//   const estilos = `
//     <style>
//       body {
//         font-family: Arial, sans-serif;
//       }
//       table {
//         border-collapse: collapse;
//         width: 100%;
//       }
//       th, td {
//         border: 1px solid #ddd;
//         padding: 8px;
//         text-align: left;
//       }
//       th {
//         background-color: #f2f2f2;
//       }
//     </style>
//   `;

//   doc.html(estilos + data.html, {
//     callback: () => {
//       const pdfBlob = doc.output('blob');
//       self.postMessage(pdfBlob);
//     },
//     margin: 10,
//     x: 10,
//     y: 10
//   });
// };

// self.addEventListener('message', (event) => {
//   generatePDF(event.data);
// });