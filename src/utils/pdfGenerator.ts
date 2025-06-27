
import html2pdf from 'html2pdf.js';
import { supabase } from '@/integrations/supabase/client';

export const generatePDFBlob = (element: HTMLElement, fileName: string): Promise<Blob> => {
  // Ensure the element is visible and properly rendered
  const originalDisplay = element.style.display;
  const originalVisibility = element.style.visibility;
  const originalOpacity = element.style.opacity;
  
  // Make sure the element is visible
  element.style.display = 'block';
  element.style.visibility = 'visible';
  element.style.opacity = '1';
  
  const opt = {
    margin: [5, 5, 5, 5],
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true, 
      letterRendering: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 800,
      height: 1200,
      scrollX: 0,
      scrollY: 0
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  return html2pdf().from(element).set(opt).outputPdf('blob').then((blob: Blob) => {
    // Restore original styles
    element.style.display = originalDisplay;
    element.style.visibility = originalVisibility;
    element.style.opacity = originalOpacity;
    return blob;
  }).catch((error: Error) => {
    // Restore original styles even if there's an error
    element.style.display = originalDisplay;
    element.style.visibility = originalVisibility;
    element.style.opacity = originalOpacity;
    throw error;
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
  // Ensure the element is visible and properly rendered
  const originalDisplay = element.style.display;
  const originalVisibility = element.style.visibility;
  const originalOpacity = element.style.opacity;
  
  // Make sure the element is visible
  element.style.display = 'block';
  element.style.visibility = 'visible';
  element.style.opacity = '1';
  
  const opt = {
    margin: [5, 5, 5, 5],
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true, 
      letterRendering: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 800,
      height: 1200,
      scrollX: 0,
      scrollY: 0
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  try {
    await html2pdf().from(element).set(opt).save();
  } finally {
    // Restore original styles
    element.style.display = originalDisplay;
    element.style.visibility = originalVisibility;
    element.style.opacity = originalOpacity;
  }
};

export const printPDF = async (element: HTMLElement, fileName: string): Promise<void> => {
  // Ensure the element is visible and properly rendered
  const originalDisplay = element.style.display;
  const originalVisibility = element.style.visibility;
  const originalOpacity = element.style.opacity;
  
  // Make sure the element is visible
  element.style.display = 'block';
  element.style.visibility = 'visible';
  element.style.opacity = '1';
  
  const opt = {
    margin: [5, 5, 5, 5],
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true, 
      letterRendering: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 800,
      height: 1200,
      scrollX: 0,
      scrollY: 0
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  try {
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
  } finally {
    // Restore original styles
    element.style.display = originalDisplay;
    element.style.visibility = originalVisibility;
    element.style.opacity = originalOpacity;
  }
};
