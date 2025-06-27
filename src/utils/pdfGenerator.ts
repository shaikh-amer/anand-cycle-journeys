
import html2pdf from 'html2pdf.js';
import { supabase } from '@/integrations/supabase/client';

export const generatePDFBlob = (element: HTMLElement, fileName: string): Promise<Blob> => {
  const opt = {
    margin: 0,
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true, 
      letterRendering: true,
      width: element.scrollWidth,
      height: element.scrollHeight
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  return html2pdf().from(element).set(opt).outputPdf('blob');
};

export const uploadPDFToSupabase = async (pdfBlob: Blob, fileName: string): Promise<string> => {
  const { data, error } = await supabase.storage
    .from('bills')
    .upload(fileName, pdfBlob, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    throw new Error('Supabase upload failed: ' + error.message);
  }
  
  const { data: publicUrlData } = supabase.storage
    .from('bills')
    .getPublicUrl(data.path);

  if (!publicUrlData) {
    throw new Error('Could not get public URL for the uploaded file.');
  }

  return publicUrlData.publicUrl;
};

export const downloadPDF = async (element: HTMLElement, fileName: string): Promise<void> => {
  const opt = {
    margin: 0,
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true, 
      letterRendering: true,
      width: element.scrollWidth,
      height: element.scrollHeight
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  await html2pdf().from(element).set(opt).save();
};

export const printPDF = async (element: HTMLElement, fileName: string): Promise<void> => {
  const opt = {
    margin: 0,
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true, 
      letterRendering: true,
      width: element.scrollWidth,
      height: element.scrollHeight
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  const pdfBlob = await html2pdf().from(element).set(opt).output('blob');
  const blobUrl = URL.createObjectURL(pdfBlob);
  const pdfWindow = window.open(blobUrl, '_blank');
  if (pdfWindow) {
    pdfWindow.onload = () => {
      pdfWindow.print();
    };
  } else {
    throw new Error('Please disable your pop-up blocker to print.');
  }
};
