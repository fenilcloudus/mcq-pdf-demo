import { pdf } from '@react-pdf/renderer';
import PdfDocument from '../components/PdfDocument';

export const downloadPdf = async () => {
  const blob = await pdf(<PdfDocument />).toBlob();
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'biology-mcq-paper.pdf';
  link.click();
};
