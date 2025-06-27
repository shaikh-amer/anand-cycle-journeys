import html2pdf from 'html2pdf.js';
import { supabase } from '@/integrations/supabase/client';

export const generatePDFBlob = (element: HTMLElement, fileName: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    // Use the element directly without cloning to avoid style issues
    const opt = {
      margin: 0.5,
      filename: fileName,
      image: { 
        type: 'jpeg', 
        quality: 1.0 
      },
      html2canvas: { 
        scale: 1,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        letterRendering: true,
        onclone: (clonedDoc: Document) => {
          // Ensure all styles are properly applied in the cloned document
          const clonedElement = clonedDoc.querySelector('.pdf-invoice-container') as HTMLElement;
          if (clonedElement) {
            clonedElement.style.display = 'block';
            clonedElement.style.visibility = 'visible';
            clonedElement.style.opacity = '1';
            clonedElement.style.position = 'relative';
            clonedElement.style.width = '210mm';
            clonedElement.style.minHeight = '297mm';
            clonedElement.style.backgroundColor = '#ffffff';
            clonedElement.style.color = '#000000';
            clonedElement.style.fontFamily = 'Arial, sans-serif';
            clonedElement.style.fontSize = '14px';
            clonedElement.style.lineHeight = '1.6';
            clonedElement.style.padding = '20px';
            clonedElement.style.boxSizing = 'border-box';
          }
        }
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      }
    };

    html2pdf()
      .from(element)
      .set(opt)
      .toPdf()
      .output('blob')
      .then((blob: Blob) => {
        if (blob && blob.size > 0) {
          resolve(blob);
        } else {
          reject(new Error('Generated PDF is empty'));
        }
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
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
  const blob = await generatePDFBlob(element, fileName);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const printPDF = async (element: HTMLElement, fileName: string): Promise<void> => {
  const blob = await generatePDFBlob(element, fileName);
  const url = URL.createObjectURL(blob);
  const printWindow = window.open(url, '_blank');
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print();
    };
  } else {
    throw new Error('Please disable your pop-up blocker to print.');
  }
};
