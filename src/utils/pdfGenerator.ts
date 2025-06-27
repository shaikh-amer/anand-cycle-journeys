
import html2pdf from 'html2pdf.js';
import { supabase } from '@/integrations/supabase/client';

export const generatePDFBlob = (element: HTMLElement, fileName: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    // Ensure the element is visible and properly rendered
    const originalDisplay = element.style.display;
    const originalVisibility = element.style.visibility;
    const originalOpacity = element.style.opacity;
    const originalPosition = element.style.position;
    const originalTop = element.style.top;
    const originalLeft = element.style.left;
    
    // Make sure the element is visible and positioned properly
    element.style.display = 'block';
    element.style.visibility = 'visible';
    element.style.opacity = '1';
    element.style.position = 'relative';
    element.style.top = 'auto';
    element.style.left = 'auto';
    
    // Wait a bit for the element to render
    setTimeout(() => {
      const opt = {
        margin: [10, 10, 10, 10],
        filename: fileName,
        image: { 
          type: 'jpeg', 
          quality: 1.0 
        },
        html2canvas: { 
          scale: 1,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: true,
          removeContainer: true,
          async: true,
          foreignObjectRendering: true,
          width: element.offsetWidth || 800,
          height: element.offsetHeight || 1200
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { 
          mode: ['avoid-all', 'css'] 
        }
      };

      html2pdf()
        .from(element)
        .set(opt)
        .toPdf()
        .output('blob')
        .then((blob: Blob) => {
          // Restore original styles
          element.style.display = originalDisplay;
          element.style.visibility = originalVisibility;
          element.style.opacity = originalOpacity;
          element.style.position = originalPosition;
          element.style.top = originalTop;
          element.style.left = originalLeft;
          resolve(blob);
        })
        .catch((error: Error) => {
          // Restore original styles even if there's an error
          element.style.display = originalDisplay;
          element.style.visibility = originalVisibility;
          element.style.opacity = originalOpacity;
          element.style.position = originalPosition;
          element.style.top = originalTop;
          element.style.left = originalLeft;
          reject(error);
        });
    }, 500);
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
  return new Promise((resolve, reject) => {
    // Ensure the element is visible and properly rendered
    const originalDisplay = element.style.display;
    const originalVisibility = element.style.visibility;
    const originalOpacity = element.style.opacity;
    const originalPosition = element.style.position;
    const originalTop = element.style.top;
    const originalLeft = element.style.left;
    
    // Make sure the element is visible and positioned properly
    element.style.display = 'block';
    element.style.visibility = 'visible';
    element.style.opacity = '1';
    element.style.position = 'relative';
    element.style.top = 'auto';
    element.style.left = 'auto';
    
    // Wait a bit for the element to render
    setTimeout(() => {
      const opt = {
        margin: [10, 10, 10, 10],
        filename: fileName,
        image: { 
          type: 'jpeg', 
          quality: 1.0 
        },
        html2canvas: { 
          scale: 1,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: true,
          removeContainer: true,
          async: true,
          foreignObjectRendering: true,
          width: element.offsetWidth || 800,
          height: element.offsetHeight || 1200
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { 
          mode: ['avoid-all', 'css'] 
        }
      };

      html2pdf()
        .from(element)
        .set(opt)
        .save()
        .then(() => {
          // Restore original styles
          element.style.display = originalDisplay;
          element.style.visibility = originalVisibility;
          element.style.opacity = originalOpacity;
          element.style.position = originalPosition;
          element.style.top = originalTop;
          element.style.left = originalLeft;
          resolve();
        })
        .catch((error: Error) => {
          // Restore original styles even if there's an error
          element.style.display = originalDisplay;
          element.style.visibility = originalVisibility;
          element.style.opacity = originalOpacity;
          element.style.position = originalPosition;
          element.style.top = originalTop;
          element.style.left = originalLeft;
          reject(error);
        });
    }, 500);
  });
};

export const printPDF = async (element: HTMLElement, fileName: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Ensure the element is visible and properly rendered
    const originalDisplay = element.style.display;
    const originalVisibility = element.style.visibility;
    const originalOpacity = element.style.opacity;
    const originalPosition = element.style.position;
    const originalTop = element.style.top;
    const originalLeft = element.style.left;
    
    // Make sure the element is visible and positioned properly
    element.style.display = 'block';
    element.style.visibility = 'visible';
    element.style.opacity = '1';
    element.style.position = 'relative';
    element.style.top = 'auto';
    element.style.left = 'auto';
    
    // Wait a bit for the element to render
    setTimeout(() => {
      const opt = {
        margin: [10, 10, 10, 10],
        filename: fileName,
        image: { 
          type: 'jpeg', 
          quality: 1.0 
        },
        html2canvas: { 
          scale: 1,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: true,
          removeContainer: true,
          async: true,
          foreignObjectRendering: true,
          width: element.offsetWidth || 800,
          height: element.offsetHeight || 1200
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { 
          mode: ['avoid-all', 'css'] 
        }
      };

      html2pdf()
        .from(element)
        .set(opt)
        .output('blob')
        .then((pdfBlob: Blob) => {
          const blobUrl = URL.createObjectURL(pdfBlob);
          const pdfWindow = window.open(blobUrl, '_blank');
          if (pdfWindow) {
            pdfWindow.onload = () => {
              pdfWindow.print();
            };
          } else {
            throw new Error('Please disable your pop-up blocker to print.');
          }
          
          // Restore original styles
          element.style.display = originalDisplay;
          element.style.visibility = originalVisibility;
          element.style.opacity = originalOpacity;
          element.style.position = originalPosition;
          element.style.top = originalTop;
          element.style.left = originalLeft;
          resolve();
        })
        .catch((error: Error) => {
          // Restore original styles even if there's an error
          element.style.display = originalDisplay;
          element.style.visibility = originalVisibility;
          element.style.opacity = originalOpacity;
          element.style.position = originalPosition;
          element.style.top = originalTop;
          element.style.left = originalLeft;
          reject(error);
        });
    }, 500);
  });
};
